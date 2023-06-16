import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import TelaLogin from '../pages/TelaLogin';
import TelaCriarConta from '../pages/TelaCriarConta';
import Home from '../pages/Home';
import TelaPesquisa from '../pages/TelaPesquisa';
import TelaPerfil from '../pages/TelaPerfil';
import DetalhesLivro from '../pages/DetalhesLivro';

const Stack = createStackNavigator();


const EntradaStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TelaLogin" component={TelaLogin} options={{ headerShown: false }} />
      <Stack.Screen name="TelaCriarConta" component={TelaCriarConta} />
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="TelaPesquisa" component={TelaPesquisa} options={{ headerShown: false }} />
      <Stack.Screen name="TelaPerfil" component={TelaPerfil} options={{ headerShown: false }} />
      <Stack.Screen name="DetalhesLivro" component={DetalhesLivro} options={{ title: 'Informações do livro' }}/>
    </Stack.Navigator>
  );
};

// const PrincipaisStack = () => {
//   return (
//       <Tab.Navigator>
//         <Tab.Screen name="Início" component={TelaInicial} />
//         <Tab.Screen name="Pesquisa" component={TelaPesquisa} />
//         <Tab.Screen name="Perfil" component={TelaPerfil} />
//       </Tab.Navigator>
//   );
// };

const AppNavigator = ({ isLoggedIn = false }) => {
  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <Stack.Screen name="PrincipaisStack" component={PrincipaisStack} options={{ headerShown: false }} />
      ) : (
        <Stack.Screen 
        
        name="EntradaStack" component={EntradaStack} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;