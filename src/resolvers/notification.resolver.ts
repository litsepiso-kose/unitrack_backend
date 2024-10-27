import { Authorized, Ctx, Query, Resolver } from "type-graphql";
import Context from "../models/context.js";
import NotificationService from "../services/notification.service.js";
import { NotificationOutput } from "../schema/notification/get.notifications.js";

@Resolver()
export default class NotificationResolver {
    constructor(private notificationService: NotificationService) {
        this.notificationService = new NotificationService();
    }

    @Authorized()
    @Query(() => [NotificationOutput])
    async getUserNotifications(@Ctx() { user: { _id } }: Context): Promise<NotificationOutput[]> {
        return this.notificationService.getAllNotifications(_id);
    }
}
