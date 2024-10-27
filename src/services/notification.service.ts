import { ApplicationDataModel } from "../models/applicationData.js";
import { NotificationModel } from "../models/notification.js";
import { NotificationOutput } from "../schema/notification/get.notifications.js";

export default class NotificationService {
    async getAllNotifications(userId: String): Promise<NotificationOutput[]> {
        try {
            // Step 1: Retrieve all notifications for the specified user
            const notifications = await NotificationModel.find({ userId });

            // Step 2: Extract application IDs from notifications
            const applicationIds = notifications.map(notification => notification.applicationId);

            // Step 3: Fetch applications based on these IDs
            const applications = await ApplicationDataModel.find({
                _id: { $in: applicationIds }
            });

            // Step 4: Map notifications to application data, including messages and succeeded fields
            return notifications.map(notification => {
                // Find the corresponding application for each notification
                const application = applications.find(
                    app => app._id.toString() === notification.applicationId.toString()
                );

                if (!application) throw new Error(`Application not found for notification ID: ${notification._id}`);

                return {
                    id: notification._id.toString(),
                    name: application.name,
                    description: application.description,
                    applicationId: application.id,
                    deadline: application.deadline,
                    messages: ["Notification retrieved successfully"],
                    succeeded: true
                };
            });
        } catch (error) {
            console.error("Error retrieving notifications for user:", error);
            return [{
                id: "",
                name: "",
                description: "",
                applicationId: "",
                deadline: new Date(0),
                messages: ["Failed to retrieve notifications"],
                succeeded: false
            }];
        }
    }
}
