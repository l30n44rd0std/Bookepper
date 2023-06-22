import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import TelaInicial from './TelaInicial';
import TelaPesquisa from './TelaPesquisa';
import TelaPerfil from './TelaPerfil';

const Home = () => {
  const Tab = createBottomTabNavigator();
  
    return (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
    
              if (route.name === 'Início') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Pesquisa') {
                iconName = focused ? 'search' : 'search-outline';
              } else if (route.name === 'Perfil') {
                iconName = focused ? 'person' : 'person-outline';
              }
    
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'white',
            tabBarStyle: {
              backgroundColor: '#1975D2', // Altere a cor de fundo aqui
            },
          })}
        >
          <Tab.Screen name="Início" component={TelaInicial} options={{ headerShown: false }}/>
          <Tab.Screen name="Pesquisa" component={TelaPesquisa} options={{ headerShown: false }}/>
          <Tab.Screen name="Perfil" component={TelaPerfil} options={{ headerShown: false }}/>
        </Tab.Navigator>
    );
  
};

export default Home;