import { View, Image, Text} from "react-native"
import { Appbar } from 'react-native-paper';

const TelaInicial = () => {
    return(
        <View> 
            <Appbar.Header style={{ backgroundColor: '#1975D2' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={require('../icons/bookepper.png')}
                        style={{ width: 65, height: 65 }}
                    />
                    <Text style={{ fontSize: 30, fontWeight: 'bold' }}>ookepper</Text>
                </View>
            </Appbar.Header>
                <Text>oiw</Text>
        </View>
    )
}

export default TelaInicial