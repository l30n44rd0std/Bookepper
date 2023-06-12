import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { BottomNavigation } from 'react-native-paper';

// Import das telas
import TelaLogin from './src/pages/TelaLogin';
import TelaCriarConta from './src/pages/TelaCriarConta';
import TelaInicial from './src/pages/TelaInicial';
import TelaPesquisa from './src/pages/TelaPesquisa';
import TelaPerfil from './src/pages/TelaPerfil';

// const Stack = createNativeStackNavigator();
// const Tab = createMaterialBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TelaLogin" component={TelaLogin} options={{headerShown: false}}  />
      <Stack.Screen name="TelaCriarConta" component={TelaCriarConta} options={{headerShown: false}}  />
      <Stack.Screen name="TelaInicial" component={TelaInicial} options={{headerShown: false}}  />
    </Stack.Navigator>
  );
}

// function AppTabs() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="TelaInicial" component={TelaInicial} options={{headerShown: false}} />
//       <Tab.Screen name="TelaPesquisa" component={TelaPesquisa} options={{headerShown: false}} />
//       <Tab.Screen name="TelaPerfil" component={TelaPerfil} options={{headerShown: false}} />
//     </Tab.Navigator>
//   );
// }

// export default function App() {
//   const [isAuthenticated, setIsAuthenticated] = React.useState(false);

//   const handleAuthStateChanged = (authenticated) => {
//     setIsAuthenticated(authenticated);
//   };

//   React.useEffect(() => {

//   }, []);

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <AppTabs />
        ) : (
          <AuthStack />
          )}
    </NavigationContainer>
    <Routes />
  );
}


