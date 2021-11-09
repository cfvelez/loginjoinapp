import { Alert } from "react-native";

const MyConfirmDialog = (props) =>

Alert.alert(
  props.title,
  props.message,
  [
    {
      text: "Cancelar",
      onPress: ()=> props?.cancelAction() ?? false,
    },
    { text: "Confirmar", onPress:()=> props.confirmAction() }
  ]
);

export default MyConfirmDialog;
