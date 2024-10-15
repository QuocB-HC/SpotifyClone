import { FlatList } from "react-native";
import { tracks } from "@/assets/data/tracks";
import TrackListItem from "@/src/components/TrackListItem";

export default function LibraryScreen() {
  return (
      <FlatList
        data={tracks}
        renderItem={({ item }) => <TrackListItem track={item} />}
        showsVerticalScrollIndicator={false}
      />
  );
}
