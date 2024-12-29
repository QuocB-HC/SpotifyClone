import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image, Pressable, Modal } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { Track } from "@/src/types";
import TrackListItem from "@/src/components/TrackListItem";

const TopRanking = () => {
  const [topPosts, setTopPosts] = useState<Track[]>([]); // Lưu danh sách Top 10 bài viết
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchTopPosts = async () => {
      try {
        const snapshot = await firestore()
          .collection("clone") // Tên collection Firestore
          .orderBy("like", "desc") // Sắp xếp theo số lượng like giảm dần
          .limit(10) // Lấy 10 bài viết
          .get();

        const track = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Track[];

        setTopPosts(track);
      } catch (error) {
        console.error("Lỗi khi lấy top bài viết:", error);
      }
    };

    fetchTopPosts();
  }, []); // Chạy một lần khi component mount

  return (

    <View>
      <Pressable onPress={() => setVisible(true)}>
        <View style={styles.alb}>
          <Image
            source={require("./images/Top-10-Songs.png")}
            style={styles.albImg}
          />
          <Text style={styles.albTitle}>TOP 10 SONGS OF WEEK</Text>
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

          <FlatList
        data={topPosts} // Sử dụng data từ state tracks
        keyExtractor={(item) => item.id} // Dùng id bài hát làm key
        renderItem={({ item }) => (
          <View style={styles.list}>
            <TrackListItem track={item} />
          </View>
        )} // Hiển thị mỗi item
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.info}>
            <Image
              source={require("./images/Top-10-Songs.png")}
              style={styles.img}
            />
            <Text style={styles.title}>Top 10 songs</Text>
          </View>
        }
      />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 0,
    margin: 0,
  },
  img: {
    height: 350,
    width: "100%",
    marginTop: 0,
  },
  alb: {
    width: 150,
    marginRight: 30,
  },
  albImg: {
    height: 150,
    width: 150,
    borderRadius: 5,
    borderBottomColor: "#FFF4B7",
    borderBottomWidth: 5,
    borderStyle: "solid",
  },
  albTitle: {
    color: "white",
    fontWeight: "bold",
    marginTop: 10,
    fontSize: 20,
    position: "absolute",
    left: 0,
    bottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: "#FFF4B7",
    paddingLeft: 10,
  },
  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    zIndex: 10,
    position: "absolute",
    left: 10,
    bottom: 5,
  },
  info: {
    marginBottom: 40,
    paddingBottom: 0,
  },
  list: {
    marginLeft: 20,
    marginRight: 20,
  },
  closeButton: {
    width: 30,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: "40%",
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 10,
  },
  closeText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 5,
  },
});

export default TopRanking;
