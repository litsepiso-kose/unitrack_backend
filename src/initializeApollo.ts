import express from "express";
import http from 'http';
import schema from "./schema/schema.js";
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloServer } from "@apollo/server";
import cors from "cors";
import Context from "./models/context.js";
import UserClass from "./models/user.js";
import jwt from "./utils/jwt.js";
import { unwrapResolverError } from "@apollo/server/errors";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { ApolloServerPluginLandingPageDisabled } from "@apollo/server/plugin/disabled";
import os from 'os';
import { exec } from 'child_process';

// Function to kill processes on the port
function killProcessesOnPort(port, callback) {
    if (os.platform() === 'linux') {
        exec(`lsof -t -i:${port}`, (error, stdout) => {
            if (error) {
                if (error.code === 1) {
                    console.log(`No processes are using port ${port}`);
                } else {
                    console.error(`Error finding processes on port ${port}: ${error.message}`);
                }
                callback();
                return;
            }
            const pids = stdout.split('\n').filter(Boolean);
            if (pids.length > 0) {
                console.log(`Killing processes on port ${port}: ${pids.join(', ')}`);
                exec(`kill -9 ${pids.join(' ')}`, (killError) => {
                    if (killError) {
                        console.error(`Error killing processes: ${killError.message}`);
                    }
                    callback();
                });
            } else {
                console.log(`No processes are using port ${port}`);
                callback();
            }
        });
    } else {
        callback();
    }
}

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
    schema,
    introspection: true,
    formatError: (formattedError, error) => {
        // unwrapResolverError removes the outer GraphQLError wrapping from
        // errors thrown in resolvers, enabling us to check the instance of
        // the original error
        if (process.env.NODE_ENV === "development" || !process.env.NODE_ENV) {
            return formattedError;
        }

        console.error(error);

        if (unwrapResolverError(error)) {
            return { message: "Internal server error" };
        }
        return formattedError;
    },
    plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        process.env.NODE_ENV === "production" && !process.env.IS_TEST
            ? ApolloServerPluginLandingPageDisabled()
            : ApolloServerPluginLandingPageLocalDefault(),
    ],
});

await server.start();

const origin = process.env.ORIGINS.split(';')

app.use(
    '/',
    cors({
        origin: origin.includes('*') ? '*' : origin,
    }),
    express.json(),
    expressMiddleware(server, {
        context: async (ctx: Context) => {
            const token = ctx.req.headers.authorization || "";
            if (token) {
                try {
                    const user = jwt.decodeJwt<UserClass>(token);
                    ctx.user = user;
                } catch (error) {
                    console.error(error);
                }
            }
            return ctx;
        },
    }),
);

const port = +process.env.GRAPHQL_PORT || 4000;

// Kill processes on the port before starting the server
killProcessesOnPort(port, async () => {
    await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
    console.log(`🚀 GraphQL Server ready at http://localhost:${port}`);

    // Handle termination signals
    function handleExit(signal) {
        console.log(`Received ${signal}. Closing Apollo server...`);
        httpServer.close(() => {
            console.log('Apollo server closed');
            process.exit(0);
        });
    }

    process.on('SIGINT', handleExit);   // Ctrl+C
    process.on('SIGTERM', handleExit);  // Termination signal
    process.on('SIGHUP', handleExit);   // Terminal closed (Linux)

    // Optional: Handle uncaught exceptions and unhandled promise rejections
    process.on('uncaughtException', (error) => {
        console.error('Uncaught Exception:', error);
        handleExit('uncaughtException');
    });

    process.on('unhandledRejection', (reason, promise) => {
        console.error('Unhandled Rejection at:', promise, 'reason:', reason);
        handleExit('unhandledRejection');
    });
});

