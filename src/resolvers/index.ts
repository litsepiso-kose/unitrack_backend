import ApplicationResolver from "./application.resolver.js";
import CredentialResolver from "./credential.resolver.js";
import NotificationResolver from "./notification.resolver.js";
import RoomResolver from "./room.resolver.js";
import UserResolver from "./user.resolver.js";

const resolvers = [UserResolver, RoomResolver, CredentialResolver, ApplicationResolver, NotificationResolver] as const;

export { resolvers };
