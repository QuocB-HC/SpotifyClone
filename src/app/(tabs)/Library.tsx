import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Favourite from "@/src/screens/favorite/Favorite";

const Library = () => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.main}>
      <Pressable onPress={() => setVisible(true)}>
        <View style={styles.alb}>
          <Image
            source={require("@/src/screens/favorite/images/favourite.png")}
            style={styles.albImg}
          />
          <Text style={styles.albTitle}>FAVOURITE</Text>
        </View>
      </Pressable>

      <Modal transparent={true} visible={visible} animationType="slide">
        <View style={styles.container}>
          <Pressable
            style={styles.closeButton}
            onPress={() => setVisible(false)}
          >
            <Text style={styles.closeText}>x</Text>
          </Pressable>
          <Favourite />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#000",
  },
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 10,
  },
  alb: {
    width: "100%",
    marginRight: 30,
  },
  albImg: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: "white",
  },
  albTitle: {
    color: "white",
    fontWeight: "bold",
    marginTop: 10,
    fontSize: 20,
    position: "absolute",
    left: 0,
    top: 0,
    paddingLeft: 110,
  },
  closeButton: {
    width: 30,
    height: 30,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 15,
    position: "absolute",
    top: 10,
    left: 10,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  closeText: {
    color: "white",
    fontSize: 20,
  },
});

export default Library;
