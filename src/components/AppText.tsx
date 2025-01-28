import { Text, TextProps } from "react-native";

interface AppTextProps extends TextProps {
  className?: string; // Tailwind className prop for NativeWind
}

export function AppText({ className, ...rest }: AppTextProps) {
  return (
    <Text
      className={`text-base font-normal  text-skin-primary  text-capitalize ${
        className || ""
      }`}
      {...rest}
    />
  );
}

export default AppText;
