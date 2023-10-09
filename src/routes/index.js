import AppNavigator from "./AppNavigator";
import { UserProvider } from "../UserContext";

//---------------------------------------------------------------------------
import { useEffect, useState } from "react";
import { View, Image, Text, Pressable, ToastAndroid, StyleSheet } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import AsyncStorage from "@react-native-async-storage/async-storage";

const slides = [
  {
    key: "1",
    title: "Bem-vindo",
    text: "a uma melhor forma de manter o hábito de leitura, organizar e descobrir livros.",
    image: require("../icons/bookepper.png"),
    backgroundColor: "#1975D2",
  },
  {
    key: "2",
    title: "Encontre seu ritmo",
    text: "Calcule sua velocidade de leitura e descubra quanto tempo precisa ler por dia para alcançar seus objetivos.",
    image: require("../icons/clock.png"),
    backgroundColor: "#1975D2",
  },
  {
    key: "3",
    title: "Organize seus livros",
    text: "Tenha todos os livros que você já leu, vai ler ou está lendo na biblioteca virtual.",
    image: require("../icons/bookcase.png"),
    backgroundColor: "#1975D2",
  },
  {
    key: "4",
    title: "Novas histórias",
    text: "Explore e encontre novos universos de acordo com seu autor preferido.",
    image: require("../icons/open-book-NewStories.png"),
    backgroundColor: "#1975D2",
  },
  {
    key: "5",
    title: "Avaliações",
    text: "Veja avaliações de outras pessoas e diga o que achou sobre livros.",
    image: require("../icons/star.png"),
    backgroundColor: "#1975D2",
  },
];

export default function App() {

  const [showHome, setHome] = useState(false);

  useEffect(() => {
    async function load () {
    //  await AsyncStorage.clear()
      const firstime = await AsyncStorage.getItem('isFirstTime');
      if(firstime) {
        setHome(true);
      }
    }
    load()
  }, [])

  async function handleComecar () {
    await AsyncStorage.setItem('isFirstTime', "true")
    setHome(true)
  }


  function renderSlides({ item }) {
    return (
      <View style={{ flex: 1, backgroundColor: "#1975D2", justifyContent: "center", alignItems: "center" }}>
        <Image
          source={item.image}
          style={{
            resizeMode: "cover",
            height: 150,
            width: 150,
            marginBottom: 20
          }}
        />
        <Text
          style={{
            // paddingTop: 25,
            paddingBottom: 10,
            fontSize: 50,
            fontWeight: "bold",
            color: "#fff",
          }}
        >
          {item.title}
        </Text>
        <Text
          style={{
            textAlign: "left",
            color: "#fff",
            paddingHorizontal: 25,
            fontSize: 30,
            fontWeight: "300"
          }}
        >
          {item.text}
        </Text>
      </View>
    );
  }

  if (showHome) {
    return (
      <UserProvider>
        <AppNavigator />
      </UserProvider>
    );
  } else {
    return (
      <AppIntroSlider
        renderItem={renderSlides}
        data={slides}
        activeDotStyle={{
          backgroundColor: "#fff",
          width: 10,
        }}
        renderDoneButton={() => 
        <Pressable style={styles.btn} onPress={() => handleComecar() }>
          <Text style={{color: '#fff', fontWeight: "bold"}}>Começar</Text>
        </Pressable>}
        onDone={() =>
          ToastAndroid.showWithGravityAndOffset(
            "Entrou no App",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
          )
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#204C77',
    borderRadius: 10,
    width: 90,
    height: 30,
    justifyContent: "center",
    alignItems: "center"
  }
})
