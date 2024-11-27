import { TouchableOpacity, Text } from "react-native";
import { styles } from "./datebox.style.js";

function DateBox({ date, onPress }) {
  return (
    <TouchableOpacity style={styles.dateBox} onPress={onPress}>
      <Text style={styles.dateText}>{date}</Text>
    </TouchableOpacity>
  );
}

export default DateBox;