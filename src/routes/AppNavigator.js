import { createStackNavigator } from "@react-navigation/stack";

//import para bottom tab - barra inferior que possui "início", "pesquisa" e "perfil"
import BottomTabNavigator from "./BottomTabNavigator.js";

//import de cada tela
import TelaLogin from "../pages/TelaLogin";
import TelaCriarConta from "../pages/TelaCriarConta";
import TelaPesquisa from "../pages/TelaPesquisa";
import TelaPerfil from "../pages/TelaPerfil";
import TelaDetalhesLivro from "../pages/TelaDetalhesLivro";
import TelaBibliotecaPessoal from "../pages/TelaBibliotecaPessoal";
import TelaEditarInfo from "../pages/TelaEditarInfo.js";

const Stack = createStackNavigator();

const EntradaStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TelaLogin"
        component={TelaLogin}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="TelaCriarConta" 
        component={TelaCriarConta}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BottomTabNavigator"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="EditarInfoUsuario"
        component={TelaEditarInfo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TelaPesquisa"
        component={TelaPesquisa}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TelaPerfil"
        component={TelaPerfil}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TelaDetalhesLivro"
        component={TelaDetalhesLivro}
        options={{ title: "Informações do livro", headerShown: false }}
      />
      <Stack.Screen
        name="TelaBibliotecaPessoal"
        component={TelaBibliotecaPessoal}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen

          name="EntradaStack"
          component={EntradaStack}
          options={{ headerShown: false }}
        />
    </Stack.Navigator>
  );
};

export default AppNavigator;
