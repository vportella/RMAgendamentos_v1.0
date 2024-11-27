import Login from "./screens/login/login.jsx";
import Registro from "./screens/registro/registro.jsx";
import Registro2 from "./screens/registro2/registro2.jsx";
import HomeScreen from "./screens/homescreen/homescreen.jsx";
import DateScreen from "./screens/datescreen/datescreen.jsx";
import TimeScreen from "./screens/timescreen/timescreen.jsx";
import ConfirmationScreen from './screens/confirmationscreen/confirmationscreen.jsx';
import CadastroConcluidoScreen from "./screens/registroConfirmationscreen/registroConfirmationscreen.jsx";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

function Routes() {
    return <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="login" component={Login} options={{
                headerShown: false
            }} />

            <Stack.Screen name="homescreen" component={HomeScreen} options={{ 
                headerShown: false 
            }} />

            <Stack.Screen name="datescreen" component={DateScreen} options={{ 
                title: "" 
            }} />
            
            <Stack.Screen name="timescreen" component={TimeScreen} options={{ 
                title: "" 
            }} />

            <Stack.Screen name="confirmationscreen" component={ConfirmationScreen} options={{
                title: ""
            }} />

            <Stack.Screen name="registro" component={Registro} options={{
                //headerShown: false
                headerShadowVisible: false,
                title: "",
                headerBackTitle: "Voltar"
            }} />

            <Stack.Screen name="registro2" component={Registro2} options={{
                //headerShown: false
                headerShadowVisible: false,
                title: "",
                headerBackTitle: "Voltar"
            }} />

            <Stack.Screen name="registroConfirmationscreen" component={CadastroConcluidoScreen} options={{
                title: "",
            }} />


        </Stack.Navigator>
    </NavigationContainer>
}

export default Routes;