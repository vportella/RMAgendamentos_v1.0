import { View, ScrollView, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateBox from "../../components/datebox/datebox.jsx";
import { styles } from "./datescreen.style.js";
import icons from "../../constants/icons.js";

function DateScreen({ route, navigation }) {
  const { arquitetoID } = route.params;
  const { arquitetoNome } = route.params;
  const { userID } = route.params;

  // Próximos 5 dias
  const getNextFiveDays = () => {
    const days = [];
    for (let i = 0; i < 5; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push(date.toLocaleDateString());
    }
    return days;
  };

  const days = getNextFiveDays();

  return (
    <SafeAreaView style={styles.container}>
      <View>
      <Image source={icons.abelha} style={styles.logo} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Escolha uma data:</Text>
        {days.map((day, index) => (
          <View key={index}>
            <DateBox
              date={day}
              onPress={() => navigation.navigate('timescreen', { arquitetoID, arquitetoNome, userID, day })}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default DateScreen;