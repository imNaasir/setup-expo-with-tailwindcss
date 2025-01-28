import React, { useRef, useState } from "react";
import {
  TextInput,
  TextInputProps,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  View,
} from "react-native";

interface AppTextInputProps extends TextInputProps {
  width?: string | number;
  className?: string; // Tailwind CSS classes for styling
  inputType?: "text" | "number" | "email" | "password"; // Custom inputType prop
}

/**
 * AppTextInput Component
 *
 * A custom TextInput component styled using Tailwind CSS, providing additional functionality
 * like custom styling and managing input focus through TouchableWithoutFeedback.
 *
 * @param {AppTextInputProps} props - Component properties including width, inputType, and other TextInput props.
 * @returns {JSX.Element} A styled TextInput component.
 */
const AppTextInput: React.FC<AppTextInputProps> = ({
  width = "100%",
  className = "",
  inputType = "text",
  ...otherProps
}) => {
  const inputRef = useRef<TextInput>(null);
  const [hasText, setHasText] = useState(false);

  const handleTextChange = (text: string) => {
    setHasText(text.length > 0);
    if (inputType === "number") {
      const numericText = text?.replace(/[^0-9]/g, "");
      otherProps.onChangeText?.(numericText);
    } else {
      otherProps.onChangeText?.(text);
    }
  };

  const getInputProps = (): Partial<TextInputProps> => {
    switch (inputType) {
      case "number":
        return { keyboardType: "numeric" };
      case "email":
        return { keyboardType: "email-address" };
      case "password":
        return { secureTextEntry: true };
      default:
        return { keyboardType: "default" };
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding">
      <TouchableWithoutFeedback
        onPress={() => {
          inputRef.current?.focus();
          Keyboard?.dismiss();
        }}
        accessible={false}
      >
        <View
          className={`flex-row items-center bg-gray-100 rounded-xl px-4 my-1 ${className}`}
        >
          <TextInput
            ref={inputRef}
            placeholderTextColor="gray"
            className="flex-1 h-12 text-gray-800 text-sm font-medium"
            onChangeText={handleTextChange}
            {...getInputProps()}
            {...otherProps}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default AppTextInput;
