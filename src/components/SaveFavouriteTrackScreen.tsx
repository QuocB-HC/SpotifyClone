import { View } from "react-native";
import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Ionicons } from "@expo/vector-icons";

const FavouriteButton = ({ trackId }: { trackId: string }) => {
  const [favourite, setFavourite] = useState(false); // Trạng thái "favourite" cục bộ

  const isFavourite = async () => {
    try {
      const userInfo = await GoogleSignin.getCurrentUser();
      if (!userInfo) {
        console.error("Người dùng chưa đăng nhập.");
        return;
      }

      const email = userInfo?.user.email; // Lấy email từ userInfo

      // Truy vấn người dùng với email từ Firestore
      const userSnapshot = await firestore()
        .collection("users")
        .where("email", "==", email)
        .get();

      if (userSnapshot.empty) {
        console.log("Không tìm thấy người dùng.");
        return;
      }

      // Lấy danh sách favourite
      const userData = userSnapshot.docs[0].data();
      const favouriteIds = userData.favourite || [];

      // console.log("Favourite:", favouriteIds);

      if (trackId && favouriteIds.includes(trackId)) {
        setFavourite(true);
      } else {
        setFavourite(false);
      }

      trackId && favouriteIds.includes(trackId)
        ? setFavourite(true)
        : setFavourite(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    isFavourite();
  }, [trackId]);

  const toggleFavourite = async () => {
    const newFavourite = !favourite;

    try {
      const userInfo = await GoogleSignin.getCurrentUser();
      const email = userInfo?.user.email; // Lấy email từ userInfo

      // Truy vấn người dùng với email từ Firestore
      const userSnapshot = await firestore()
        .collection("users")
        .where("email", "==", email)
        .get();

      if (userSnapshot.empty) {
        console.log("Không tìm thấy người dùng.");
        return;
      }

      // Lấy danh sách favourite
      const userData = userSnapshot.docs[0].data();
      const favouriteIds = userData.favourite || [];

      if (newFavourite) {
        favouriteIds.push(trackId);
      } else {
        const index = favouriteIds.indexOf(trackId);
        favouriteIds.splice(index, 1);
      }

      await firestore()
        .collection("users")
        .doc(userSnapshot.docs[0].id)
        .update({
          favourite: favouriteIds,
        });

      setFavourite(newFavourite);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <View>
      <Ionicons
        name={favourite ? "checkmark-circle" : "add-circle-outline"}
        size={50}
        color={favourite ? "#00FF9C" : "white"}
        style={{ marginHorizontal: 10 }}
        onPress={toggleFavourite}
      />
    </View>
  );
};

export default FavouriteButton;
