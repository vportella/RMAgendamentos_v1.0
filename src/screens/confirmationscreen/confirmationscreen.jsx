import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./confirmationscreen.style.js";
import icons from "../../constants/icons.js";
import Button from "../../components/button/button.jsx";

function ConfirmationScreen({ route, navigation }) {
  const { employee, day, time, userID } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image source={icons.confirmacao} style={styles.logo} />
        <Text style={styles.title}>Agendamento Concluído!</Text>
        <Text style={styles.message}>Parceiro: {employee}</Text>
        <Text style={styles.message}>Data: {day}</Text>
        <Text style={styles.message}>Horário: {time} hrs.</Text>
      </View>

      <View style={styles.btn}>
        <Button texto="OK" onPress={() => navigation.navigate("homescreen", { userID })}/>
      </View>

      <View style={styles.footer}>
        <Image source={icons.instagram} style={styles.logoFooter} />
        <Text style={styles.footerText}>  @redeminasoficial</Text>
      </View>
    </SafeAreaView>
  );
}

export default ConfirmationScreen;