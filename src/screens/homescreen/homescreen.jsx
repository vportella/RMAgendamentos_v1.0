import { View, ScrollView, Image, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FuncionarioButton from "../../components/funcionario/funcionario.jsx";
import { styles } from "./homescreen.style.js";
import icons from "../../constants/icons.js";
import { useState, useEffect } from 'react';

//Database Imports
import { useSQLiteContext } from "expo-sqlite";
import { createArquiteto } from "../../database/useDatabase.js";

function HomeScreen({ route, navigation }) {
  const [arquitetos, setArquitetos] = useState([]);
  const db = useSQLiteContext();
  const { userID } = route.params;

  useEffect(() => {
    const fetchArquitetos = async () => {
        const result = await createArquiteto(db);
        if (result) {
            setArquitetos(result);
        }
    };
    fetchArquitetos();
  }, [db]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image source={icons.logoAbelha} style={styles.logo} />
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {arquitetos.map((arquiteto) => (
          <View key={arquiteto.id}>
            <FuncionarioButton 
              name={arquiteto.nome}
              onPress={() => navigation.navigate('datescreen', { 
                arquitetoID: arquiteto.id,
                arquitetoNome: arquiteto.nome,
                userID: userID      
              })}
            />
          </View>
        ))}

        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerContent}>
            <Image source={icons.relogio} style={styles.logoFooter} />
            <Text style={styles.footerText}>Histórico de Agendamentos</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;