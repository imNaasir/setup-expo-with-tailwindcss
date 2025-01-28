import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FlexibleModal } from "./FlexibleModal";

type AlertModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  children?: React.ReactNode;
};

const AlertModal = ({
  isOpen,
  onClose,
  title,
  message,
  children,
}: AlertModalProps) => {
  return (
    <FlexibleModal isOpen={isOpen} onRequestClose={onClose}>
      <View className="flex-1 px-3 items-center justify-center">
        <View className="bg-white w-full p-4 rounded-lg shadow-lg items-center justify-center">
          {title && <Text className="text-xl font-bold mb-4">{title}</Text>}
          {message && (
            <Text className="text-sm text-gray-700 mb-4">{message}</Text>
          )}
          {children}
          <TouchableOpacity
            onPress={onClose}
            className="mt-4 px-6 py-2 bg-blue-500 rounded-lg"
          >
            <Text className="text-white text-sm">Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </FlexibleModal>
  );
};

export default AlertModal;
