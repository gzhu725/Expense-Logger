import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Image, Platform, Button } from "react-native";
import { Link } from "@react-navigation/native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useState } from "react";

import { useRouter, useFocusEffect, Href } from "expo-router";

export default function TabTwoScreen() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  (async () => {
    return fetch("http://localhost:5000/user-info")
      .then((response) => response.text())
      .then((text) => {
        console.log(text);
        setUsername(text);
      })
      .catch((error) => {
        console.error(error);
      });
  })();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#a5cfd1", dark: "#353636" }}
      headerImage={
        <Ionicons
          size={310}
          name="settings-outline"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Profile</ThemedText>
      </ThemedView>
      <ThemedText>You're currently logged in as: {username}</ThemedText>

      <Button
        title="Log Out"
        color="#66999b"
        onPress={() => router.replace("/SignIn" as Href)}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#fff",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
