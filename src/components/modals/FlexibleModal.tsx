import {
  Modal as RnModal,
  ModalProps,
  KeyboardAvoidingView,
  View,
  Platform,
} from "react-native";

type PROPS = ModalProps & {
  isOpen: boolean;
  withInput?: boolean;
};

export const FlexibleModal = ({ isOpen, withInput, children, ...rest }: PROPS) => {
  const content = withInput ? (
    <KeyboardAvoidingView
      className="flex-1  bg-zinc-900/40"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {children}
    </KeyboardAvoidingView>
  ) : (
    <View className="flex-1  bg-zinc-900/40">{children}</View>
  );
  return (
    <RnModal
      visible={isOpen}
      transparent
      animationType="fade"
      statusBarTranslucent
      {...rest}
    >
      {content}
    </RnModal>
  );
};
