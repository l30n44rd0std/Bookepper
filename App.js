import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TelaLogin from './TelaLogin';
import TelaCriarConta from './TelaCriarConta';
import TelaInicial from './TelaInicial';
import TelaPesquisa from './TelaPesquisa';
import TelaPerfil from './TelaPerfil';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TelaLogin">
        <Stack.Screen name="TelaLogin" component={TelaLogin} options={{ title: 'Login' }} />
        <Stack.Screen name="TelaCriarConta" component={TelaCriarConta} options={{ title: 'Criar Conta' }} />
        <Stack.Screen name="TelaInicial" component={TelaInicial} options={{ title: 'Tela Inicial' }} />
        <Stack.Screen name="TelaPesquisa" component={TelaPesquisa} options={{ title: 'Tela de Pesquisa' }} />
        <Stack.Screen name="TelaPerfil" component={TelaPerfil} options={{ title: 'Tela de Perfil do Usuário' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

