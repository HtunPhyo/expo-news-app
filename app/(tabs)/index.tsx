import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import { NewsArticle } from "@/lib/models/NewsModel";
import { NewsController } from "@/lib/controllers/NewsController";
import BreakingNewsSlider from "@/components/BreakingNewsSlider";

interface Props {}

const HomePage = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [breakingNews, setBreakingNews] = useState<NewsArticle[]>([]);
  const [newsError, setNewsError] = useState<string | null>(null); // Error for general news
  const [breakingNewsError, setBreakingNewsError] = useState<string | null>(
    null
  ); // Error for breaking news

  const controller = new NewsController(setNews, setNewsError);
  const breakingNewsController = new NewsController(
    setBreakingNews,
    setBreakingNewsError
  );

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        await controller.loadNews();
        await breakingNewsController.loadBreakingNews();
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  useEffect(() => {
    // Show alert if there’s an error in fetching news
    if (newsError) {
      Alert.alert("Error", newsError, [
        { text: "OK", onPress: () => setNewsError(null) },
      ]);
    }

    if (breakingNewsError) {
      Alert.alert("Error", breakingNewsError, [
        { text: "OK", onPress: () => setBreakingNewsError(null) },
      ]);
    }
  }, [newsError, breakingNewsError]); // Run whenever there's a change in the error states

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <SearchBar />
      <BreakingNewsSlider breakingNews={breakingNews} />
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          data={news}
          keyExtractor={(item) => item.article_id}
          renderItem={({ item }) => (
            <View style={styles.article}>
              <Text style={styles.title}>{item.title}</Text>
              <Text>{item.description}</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16 },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: { color: "red", marginBottom: 16 },
  article: { marginBottom: 16 },
  title: { fontSize: 16, fontWeight: "bold" },
});
