import { TouchableOpacity, Text } from "react-native";
import { styles } from "./funcionario.style.js";

function FuncionarioButton({ name, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{name}</Text>
    </TouchableOpacity>
  );
}

export default FuncionarioButton;