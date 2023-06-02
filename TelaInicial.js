import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import { BottomNavigation, Text } from 'react-native-paper';

import TelaPesquisa from './TelaPesquisa';
import TelaPerfil from './TelaPerfil';

export default function TelaInicial () {
  const Tab = createBottomTabNavigator();
  <NavigationContainer>
        <Tab.Screen name="Home" component={TelaInicial} />
        <Tab.Screen name="Search" component={TelaPesquisa} />
        <Tab.Screen name="Profile" component={TelaPerfil} />
    </NavigationContainer>

  const InicioRoute = () => <Text>Inicio</Text>
  const PesquisaRoute = () => <Text>Pesquisa</Text>
  const PerfilRoute = () => <Text>Perfil</Text>

  const TelaInicial = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'inicio', title: 'Inicio', focusedIcon:'home-variant', unfocused:'home-variant-outline' },
      { key: 'pesquisa', title: 'Pesquisa', focusedIcon:'book-search', unfocused: 'book-search-outline' },
      { key: 'perfil', title: 'Perfil', focusedIcon:'account', unfocused:'account-outline' }
    ]);

    const renderScene = BottomNavigation.SceneMap({
      inicio: InicioRoute,
      pesquisa: PesquisaRoute,
      perfil: PerfilRoute,
    })
  }

  return(
    <View>
        <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        />
    </View>
  );
}

