import React, { useEffect, useState } from "react";
import { Image, Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const TelaAutor = ({ route }) => {
  const { authorName } = route.params || {};
  // console.log(authorName);
  const [authorData, setAuthorData] = useState(null);

  useEffect(() => {
    const apiAuthorUrl = `https://pt.wikipedia.org/api/rest_v1/page/summary/${authorName}`;

    fetch(apiAuthorUrl)
      .then((response) => response.json())
      .then((data) => {
        setAuthorData(data);
        // console.log(authorData);
      })
      .catch((error) => console.error(error));
  }, [authorName]);

  const handleAuthorWikipedia = () => {
    const formattedTitle = authorName.replace(/ /g, "_");
    const wikipediaLink = `https://pt.m.wikipedia.org/wiki/${formattedTitle}`;
    
    Linking.openURL(wikipediaLink);
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          {authorData?.thumbnail && (
            <Image
              // source={{uri:'https://www.usmagazine.com/wp-content/uploads/2018/01/colleen-hoover1.jpg?w=1600&quality=86&strip=all'}}
              source={{ uri: authorData.thumbnail.source }}
              style={styles.img}
            />
          )}
          <Text style={styles.nameAuthor}>{authorName}</Text>
        </View>

        <View style={styles.body}>
          <Text style={styles.titleDescription}>Descrição</Text>
          <Text style={styles.description}>
            {authorData?.extract || "Informações não encontradas."}
          </Text>
        </View>

        <View style={styles.viewBtn}>
          <Pressable style={styles.btn} onPress={()=> handleAuthorWikipedia()}>
            <Text style={styles.btnText}>Ver informações detalhadas</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#041A30",
  },
  header: {
    backgroundColor: "#1976D2",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 300,
    height: 300,
    borderRadius: 150,
    marginTop: 70,
    marginBottom: 20,
  },
  body: {
    flexDirection: "column",
    margin: 30,
  },
  nameAuthor: {
    color: "#ffff",
    fontWeight: "bold",
    fontSize: 40,
    marginBottom: 30,
  },
  titleDescription: {
    color: "#ffff",
    fontWeight: "bold",
    fontSize: 40,
    paddingBottom: 20,
  },
  description: {
    color: "#ffff",
    fontSize: 20,
  },
  viewBtn: {
    // position: "absolute",
    // width: 500,
    // height: 1900,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    backgroundColor: "#104C87",
    justifyContent: "center",
    alignItems: "center",
    width: 430,
    height: 50,
    borderRadius: 10,
  },
  btnText: {
    color: "#ffff",
    fontWeight: "bold",
    fontSize: 17,
  },
});

export default TelaAutor;
