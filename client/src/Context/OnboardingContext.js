import React, { useState } from "react";

const initialState = {
    firstName: "",
    lastName: "",
    country: "",
    bio: "",
    receiveNotifications: false,
    receiveUpdates: false,
};

export const OnboardingContext = React.createContext(initialState);

export const OnboardingProvider = ({ children }) => {
    const [details, setDetails] = useState(initialState);
    return (
        <OnboardingContext.Provider value={{ details, setDetails }}>
            {children}
        </OnboardingContext.Provider>
    );
};