import AppButton from "@/components/AppButton";
import AppText from "@/components/AppText";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import Label from "@/components/form/Label";
import ErrorMessage from "@/components/form/ErrorMessage";
import AppTextInput from "@/components/form/AppTextInput";
import { FlexibleModal } from "@/components/modals/FlexibleModal";
import AlertModal from "@/components/modals/AlertModal";
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [flexibleModalOpen, setFlexibleModalOpen] = useState(false);

  const navigation = useNavigation<any>();

  const closeModal = () => setModalOpen(false);
  return (
    <View className="flex-1 bg-skin-input items-center justify-center">
      <Text className="font-bold text-3xl text-red-400">WelcomeScreen</Text>
      <AppText className="text-skin-warning">hello</AppText>
      <AppButton
        title="center Modal"
        icon={<Feather name="check" size={20} />}
        onPress={() => setModalOpen(true)}
        className="shadow-md "
        textClassName="uppercase"
      />
      <AppButton
        title="flexible Modal"
        icon={<Feather name="check" size={20} />}
        onPress={() => setFlexibleModalOpen(true)}
        className="shadow-md bg-skin-secondary"
        textClassName="uppercase"
      />
      <AppButton
        title="login Form"
        icon={<Feather name="check" size={20} />}
        onPress={() => navigation.navigate("LoginForm")}
        className="shadow-md bg-skin-warning"
        textClassName="uppercase"
      />

      <AlertModal
        isOpen={modalOpen}
        onClose={closeModal}
        title="Alert!"
        message="This is an alert message."
      >
        <Text className="text-sm text-gray-600">
          You can add more content here.
        </Text>
      </AlertModal>

      <FlexibleModal isOpen={flexibleModalOpen}>
        <View className="flex-1 justify-end">
          <View className="bg-white w-full p-4 rounded-t-lg shadow-lg">
            <Label
              label="Username"
              isRequired={true}
              className="mb-2"
              labelClassName="uppercase"
              requiredClassName="text-red-600"
            />
            <ErrorMessage
              error="This field is required."
              visible={true}
              className="mt-2"
            />
            <AppTextInput
              placeholder="Enter your name"
              inputType="text"
              className="w-full border border-gray-300"
            />
            <AppButton
              title="Close"
              icon={<Feather name="check" size={20} />}
              onPress={() => setFlexibleModalOpen(false)}
              className="shadow-md mt-4"
              textClassName="uppercase"
            />
          </View>
        </View>
      </FlexibleModal>
    </View>
  );
};

export default WelcomeScreen;
