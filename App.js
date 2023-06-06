import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//import das telas
import TelaLogin from './src/pages/TelaLogin';
import TelaCriarConta from './src/pages/TelaCriarConta';
import TelaInicial from './src/pages/TelaInicial';
import TelaPesquisa from './src/pages/TelaPesquisa';
import TelaPerfil from './src/pages/TelaPerfil';
import AppRoutes from './src/routes/app.routes';

const Stack = createNativeStackNavigator();

function NavegandoTelas(){
  return(
      <Stack.Navigator initialRouteName="TelaLogin">
        <Stack.Screen name="TelaLogin" component={TelaLogin} options={{ title: 'Login' }} />
        <Stack.Screen name="TelaCriarConta" component={TelaCriarConta} options={{ title: 'Criar Conta' }} />
        <Stack.Screen name="TelaInicial" component={TelaInicial} options={{ title: 'Tela Inicial' }} />
        <Stack.Screen name="TelaPesquisa" component={TelaPesquisa} options={{ title: 'Tela de Pesquisa' }} />
        <Stack.Screen name="TelaPerfil" component={TelaPerfil} options={{ title: 'Tela de Perfil do Usuário' }} />
      </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <NavegandoTelas />
      <StatusBar style="auto"/>
      <AppRoutes />
    </NavigationContainer>
  );
}

