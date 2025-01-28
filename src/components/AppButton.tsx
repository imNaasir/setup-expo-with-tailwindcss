import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface AppButtonProps {
  title: string;
  icon?: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  className?: string; // Tailwind classes for the button container
  textClassName?: string; // Tailwind classes for the text
}

const AppButton: React.FC<AppButtonProps> = ({
  title,
  icon,
  onPress,
  disabled = false,
  className = "",
  textClassName = "",
}) => {
  return (
    <TouchableOpacity
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      className={` rounded-xl flex-row justify-center items-center p-4 ${
        disabled ? "bg-gray-400 opacity-60" : "bg-skin-primary"
      } ${className}`}
    >
      <View className="flex-row items-center justify-center">
        {icon && <View className="mr-2">{icon}</View>}
        <Text
          className={`text-base font-semibold ${
            disabled ? "text-gray-200" : "text-white"
          } ${textClassName}`}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default AppButton;
