import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  Image,
  Pressable,
  Modal,
  Button,
} from "react-native";
import { Track } from "@/src/types";
import TrackListItem from "@/src/components/TrackListItem";
import firestore from "@react-native-firebase/firestore";

function HIEUTHUHAI() {
  const [data, setData] = useState<Track[]>([]); // Lưu kết quả tìm kiếm
  const [loading, setLoading] = useState(false); // Trạng thái tải dữ liệu
  const [filteredSongs, setFilteredSongs] = useState(data); // Dữ liệu sau filter
  const [visible, setVisible] = useState(false);
  const AlbumName = "HIEUTHUHAI";

  // Hàm fetch dữ liệu từ Firestore 
  const fetchData = async () => {
    try {
      const snapshot = await firestore().collection("clone").get();
      if (snapshot.empty) {
        console.log("No data found in Firestore.");
        setData([]); // Nếu không có dữ liệu, set mảng rỗng
      } else {
        const dataList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Track[];
        // console.log("Fetched data:", dataList);
        setData(dataList);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Call API tĩnh
  // const filterByArtist = (AlbumName: string) => {
  //   return tracks.filter(tracks =>
  //     tracks.artists.some(artist => artist.toLowerCase() === AlbumName.toLowerCase())
  //   );
  // };

  // Call API động
  useEffect(() => {
    const newData = data.filter(
      (item) =>
        item.artists &&
        item.artists.toLowerCase().includes(AlbumName.toLowerCase())
    );

    setFilteredSongs(newData);
  }, [data]);

  return (
    <View>
      <Pressable onPress={() => setVisible(true)}>
        <View style={styles.alb}>
          <Image
            source={require("./images/HIEUTHUHAI.jpg")}
            style={styles.albImg}
          />
          <Text style={styles.albTitle}>SONGS OF HIEUTHUHAI</Text>
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
            data={filteredSongs} // Sử dụng data từ state tracks
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
                  source={require("./images/HIEUTHUHAI.jpg")}
                  style={styles.img}
                />
                <Text style={styles.title}>HIEUTHUHAI</Text>
              </View>
            }
          />
        </View>
      </Modal>
    </View>
  );
}

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
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 20,
    position: "absolute",
    left: 0,
    bottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#FFF4B7',
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

export default HIEUTHUHAI;
