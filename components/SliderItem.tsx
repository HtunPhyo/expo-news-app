import { StyleSheet, Image, View, Dimensions } from "react-native";
import React from "react";
import { NewsArticle } from "@/lib/models/NewsModel";

interface Props {
  item: NewsArticle;
  index: number;
}

const SliderItem = ({ item, index }: Props) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image_url }} style={styles.image} />
    </View>
  );
};

export default SliderItem;

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: width * 0.8, // Makes the item occupy 80% of screen width
    marginHorizontal: 10,
    borderRadius: 16,
    overflow: "hidden", // Ensures image respects the borderRadius
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover", // Ensures image scales correctly within container
  },
});
