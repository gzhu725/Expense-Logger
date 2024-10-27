import { Image, StyleSheet, Platform } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Ionicons from "@expo/vector-icons/Ionicons";

import { WebView } from "react-native-webview";
import React, { useState } from "react";

export default function Insights() {
  const [data, setData] = useState<string>("");
  (async () => {
    return fetch("http://localhost:5000/visualizations")
      .then((response) => response.text())
      .then((text) => {
        console.log(text);
        setData(text);
      })
      .catch((error) => {
        console.error(error);
      });
  })();
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Ionicons
          size={310}
          name="pie-chart-outline"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Your Insights</ThemedText>
      </ThemedView>

      <ThemedText>View my purchases this month:</ThemedText>
      <iframe
        src="http://localhost:5001/embed/query/4/visualization/5?api_key=GZEF2ZhZ3w8dd8Zeb2zTjbVSpyWi2JlaVcAYACx8&"
        width="340"
        height="391"
      ></iframe>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  headerImage: {
    color: "#fff",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
});
