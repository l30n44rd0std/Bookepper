import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigator';

export default function App() {
  
  return (
    <NavigationContainer
      theme={{
        colors: {
          background: '#041A30', // Cor de fundo para todas as telas
          text: '#FFFFFF',
        },
      }}
    >
      <AppNavigator />
    </NavigationContainer>
  );
}