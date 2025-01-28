import React from "react";
import { AppText } from "../AppText"; // Ensure this is your custom Text component

interface ErrorMessageProps {
  error: string;
  visible: boolean;
  className?: string; // Tailwind CSS classes for styling
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  error,
  visible,
  className = "",
}) => {
  // Early return for cases where the error should not be shown
  if (!visible || !error) return null;

  return (
    <AppText className={`text-sm text-red-500 ${className}`}>{error}</AppText>
  );
};

export default ErrorMessage;
