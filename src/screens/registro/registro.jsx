import { View, ScrollView, Alert } from "react-native";
import { styles } from "./registro.style.js";
import Header from "../../components/header/header.jsx";
import TextBox from "../../components/textbox/textbox.jsx";
import Button from "../../components/button/button.jsx";
import { useState } from "react";

//Database Imports
import { useSQLiteContext } from 'expo-sqlite';
import { createUsuario } from '../../database/useDatabase.js';


function Registro(props) {
    const db = useSQLiteContext();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha1, setSenha1] = useState("");
    const [senha2, setSenha2] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleCadastro = async () => {
        if (!nome.trim()) {
            Alert.alert("Erro", "Por favor, insira seu nome");
            return;
        }
        if (!email.trim()) {
            Alert.alert("Erro", "Por favor, insira seu email");
            return;
        }
        if (!isValidEmail(email)) {
            Alert.alert("Erro", "Por favor, insira um email válido.");
            return;
        }
        if (senha1.length < 4) {
            Alert.alert("Erro", "A senha deve ter pelo menos 4 caracteres");
            return;
        }
        if (senha1 !== senha2) {
            Alert.alert("Erro", "As senhas não coincidem");
            return;
        }
    
        try {
            setIsLoading(true);
            //console.log('Dados do formulário:', { nome, email, senha1 });
            
            const result = await createUsuario(db, nome, email, senha1);
            //console.log('Resposta da criação:', result);
            
            if (result.success && result.user) {
                //console.log("Usuário criado:", result.user);
                props.navigation.navigate("registro2", { userId: result.user.id });
            } else {
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            Alert.alert(
                "Erro", 
                "Não foi possível criar sua conta. Tente novamente."
            );     
        } finally {
            setIsLoading(false);
        }
    };

    return <>
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Header texto="Criar sua conta." />

                <View style={styles.formGroup}>
                    <View style={styles.form}>
                        <TextBox label="Nome Completo"
                            onChangeText={(texto) => setNome(texto)}
                            value={nome} />
                    </View>

                    <View style={styles.form}>
                        <TextBox label="E-mail"
                            onChangeText={(texto) => setEmail(texto)}
                            value={email} />
                    </View>

                    <View style={styles.form}>
                        <TextBox label="Escolha uma senha" isPassword={true}
                            onChangeText={(texto) => setSenha1(texto)}
                            value={senha1} />
                    </View>

                    <View style={styles.form}>
                        <TextBox label="Confirme a senha" isPassword={true}
                            onChangeText={(texto) => setSenha2(texto)}
                            value={senha2} />
                    </View>

                    <View style={styles.form}>
                        <Button texto={isLoading ? "Cadastrando..." : "Próximo passo"}
                            onPress={handleCadastro} 
                            disabled={isLoading}/>
                    </View>
                </View>

            </ScrollView>
        </View>
    </>
}

export default Registro;