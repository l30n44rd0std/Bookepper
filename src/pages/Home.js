import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TelaInicial from './TelaInicial';
import TelaPesquisa from '../pages/TelaPesquisa';
import TelaPerfil from '../pages/TelaPerfil';

const Home = () => {
  const Tab = createBottomTabNavigator();
  
    return (
        <Tab.Navigator>
          <Tab.Screen name="Início" component={TelaInicial} options={{ headerShown: false }}/>
          <Tab.Screen name="Pesquisa" component={TelaPesquisa} options={{ headerShown: false }}/>
          <Tab.Screen name="Perfil" component={TelaPerfil} options={{ headerShown: false }}/>
        </Tab.Navigator>
    );
  
};

export default Home;