import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TelaInicial from '../pages/TelaInicial';
import TelaPesquisa from '../pages/TelaPesquisa';
import TelaPerfil from '../pages/TelaPerfil';

const Tab = createBottomTabNavigator();

export default function TabRoutes(){
    return(
        <Tab.Navigator>
            <Tab.Screen 
                name="inicio"
                component={TelaInicial}
            />
            <Tab.Screen 
                name="pesquisa"
                component={TelaPesquisa}
            />
            <Tab.Screen 
                name="inicio"
                component={TelaPerfil}
            />
        </Tab.Navigator>
    )
}