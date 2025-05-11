import React from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import Animated, {
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { Stack } from "expo-router";
import Header from "@/components/ui/Header";
import { layoutConfig, VINYL_PAD } from "@/constants";
import { useSize } from "@/hooks/useSize";
import Vinyl from "@/components/ui/Vinyl";
import { ALBUM } from "@/constants/data";
import AlbumDetails from "@/components/ui/AlbumDetails";

export default function Index() {
  const scrollY = useSharedValue(0);
  const vinylOpened = useSharedValue(false);
  const { VINYL_HEIGHT_OPEN, VINYL_HEIGHT_CLOSED, HEADER_FULL_HEIGHT } =
    useSize();

  const showHeader = useDerivedValue(
    () =>
      scrollY.value >=
      (vinylOpened ? VINYL_HEIGHT_OPEN : VINYL_HEIGHT_CLOSED) -
        HEADER_FULL_HEIGHT
  );

  return (
    <>
      <Stack.Screen
        name="index"
        options={{
          header: () => <Header show={showHeader} />,
          headerTransparent: true,
        }}
      />
      <ThemedView style={styles.container}>
        <Animated.ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingTop: HEADER_FULL_HEIGHT + VINYL_PAD / 2,
            // minHeight: "100%",
          }}
          layout={layoutConfig}
          showsVerticalScrollIndicator={false}
        >
          <Vinyl
            opened={vinylOpened}
            imageUrl={ALBUM.coverUrl}
            scrollY={scrollY}
          />
          <AlbumDetails {...ALBUM} />
        </Animated.ScrollView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
