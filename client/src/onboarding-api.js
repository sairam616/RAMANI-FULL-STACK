import axios from "axios";

export const getOnboardingDetails = async () => {
    try {
        const { data } = await axios.get("/api/onboarding");
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}
export const saveOnboardingDetails = async (details) => {
    try {
        const onboardingDetails = {
            "steps": [
                [
                    {
                        name: "firstName",
                        value: details.firstName,
                    },
                    {
                        name: "lastName",
                        value: details.lastName,
                    },
                    {
                        name: "country",
                        value: details.country,
                    },
                    {
                        name: "bio",
                        value: details.bio,
                    },
                ],
                [
                    {
                        name: "receiveNotifications",
                        value: details.receiveNotifications,
                    },
                    {
                        name: "receiveUpdates",
                        value: details.receiveUpdates,
                    },
                ]
            ]
        }
        const { data } = await axios.post("/api/onboarding", onboardingDetails);
        console.log(data);
    }
    catch (error) {
        console.log({
            "error": error
        });
    }
};