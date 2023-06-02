import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TelaLogin from './TelaLogin';
import TelaCriarConta from './TelaCriarConta';
import TelaInicial from './TelaInicial';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TelaLogin">
        <Stack.Screen name="TelaLogin" component={TelaLogin} options={{ title: 'Login' }} />
        <Stack.Screen name="TelaCriarConta" component={TelaCriarConta} options={{ title: 'Criar Conta' }} />
        <Stack.Screen name="TelaInicial" component={TelaInicial} options={{ title: 'Tela Inicial' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

