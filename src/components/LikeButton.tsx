import { View, Text, Pressable, ActivityIndicator } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const LikeButton = ({ trackId }: { trackId: string }) => {
  const [likeCount, setLikeCount] = useState(0); // Số lượt like từ Firestore
  const [liked, setLiked] = useState(false); // Trạng thái "like" cục bộ
  const [isProcessing, setIsProcessing] = useState(false); // Trạng thái xử lý

  // Kiểm tra xem người dùng đã like bài hát chưa
  const isLike = async () => {
    try {
      // Kiểm tra trạng thái đăng nhập
      const userInfo = await GoogleSignin.getCurrentUser();
      if (!userInfo) {
        console.error("Người dùng chưa đăng nhập.");
        return;
      }

      // console.log("Thông tin người dùng:", userInfo.user.email);

      const email = userInfo.user.email; // Lấy email từ userInfo
      const fetchTrack = await firestore()
        .collection("clone")
        .doc(trackId)
        .get();

      // if (fetchTrack.exists) {
      //   console.log("trackId:", fetchTrack.data());
      //   return;
      // }

      // Truy vấn người dùng với email từ Firestore
      const userSnapshot = await firestore()
        .collection("users")
        .where("email", "==", email)
        .get();

      if (userSnapshot.empty) {
        console.log("Không tìm thấy người dùng.");
        return;
      }

      // console.log("userSnapshot:", userSnapshot.docs[0].data());

      // Lấy danh sách like
      const userData = userSnapshot.docs[0].data();
      const likeIds = userData.like || [];

      // console.log("Like:", likeIds);

      trackId && likeIds.includes(trackId) ? setLiked(true) : setLiked(false);

      setLikeCount(fetchTrack.data()?.like);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    isLike();
  }, [trackId]);

  const toggleLike = async () => {
    if (isProcessing) return; // Ngăn người dùng spam
    setIsProcessing(true);

    const newLiked = !liked;
    const newLikeCount = newLiked ? likeCount + 1 : likeCount - 1;
    setLiked(newLiked);
    setLikeCount(newLikeCount);

    try {
      const userInfo = await GoogleSignin.getCurrentUser();
      const email = userInfo?.user.email;

      if (!email) {
        console.error("Không tìm thấy email của người dùng.");
        return;
      }

      const userSnapshot = await firestore()
        .collection("users")
        .where("email", "==", email)
        .get();

      if (userSnapshot.empty) {
        console.error("Không tìm thấy người dùng.");
        return;
      }

      const userDoc = userSnapshot.docs[0];
      const userData = userDoc.data();
      const likeIds = userData.like || [];

      const updatedLikeIds = newLiked
        ? [...likeIds, trackId]
        : likeIds.filter((id: string) => id !== trackId);

      // console.log("updatedLikeIds:", updatedLikeIds);

      const batch = firestore().batch();
      batch.update(firestore().collection("clone").doc(trackId), {
        like: newLikeCount,
      });
      batch.update(firestore().collection("users").doc(userDoc.id), {
        like: updatedLikeIds,
      });

      await batch.commit();
      console.log("Cập nhật thành công!", newLikeCount);
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);

      // Rollback trạng thái nếu có lỗi
      setLiked(!newLiked);
      setLikeCount(likeCount);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Pressable onPress={toggleLike} disabled={isProcessing}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ fontSize: 30, marginRight: 5, fontWeight: "bold" }}>
          {likeCount}
        </Text>

        {isProcessing ? (
          <ActivityIndicator size="small" color="gray" />
        ) : (
          <AntDesign
            name={liked ? "like1" : "like2"}
            size={30}
            color={liked ? "black" : "gray"}
          />
        )}
      </View>
    </Pressable>
  );
};

export default LikeButton;
