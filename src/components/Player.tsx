import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Image,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { usePlayerContext } from "../providers/PlayerProvider";
import { AudioPlayer } from "../hooks/AudioPlayer";
import { useState } from "react";
import PlayerTrackScreen from "./PlayerTrackScreen";
import FavouriteButton from "./SaveFavouritePlayer";

const Player = () => {
  const [add, setAdd] = useState(false);
  const track = usePlayerContext().track;
  const [visible, setVisible] = useState(false);

  const toggleAdd = () => {
    setAdd(!add);
  };

  const {
    isPlaying,
    isLooping,
    duration,
    position,
    onPlayPause,
    toggleLooping,
    formatTime,
    playNextTrack,
    playPreviousTrack,
  } = AudioPlayer(track);

  if (!track) {
    return null;
  }

  return (
    <View>
      <Pressable onPress={() => setVisible(true)}>
        <View style={styles.container}>
          <View style={styles.player}>
            <Image source={{ uri: track.image }} style={styles.image} />

            <View style={{ flex: 1 }}>
              <Text style={styles.title} numberOfLines={1}>
                {track.name}
              </Text>
              <Text style={styles.subtitle} numberOfLines={1}>
                {track.artists}
              </Text>
            </View>

            <View>
              <View style={styles.icon}>
                <TouchableOpacity
                  onPress={toggleLooping}
                  style={{ marginLeft: 10 }}
                >
                  <Ionicons
                    name={isLooping ? "repeat" : "repeat-outline"}
                    size={20}
                    color={isLooping ? "gold" : "white"}
                  />
                </TouchableOpacity>
                
                <Pressable>
                  <FavouriteButton trackId={track.id} />
                </Pressable>
                
                <Ionicons
                  onPress={onPlayPause}
                  disabled={!track.audio_file}
                  name={isPlaying ? "pause" : "play"}
                  size={22}
                  color={track?.audio_file ? "white" : "gray"}
                />
              </View>

              <View style={styles.progressContainer}>
                <Text style={styles.progressText}>
                  {formatTime(position)} / {formatTime(duration)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Pressable>

      <Modal transparent={true} visible={visible} animationType="slide">
        <Pressable style={styles.closeButton} onPress={() => setVisible(false)}>
          <Text style={styles.closeText}>x</Text>
        </Pressable>

        <PlayerTrackScreen
          track={track}
          isPlaying={isPlaying}
          isLooping={isLooping}
          duration={duration}
          position={position}
          onPlayPause={onPlayPause}
          toggleLooping={toggleLooping}
          playNextTrack={playNextTrack}
          playPreviousTrack={playPreviousTrack}
          formatTime={formatTime}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    flexDirection: "row",
  },
  container: {
    position: "absolute",
    // top: -75,
    bottom: 0,
    width: "100%",
    height: 80,
    padding: 10,
  },
  player: {
    backgroundColor: "#286660",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    padding: 3,
    paddingRight: 15,
  },
  title: {
    color: "white",
  },
  subtitle: {
    color: "lightgray",
    fontSize: 12,
  },
  image: {
    height: "100%",
    aspectRatio: 1,
    marginRight: 10,
    borderRadius: 5,
  },
  progressContainer: {
    // marginTop: 30,
    marginLeft: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  progressText: {
    color: "white",
    fontSize: 14,
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

export default Player;
