import React from "react";
import AppTabsNavigator from "./navigation/app-navigators/AppTabsNavigator";
import AuthStackNavigator from "./navigation/auth-navigators/AuthStackNavigator";
import "../global.css";

const AuthenticatedUserCheck = () => {
  // const token = ""; // when user is null
  const token = "tokfsdjflksjflsfsjdfkjsklfoiweiewrwriowr"; // when user is authenticated

  return token ? <AppTabsNavigator /> : <AuthStackNavigator />;
};

export default AuthenticatedUserCheck;
