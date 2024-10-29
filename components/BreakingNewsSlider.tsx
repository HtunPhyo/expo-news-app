import { NewsArticle } from "@/lib/models/NewsModel";
import { View, Text, StyleSheet, FlatList } from "react-native";
import SliderItem from "./SliderItem";

interface Props {
  breakingNews: NewsArticle[];
}

export default function BreakingNewsSlider(props: Props) {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.heading}>Breaking News</Text> */}
      <View style={styles.sliderContainer}>
        <FlatList
          horizontal={true}
          data={props.breakingNews}
          keyExtractor={(item) => item.article_id}
          renderItem={({ item, index }) => (
            <SliderItem item={item} index={index} />
          )}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 150, // Ensures container has visible space
    width: "100%",
    padding: 10,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
  },
  sliderContainer: {
    justifyContent: "center",
    height: "100%", // Ensures FlatList uses the full container height
  },
});
