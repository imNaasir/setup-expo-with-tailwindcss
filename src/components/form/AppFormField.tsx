import React from "react";
// import TextInput from "../TextInput"; // Adjust this import based on your directory structure
import ErrorMessage from "./ErrorMessage";
// @ts-ignore
import { useFormikContext } from "formik";
import Label from "./Label";
import { View } from "react-native";
import AppTextInput from "./AppTextInput";

interface AppFormFieldProps {
  label: string;
  isRequired?: boolean;
  name: string;
  width?: string | number;
  className?: string; // Updated to use className
  [key: string]: any; // Additional props for TextInput
}

/**
 * A form field component that integrates with Formik for form state management.
 */
const AppFormField: React.FC<AppFormFieldProps> = ({
  label,
  isRequired = false,
  name,
  width = "100%",
  className = "",
  ...otherProps
}) => {
  const { setFieldTouched, setFieldValue, touched, errors, values } =
    useFormikContext<any>(); // Access Formik's context

  return (
    <View className={`my-2 ${className}`}>
      <Label label={label} isRequired={isRequired} />
      <AppTextInput
        onChangeText={(text: any) => setFieldValue(name, text)}
        value={values[name]}
        onBlur={() => setFieldTouched(name)}
        className="w-full"
        {...otherProps}
      />
      <ErrorMessage
        error={errors[name] as string}
        visible={touched[name] as boolean}
        className="text-xs text-red-600 ml-1 normal-case"
      />
    </View>
  );
};

export default AppFormField;
