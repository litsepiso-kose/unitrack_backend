import cron from 'node-cron';
import { UserApplicationModel } from './models/userApplication.js';
import { NotificationModel, NotificationStatus } from './models/notification.js';
import { ApplicationDataModel } from './models/applicationData.js';

async function checkDeadlines() {
    try {
        const currentDate = new Date();
        const targetDate = new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate() + 7));

        const applications = await ApplicationDataModel.find({
            deadline: { $eq: targetDate }
        });

        for (const application of applications) {
            const userApplications = await UserApplicationModel.find({
                applicationId: application._id
            });

            for (const userApp of userApplications) {
                const existingNotification = await NotificationModel.findOne({
                    userId: userApp.userId,
                    applicationId: application._id
                });

                if (!existingNotification) {
                    await NotificationModel.create({
                        userId: userApp.userId,
                        applicationId: application._id,
                        status: NotificationStatus.CREATED
                    });
                }
            }
        }

        console.log("Deadline monitoring completed.");
    } catch (error) {
        console.error("Error during deadline monitoring:", error);
    }
}

// Run the job once on startup
checkDeadlines();
console.log("Schedule it to run daily at midnight")
// Schedule it to run daily at midnight
cron.schedule('0 0 * * *', checkDeadlines);
