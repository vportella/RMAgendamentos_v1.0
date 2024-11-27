import { View, Text, TouchableOpacity, Alert, ActivityIndicator  } from "react-native";
import { styles } from "./login.style.js";
import Header from "../../components/header/header.jsx";
import TextBox from "../../components/textbox/textbox.jsx";
import Button from "../../components/button/button.jsx";
import { useState } from "react";

//Database Imports
import { useSQLiteContext } from "expo-sqlite";
import { verifyUser } from "../../database/useDatabase.js";

function Login({navigation}) {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);
    const db = useSQLiteContext();

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const signIn = async () => {
        if (!email.trim() || !senha.trim()) {
            Alert.alert("Aviso!", "Por favor, preencha todos os campos.");
            return;
        }

        if (!isValidEmail(email)) {
            Alert.alert("Aviso!", "Por favor, insira um email válido.");
            return;
        }

        try {
            setLoading(true);
            const result = await verifyUser(db, email.trim(), senha.trim());
            
            if (result.success) {
                navigation.navigate("homescreen", { userID: result.user.id });
            }
        } catch (error) {
            Alert.alert("Erro!", "Ocorreu um erro ao tentar fazer login");
        } finally {
            setLoading(false);
        }
    };

    return <View style={styles.container}>
        <Header texto="Faça seu login:" />

        <View style={styles.formGroup}>
            <View style={styles.form}>
                <TextBox label="E-mail"
                    onChangeText={(texto) => setEmail(texto)}
                    value={email}/>
            </View>

            <View style={styles.form}>
                <TextBox label="Senha" isPassword={true}
                    onChangeText={(texto) => setSenha(texto)}
                    value={senha} />
            </View>

            <View style={styles.form}>
                {loading ? (
                    <ActivityIndicator size="large" color="#primary-color" />
                ) : (
                    <Button texto="Acessar" onPress={signIn} disabled={loading} />
                )}
            </View>
        </View>

        <View style={styles.footer}>
            <TouchableOpacity onPress={() => navigation.navigate("registro")}>
                <Text style={styles.footerText}>Criar minha conta.</Text>
            </TouchableOpacity>
        </View>
    </View>
}

export default Login;