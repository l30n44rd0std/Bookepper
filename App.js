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

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TelaLogin" component={TelaLogin} options={{ title: 'Login' }} />
      <Stack.Screen name="TelaCriarConta" component={TelaCriarConta} options={{ title: 'Criar Conta' }} />
      <Stack.Screen name="TelaInicial" component={TelaInicial} options={{ title: 'Tela Inicial' }} />
    </Stack.Navigator>
  );
}

function AppTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="TelaInicial" component={TelaInicial} options={{ title: 'Tela Inicial' }} />
      <Tab.Screen name="TelaPesquisa" component={TelaPesquisa} options={{ title: 'Tela de Pesquisa' }} />
      <Tab.Screen name="TelaPerfil" component={TelaPerfil} options={{ title: 'Tela de Perfil do Usuário' }} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  // Função para definir o estado de autenticação
  const handleAuthStateChanged = (authenticated) => {
    setIsAuthenticated(authenticated);
  };

  React.useEffect(() => {
    // Verificar o estado de autenticação aqui
    // Se o usuário estiver autenticado, definir isAuthenticated como true
    // Caso contrário, definir como false
    // Por exemplo:
    // const authenticated = checkAuthentication();
    // handleAuthStateChanged(authenticated);
  }, []);

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <AppTabs />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
}


