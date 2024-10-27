import { Image, StyleSheet, Platform, Button } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useRouter, useFocusEffect, Href } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#a5cfd1", dark: "#353636" }}
      headerImage={
        <Ionicons
          size={310}
          name="receipt-outline"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Receiptable</ThemedText>
      </ThemedView>

      <Button
        title="Add a new receipt"
        color="#66999b"
        onPress={() => router.replace("/add-new" as Href)}
      />
      <Button
        title="View your insights"
        color="#66999b"
        onPress={() => router.replace("/insights" as Href)}
      />
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
