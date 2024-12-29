import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import LikeButton from "./LikeButton";
import { Track } from "../types";
import FavouriteButton from "./SaveFavouriteTrackScreen";

const PlayerTrackScreen = ({
  track,
  isPlaying,
  isLooping,
  position,
  duration,
  onPlayPause,
  toggleLooping,
  playNextTrack,
  playPreviousTrack,
  formatTime,
}: {
  track: Track;
  isPlaying: any;
  isLooping: any;
  position: any;
  duration: any;
  onPlayPause: any;
  toggleLooping: any;
  playNextTrack: any;
  playPreviousTrack: any;
  formatTime: any;
}) => {
  const colorValue = useRef(new Animated.Value(0)).current;
  const spinValue = useRef(new Animated.Value(0)).current;
  const [add, setAdd] = useState(false);

  const toggleAdd = () => {
    setAdd(!add);
  };

  useEffect(() => {
    animateColor();
  }, []);

  const animateColor = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(colorValue, {
          toValue: 1,
          duration: 5000,
          useNativeDriver: false, // required for color animation
        }),
      ])
    ).start();
  };

  // Interpolate the color based on the animated value
  const backgroundColor = colorValue.interpolate({
    inputRange: [0, 0.5, 1, 1.5, 2],
    outputRange: ["#DC143C", "#FFA07A", "#FFC0CB", "#FF573380", "#DC143C"],
  });

  // First set up animation
  useEffect(() => {
    startSpinning();
  }, []);

  const startSpinning = () => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 10000, // Adjust duration for spin speed
        useNativeDriver: true,
      })
    ).start();
  };

  // Interpolating the spin value to degrees
  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  if (!track) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor }, // Áp dụng màu sắc vào background
      ]}
    >
      <ScrollView>
        <View style={{ marginTop: 50 }}>
          <Animated.Image
            source={{ uri: track.image }}
            style={[styles.image, { transform: [{ rotate }] }]}
          />

          <LikeButton trackId={track.id} />

          <View>
            <Text style={styles.title}>{track.name}</Text>
            <Text style={styles.subtitle}>Ca sĩ: {track.artists}</Text>
            <Text style={styles.subtitle}>Nhà soạn nhạc: {track.musician}</Text>
            <Text style={styles.subtitle}>Thể loại: {track.category}</Text>
            {/* <Text style={styles.subtitle}>
                Ca sĩ: {track.artists.join(", ")}
              </Text>
              <Text style={styles.subtitle}>
                Nhà soạn nhạc: {track.musician.join(", ")}
              </Text>
              <Text style={styles.subtitle}>
                Thể loại: {track.category.join("/")}
              </Text> */}
          </View>

          {/* Display Duration and Position */}
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>
              {formatTime(position)} / {formatTime(duration)}
            </Text>
          </View>

          <View>
            <View style={styles.icon}>
              {/* Button to toggle looping */}
              <TouchableOpacity onPress={toggleLooping}>
                <Ionicons
                  name={isLooping ? "repeat" : "repeat-outline"} // Icon changes based on looping state
                  size={50}
                  color={isLooping ? "gold" : "white"} // Color changes based on looping state
                />
              </TouchableOpacity>

              <Ionicons
                onPress={playPreviousTrack}
                name={"play-skip-back"}
                size={50}
                color={"white"}
                style={{ marginLeft: 30 }}
              />

              <Ionicons
                onPress={onPlayPause}
                disabled={!track.audio_file}
                name={isPlaying ? "pause-circle-sharp" : "play-circle-sharp"}
                size={50}
                color={track?.audio_file ? "white" : "gray"}
                style={{ marginLeft: 30, marginRight: 30 }}
              />

              <Ionicons
                onPress={playNextTrack}
                name={"play-skip-forward"}
                size={50}
                color={"white"}
                style={{ marginRight: 30 }}
              />

              <FavouriteButton trackId={track.id} />
            </View>
          </View>
        </View>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
    padding: 0,
    flex: 1,
  },
  image: {
    height: 300,
    width: 300,
    borderRadius: 500,
    marginLeft: 50,
    marginTop: 100,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    margin: 10,
    marginTop: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    opacity: 0.5,
    textAlign: "center",
    marginBottom: 10,
  },
  icon: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
  },
  progressContainer: {
    // marginTop: 30,
    marginLeft: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  progressText: {
    color: "white",
    fontSize: 30,
  },
});

export default PlayerTrackScreen;
