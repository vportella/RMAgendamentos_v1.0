import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./registroConfirmationscreen.style.js";
import Button from "../../components/button/button.jsx";
import icons from "../../constants/icons.js";

function CadastroConcluidoScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image source={icons.confirmacao} style={styles.logo} />
        <Text style={styles.title}>Cadastro realizado com sucesso!</Text>
        <Button texto="OK" onPress={() => navigation.navigate("login")} />
      </View>
    </SafeAreaView>
  );
}

export default CadastroConcluidoScreen;