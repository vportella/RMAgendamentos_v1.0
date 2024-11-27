import { View, ScrollView, Image, Text, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TimeBox from "../../components/timebox/timebox.jsx";
import { styles } from "./timescreen.style.js";
import icons from "../../constants/icons.js";

//Database Imports
import { useSQLiteContext } from "expo-sqlite";
import { createAgendamento, getEnderecoByUsuarioId } from "../../database/useDatabase.js";

function TimeScreen({ route, navigation }) {
  const { arquitetoID, day, arquitetoNome, userID } = route.params;
  const db = useSQLiteContext();
  
  // Horários disponíveis
  const availableTimes = ['08:30', '10:00', '13:00', '14:30', '16:00'];
  
  const handleAgendamento = async (time) => {
    try {
      const enderecoResult = await getEnderecoByUsuarioId(db, userID);

      if (!enderecoResult.success) {
        Alert.alert('Erro', 'Não foi possível encontrar seu endereço');
        return;
      }

    const agendamentoResult = await createAgendamento(db, {
      usuario_id: userID,
      endereco_id: enderecoResult.endereco_id,
      arquiteto_id: arquitetoID,
      data: day,
      hora: time
    });
  
    if (agendamentoResult.success) {
      navigation.navigate('confirmationscreen', { arquitetoNome, day, time, userID });
    } else {
      Alert.alert('Erro', 'Não foi possível criar o agendamento');
    }
  } catch (error) {
    console.error('Erro ao processar agendamento:', error);
    Alert.alert('Erro', 'Ocorreu um problema ao agendar');
  }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image source={icons.abelha} style={styles.logo} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Horários disponíveis</Text>
        <Text style={styles.date}>        {day}</Text>
        {availableTimes.map((time, index) => (
          <View key={index}>
            <TimeBox 
              time={time}
              onPress={() => handleAgendamento(time)} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default TimeScreen;