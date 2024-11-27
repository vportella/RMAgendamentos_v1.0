import { TouchableOpacity, Text } from "react-native";
import { styles } from "./timebox.style.js";

function TimeBox({ time, onPress }) {
  return (
    <TouchableOpacity style={styles.timeBox} onPress={onPress}>
      <Text style={styles.timeText}>{time}</Text>
    </TouchableOpacity>
  );
}

export default TimeBox;