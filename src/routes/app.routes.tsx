import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import TelaInicial from '../pages/TelaInicial';
import TelaPesquisa from '../pages/TelaPesquisa';
import TelaPerfil from '../pages/TelaPerfil';

const {Navigator, Screen} = createBottomTabNavigator();

export default function AppRoutes() {
    return(
        <NavigationContainer>
            <Navigator>
                <Screen name="Home" component={TelaInicial} />
                <Screen name="Pesquisa" component={TelaPesquisa}/>
                <Screen name="Perfil" component={TelaPerfil}/>
            </Navigator>
        </NavigationContainer>
    )
}