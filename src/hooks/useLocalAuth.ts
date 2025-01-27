import * as LocalAuthentication from "expo-local-authentication";

type SupportedBiometricsType = ["FINGERPRINT" | "FACIAL_RECOGNITION"] | [] | ["FINGERPRINT", "FACIAL_RECOGNITION"];
const useLocalAuth = () => {
    const isBiometricSupport = async () => {
        return await LocalAuthentication.hasHardwareAsync();
    };

    const supportedBiometrics = async () => {
        const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
        const sbt: any = [];
        types.forEach((type) => {
            if (type === 1) {
                sbt.push("FINGERPRINT");
            } else if (type === 2) {
                sbt.push("FACIAL_RECOGNITION");
            }
        });
        return sbt as SupportedBiometricsType;
    };

    const authenticate = async (callback: (result: LocalAuthentication.LocalAuthenticationResult | boolean) => void) => {
        const compatible = await isBiometricSupport();
        if (compatible) {
            const auth = LocalAuthentication.authenticateAsync({
                // disableDeviceFallback: true,
                promptMessage: "Authentication Required",
                fallbackLabel: "Enter your passade",
            });
            auth.then((result) => {
                callback(result);
            });
        } else {
            callback(false);
        }
    };

    return { isBiometricSupport, supportedBiometrics, authenticate };
};


export default useLocalAuth;
