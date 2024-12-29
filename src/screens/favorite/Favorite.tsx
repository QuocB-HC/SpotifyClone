import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Track } from "@/src/types";
import TrackListItem from "@/src/components/TrackListItem";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import firestore from "@react-native-firebase/firestore";

function Favourite() {
  const [favouriteSongs, setFavouriteSongs] = useState<Track[]>([]);
  const [userInfo, setUserInfo] = useState(null); // Lưu thông tin người dùng Google Sign-In
  const [loading, setLoading] = useState(false); // Trạng thái tải dữ liệu

  // Cấu hình Google Sign-In
  GoogleSignin.configure({
    webClientId:
      "1044632252747-2hp0ka7ofe9giln2jl1s31nm7n3j9ikc.apps.googleusercontent.com",
  });

  // Hàm fetch dữ liệu từ Firestore
  const fetchFavourites = async () => {
    // if (!userInfo) return;

    setLoading(true); // Bật trạng thái loading

    try {
      const userInfo = await GoogleSignin.signIn();
      const email = userInfo.data?.user.email; // Lấy email từ userInfo

      // Truy vấn người dùng với email từ Firestore
      const userSnapshot = await firestore()
        .collection("users")
        .where("email", "==", email)
        .get();

      if (userSnapshot.empty) {
        console.log("Không tìm thấy người dùng.");
        setFavouriteSongs([]);
        return;
      }
      console.log(userSnapshot)

      // Lấy danh sách favourite
      const userData = userSnapshot.docs[0].data();
      const favouriteIds = userData.favourite || [];

      console.log("Favourite:", favouriteIds);

      // Nếu favouriteIds rỗng, không thực hiện truy vấn
      if (favouriteIds.length === 0) {
        setFavouriteSongs([]);
        return;
      }

      // Truy vấn bài hát dựa trên favourite
      const trackSnapshot = await firestore()
        .collection("clone")
        .where(firestore.FieldPath.documentId(), "in", favouriteIds)
        .get();

      const tracks = trackSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Track[];

      setFavouriteSongs(tracks);
    } catch (error) {
      console.error("Lỗi khi fetch danh sách bài hát:", error);
    } finally {
      setLoading(false); // Tắt trạng thái loading
    }
  };

  // Fetch danh sách bài hát khi userInfo thay đổi
  useEffect(() => {
    fetchFavourites();
  }, [userInfo]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (favouriteSongs.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Không có bài hát yêu thích nào.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favouriteSongs}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.list}>
          <TrackListItem track={item} />
        </View>
      )}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <View style={styles.info}>
          <Text style={styles.title}>Favourite Songs</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  emptyText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 40,
    left: 10,
    top: 60,
  },
  list: {
    marginLeft: 20,
    marginRight: 20,
  },
  info: {
    marginBottom: 40,
    paddingBottom: 0,
  },
});

export default Favourite;
