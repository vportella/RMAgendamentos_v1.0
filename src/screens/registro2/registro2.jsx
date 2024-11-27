import { View, ScrollView, Alert } from "react-native";
import { styles } from "./registro2.style.js";
import Header from "../../components/header/header.jsx";
import TextBox from "../../components/textbox/textbox.jsx";
import Button from "../../components/button/button.jsx";
import { useState } from "react";

//Database Imports
import { useSQLiteContext } from 'expo-sqlite';
import { createEndereco } from '../../database/useDatabase.js';


function Registro2( {route, navigation} ) {
    const db = useSQLiteContext();
    const { userId } = route.params;
    const [isLoading, setIsLoading] = useState(false);
    const [endereco, setEndereco] = useState("");
    const [complemento, setComplemento] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [uf, setUf] = useState("");
    const [cep, setCep] = useState("");

    const handleCadastroEndereco = async () => {
        if (!endereco || !bairro || !cidade || !uf || !cep) {
            Alert.alert("Erro", "Preencha todos os campos obrigatórios");
            return;
        }

        try {
            setIsLoading(true);
            
            const result = await createEndereco(db, {
                usuario_id: userId,
                endereco,
                complemento,
                bairro,
                cidade,
                uf,
                cep
            });

            if (result.success) {
                navigation.navigate("registroConfirmationscreen");
            } else {
                Alert.alert("Erro", "Não foi possível cadastrar o endereço");
            }
        } catch (error) {
            Alert.alert("Erro", "Ocorreu um erro ao cadastrar o endereço");
        } finally {
            setIsLoading(false);
        }
    };

    return <>
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}
                automaticallyAdjustKeyboardInsets={true}>

                <Header texto="Informe seu endereço." />

                <View style={styles.formGroup}>

                    <View style={styles.formHorizontal}>
                        <View style={styles.form70}>
                            <TextBox label="Endereço"
                                onChangeText={(texto) => setEndereco(texto)}
                                value={endereco} />
                        </View>
                        <View style={styles.form30}>
                            <TextBox label="Compl."
                                onChangeText={(texto) => setComplemento(texto)}
                                value={complemento} />
                        </View>
                    </View>

                    <View style={styles.form}>
                        <TextBox label="Bairro"
                            onChangeText={(texto) => setBairro(texto)}
                            value={bairro} />
                    </View>

                    <View style={styles.formHorizontal}>
                        <View style={styles.form70}>
                            <TextBox label="Cidade"
                                onChangeText={(texto) => setCidade(texto)}
                                value={cidade} />
                        </View>
                        <View style={styles.form30}>
                            <TextBox label="UF"
                                onChangeText={(texto) => setUf(texto)}
                                value={uf} />
                        </View>
                    </View>

                    <View style={styles.form}>
                        <TextBox label="CEP"
                            onChangeText={(texto) => setCep(texto)}
                            value={cep} />
                    </View>

                    <View style={styles.form}>
                        <Button 
                        texto={isLoading ? "Cadastrando..." : "Criar minha conta"} 
                        onPress={handleCadastroEndereco} 
                        disabled={isLoading}/>
                    </View>
                </View>

            </ScrollView>
        </View>
    </>
}

export default Registro2;