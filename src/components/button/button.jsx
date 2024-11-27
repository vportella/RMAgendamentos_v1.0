import { Text, TouchableOpacity } from "react-native";
import { styles } from "./button.style.js";


function Button({ texto, onPress, disabled}) {
    return <TouchableOpacity style={styles.btn} onPress={onPress} disabled={disabled}>
        <Text style={styles.texto}>{texto}</Text>
    </TouchableOpacity>
}

export default Button;