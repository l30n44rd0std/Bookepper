import { ToastAndroid } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
    {
        key: '1',
        title: 'Bem-vindo',
        text: 'a uma melhor forma de manter o hábito de leitura, organiza e descobrir livros.',
        image: require('./icons/bookepper.png'),
        backgroundColor: '#1975D2',
    },
    {
        key: '2',
        title: 'Encontre seu ritmo',
        text: 'Calcule sua velocidade de leitura e descubra quanto tempo precisa ler por dia para alcançar seus objetivos.',
        image: require('./icons/clock.png'),
        backgroundColor: '#1975D2',
    },
    {
        key: '3',
        title: 'Organize seus livros',
        text: 'Tenha todos os livros que você já leu, vai ler ou está lendo na biblioteca virtual.',
        image: require('./icons/bookcase.png'),
        backgroundColor: '#1975D2',
    },
    {
        key: '4',
        title: 'Novas histórias',
        text: 'Explore e encontre novos universos de acordo com seu autor preferido.',
        image: require('./icons/open-book-NewStories.png'),
        backgroundColor: '#1975D2',
    },
    {
        key: '4',
        title: 'Avaliações',
        text: 'Veja avaliações de outras pessoas e diga o que achou sobre livros.',
        image: require('./icons/star.png'),
        backgroundColor: '#1975D2',
    },
];

export default function IntroSlides() {

    const [showHome, setHome] = useState(false);

    function renderSlides({ item }) {
        return(
            <View style={{ flex: 1 }}>
                <Image 
                source={item.image}
                style={{
                    resizeMode: 'cover',
                    height: '73%',
                    width: '100%'
                }}
                />
                <Text style={{
                    paddingTop: 25,
                    paddingBottom: 10,
                    fontSize: 23,
                    fontWeight: 'bold',
                    color: '#000'
                }}>{item.title}</Text>
                <Text style={{
                    textAlign: 'center',
                    color: '#000',
                    paddingHorizontal: 25,
                    fontSize: 15
                }}>{item.text}</Text>
            </View>
        )
    }

    if(showHome){
        return <Text>Entrou na home</Text>
    } else {
        return (
            <AppIntroSlider 
            renderItem={renderSlides}
            data={slides}
            activeDotStyle={{
                backgroundColor: '#fff',
                width: 30
            }}
            renderDoneButton={() => <Text>Começar</Text>}
            onDone={() => ToastAndroid.showWithGravityAndOffset(
                'Entrou no App',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              )}
            />
        )
    }
}