import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons'

import TelaInicial from '../pages/TelaInicial';
import TelaPesquisa from '../pages/TelaPesquisa';
import TelaPerfil from '../pages/TelaPerfil';

const Tab = createBottomTabNavigator();

export default function TabRoutes(){
    return(
        <Tab.Navigator>
            <Tab.Screen 
                name="Início"
                component={TelaInicial}
                options= {{
                    // headerShown: false,
                    tabBarIcon: ({ color, size }) => <Feather name="home" color={color} size={size} />,
                    tabBarLabel: 'Início'
                }}
            />
            <Tab.Screen 
                name="Pesquisa"
                component={TelaPesquisa}
                options= {{
                    // headerShown: false,
                    tarBarIcon: ({ color, size }) => <Feather name="search" color={color} size={size} />,
                    tarBarLabel: 'Pesquisa'
                }}
            />
            <Tab.Screen 
                name="Perfil"
                component={TelaPerfil}
                options= {{
                    // headerShown: false,
                    tarBarIcon: ({ color, size }) => <Feather name="account" color={color} size={size} />,
                    tarBarLabel: 'Perfil'
                }}
            />
        </Tab.Navigator>
    )
}