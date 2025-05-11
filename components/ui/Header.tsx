import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import HeaderButton from "./HeaderButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { HEADER_HEIGHT, isWeb } from "@/constants";
import { Image } from "expo-image";
import { ThemedText } from "../ThemedText";

const Header: React.FC<{
  show: SharedValue<boolean>;
  imageUrl?: string;
  title?: string;
}> = ({ show, imageUrl, title }) => {
  const bg = useThemeColor({}, "background");
  const text = useThemeColor({}, "text");
  const insets = useSafeAreaInsets();
  const top = isWeb ? 0 : insets.top;

  const iconProps = useMemo(
    () => ({
      size: 24,
      color: text + "99",
    }),
    [text]
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(show.value ? 1 : 0),
    };
  });

  return (
    <View
      style={[
        {
          paddingTop: top + 16,
          paddingBottom: isWeb ? 12 : 0,
        },
        animatedStyle,
      ]}
    >
      <Animated.View
        style={[styles.overlay, { backgroundColor: bg }, animatedStyle]}
      />
      <View
        style={[styles.container, { transform: [{ translateY: -top / 4 }] }]}
      >
        <HeaderButton>
          <AntDesign name="arrowleft" {...iconProps} />
        </HeaderButton>
        <Animated.View
          style={[
            {
              height: "100%",
              alignItems: "center",
              flexDirection: "row",
              gap: 8,
            },
            animatedStyle,
          ]}
        >
          <Image
            source={imageUrl}
            style={{
              width: HEADER_HEIGHT * 0.7,
              height: HEADER_HEIGHT * 0.7,
              borderRadius: 4,
            }}
          />
          {title && <ThemedText type="defaultSemiBold">{title}</ThemedText>}
        </Animated.View>
        <HeaderButton>
          <Feather name="plus" {...iconProps} />
        </HeaderButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: HEADER_HEIGHT,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Header;
