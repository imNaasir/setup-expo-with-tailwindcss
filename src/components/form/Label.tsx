import React from "react";
import { View } from "react-native";
import { AppText } from "../AppText";

interface LabelProps {
  label: string;
  isRequired?: boolean;
  className?: string; // Tailwind classes for the container
  labelClassName?: string; // Tailwind classes for the label text
  requiredClassName?: string; // Tailwind classes for the required asterisk
}

const Label: React.FC<LabelProps> = ({
  label,
  isRequired = false,
  className = "",
  labelClassName = "",
  requiredClassName = "",
}) => {
  return (
    <View className={`flex-row items-center ${className}`}>
      <AppText
        className={`text-sm font-regular text-gray-700 ${labelClassName}`}
      >
        {label}
      </AppText>
      {isRequired && (
        <AppText
          className={`text-sm font-regular text-red-500 ${requiredClassName}`}
        >
          {" *"}
        </AppText>
      )}
    </View>
  );
};

export default Label;
