import AppForm from "@/components/form/AppForm";
import AppFormField from "@/components/form/AppFormField";
import React from "react";
import { Button, View } from "react-native";
// import AppForm from "./AppForm";
// import AppFormField from "./AppFormField";
import * as Yup from "yup";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginForm = () => {
  const handleSubmit = (values: { email: string; password: string }) => {
    console.log("Form Submitted:", values);
    // Add your form submission logic here
  };

  return (
    <View className="flex-1 items-center bg-skin-background justify-center w-full">
      <View className="p-4  w-full">
        <AppForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {(formikHelpers) => (
            <>
              {/* Email Field */}
              <AppFormField
                label="Email"
                name="email"
                isRequired={true}
                placeholder="Enter your email"
                keyboardType="email-address"
                className="mb-4"
              />

              {/* Password Field */}
              <AppFormField
                label="Password"
                name="password"
                isRequired={true}
                placeholder="Enter your password"
                secureTextEntry={true}
                className="mb-4"
              />

              {/* Submit Button */}
              <Button
                title="Login"
                onPress={formikHelpers.handleSubmit as any}
              />
            </>
          )}
        </AppForm>
      </View>
    </View>
  );
};

export default LoginForm;
