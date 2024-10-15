import { FlatList, View, TextInput, Text, StyleSheet } from "react-native";
import { tracks } from "@/assets/data/tracks";
import TrackListItem from "@/src/components/TrackListItem";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useState } from "react";

export default function SearchScreen() {
  const [search, setSearch] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <FontAwesome name="search" size={18} color="white" />
        <TextInput
          value={search}
          placeholder="What do you want to listen to?"
          onChangeText={setSearch}
          style={styles.input}
        />
        <Text onPress={() => setSearch("")} style={{ color: "white" }}>
          Cancel
        </Text>
      </View>

      <FlatList
        data={tracks}
        renderItem={({ item }) => <TrackListItem track={item} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
    marginRight: 15,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#121314",
    borderRadius: 10,
  },
  input: {
    color: "white",
    flex: 1,
    marginHorizontal: 10,
    padding: 8,
    borderRadius: 5,
  },
});
