import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { useSize } from "@/hooks/useSize";
import { layoutConfig, SPRING_CONFIG, VINYL_PAD } from "@/constants";

export default function Vinyl({ opened }: { opened: SharedValue<boolean> }) {
  const { VINYL_HEIGHT_OPEN, VINYL_HEIGHT_CLOSED, VINYL_HEIGHT } = useSize();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: opened.value ? VINYL_HEIGHT_OPEN : VINYL_HEIGHT_CLOSED,
    };
  });

  return (
    <Animated.View
      layout={layoutConfig}
      style={[styles.container, animatedStyle]}
    >
      <View style={{ backgroundColor: "blue", height: VINYL_HEIGHT }}>
        <Text>Vinyl</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    paddingHorizontal: 16,
    paddingVertical: VINYL_PAD,
    alignItems: "center",
    gap: VINYL_PAD / 2,
  },
});
