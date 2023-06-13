import TelaLogin from './src/pages/TelaLogin';
import TelaCriarConta from './src/pages/TelaCriarConta';
import TelaInicial from './src/pages/TelaInicial';

const Stack = createNativeStackNavigator();

// function TabRoutes() {
//    return (
//      <Tab.Navigator>
//        <Tab.Screen 
//         name="TelaInicial" 
//         component={TelaInicial} 
//         options={{headerShown: false}} 
//       />

//        <Tab.Screen 
//         name="TelaPesquisa"
//         component={TelaPesquisa}
//         options={{headerShown: false}}
//       />

//        <Tab.Screen
//         name="TelaPerfil"
//         component={TelaPerfil}
//         options={{headerShown: false}}
//       />
//      </Tab.Navigator>
//    );
// }

function IniciaisStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen 
          name="TelaLogin"
          component={TelaLogin}
          options={{headerShown: false}}
      />
  
        <Stack.Screen
        name="TelaCriarConta"
        component={TelaCriarConta}
        options={{headerShown: false}}
      />
  
        <Stack.Screen
        name="TelaInicial"
        component={TelaInicial}
        options={{headerShown: false}}
      />
      </Stack.Navigator>
    );
  }