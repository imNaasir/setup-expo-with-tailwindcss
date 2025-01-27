import { handler } from "@/helpers/utils/expo-notification-handler/notificationHandler";
import * as Device from "expo-device";
import * as Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

export const sendPushNotification = async (expoPushToken: string) => {
    const message = {
        to: expoPushToken,
        sound: "sound01.wav",
        title: "Original Title",
        body: "And here is the body!",
        data: { someData: "goes here" },
    };
    await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Accept-encoding": "gzip, deflate",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
    });
    // .then((res) => res.json())
    // .then((data) => '')
    // .catch((err) => '');
};

export const registerForPushNotificationsAsync = async () => {
    let token;
    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== "granted") {
            alert("Failed to get push token for push notification!");
            return;
        }

        token = (
            await Notifications.getExpoPushTokenAsync({
                projectId: Constants.default.expoConfig?.extra?.eas?.projectId,
            })
        ).data;
    } else {
        // alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
        });
    }

    return token;
};

// This listener is fired whenever a notification is received while the app is foregrounded
export const addNotificationReceivedListener = () => {
    return Notifications.addNotificationReceivedListener((notification) => {
        setTimeout(() => {
            Notifications.dismissAllNotificationsAsync();
        }, 10000);
        const {
            request: { content },
        } = notification;
        handler(content.data.type as string, content.data);
    });
};

// This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
export const addNotificationResponseReceivedListener = () => {
    return Notifications.addNotificationResponseReceivedListener(({ notification }) => {
        const {
            request: { content },
        } = notification;
        handler(content.data.type as string, content.data);
    });
};
