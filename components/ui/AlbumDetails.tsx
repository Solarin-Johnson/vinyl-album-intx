import {
  PixelRatio,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { Album, Disc, Track } from "@/constants/data";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import {
  ALBUM_PEEK_HEIGHT,
  isWeb,
  layoutConfig,
  SPRING_CONFIG,
  VINYL_PAD,
} from "@/constants";
import { useSize } from "@/hooks/useSize";
import { ThemedText } from "../ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const FACTOR = isWeb ? 6 : PixelRatio.getPixelSizeForLayoutSize(2);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function AlbumDetails({
  title,
  artist,
  price,
  liked,
  discs,
}: Album) {
  const insets = useSafeAreaInsets();
  const bottom = isWeb ? 24 : insets.bottom;

  return (
    <Animated.View
      layout={layoutConfig}
      style={[styles.container, { paddingBottom: VINYL_PAD + bottom }]}
    >
      <AlbumHead {...{ title, artist, price, liked }} />
      <AlbumTracks discs={discs} />
    </Animated.View>
  );
}

const AlbumHead = ({
  title,
  artist,
  price,
  liked,
}: {
  title: string;
  artist: string;
  price: number;
  liked: boolean;
}) => {
  const { VINYL_HEIGHT } = useSize();
  const bg = useThemeColor({}, "background");
  const text = useThemeColor({}, "text");
  const insets = useSafeAreaInsets();

  const bottom = isWeb ? 24 : insets.bottom;

  const formattedPrice = React.useMemo(() => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  }, [price]);

  return (
    <View
      style={{
        height: ALBUM_PEEK_HEIGHT + VINYL_PAD - bottom / 2,
        marginTop: isWeb ? VINYL_HEIGHT / 20 : 0,
        alignSelf: "center",
        width: "100%",
        maxWidth: Math.min(VINYL_HEIGHT + 10, 280),
        justifyContent: "center",
        marginBottom: VINYL_PAD,
      }}
    >
      <View style={{ alignItems: "center" }}>
        <ThemedText
          serif
          style={{ fontSize: 28 + FACTOR, textAlign: "center" }}
          numberOfLines={1}
        >
          {title}
        </ThemedText>
        <ThemedText
          style={{ opacity: 0.4, fontSize: 15, lineHeight: 24 }}
          type="defaultSemiBold"
        >{`by ${artist}`}</ThemedText>
      </View>
      <View style={{ marginTop: 12, flexDirection: "row", gap: 6 }}>
        <Button>
          <ThemedText
            type="defaultSemiBold"
            style={{ color: bg, fontSize: 17, paddingHorizontal: 12 }}
          >{`Buy ${formattedPrice}`}</ThemedText>
        </Button>
        <Button style={{ flex: 0.45, backgroundColor: text + "20" }}>
          <FontAwesome6 name="circle-plus" size={24} color={text} />
        </Button>
      </View>
    </View>
  );
};

const Button = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) => {
  const text = useThemeColor({}, "text");
  const scale = useSharedValue<number>(1);
  const handlePressIn = () => {
    scale.value = 0.95;
  };

  const handlePressOut = () => {
    scale.value = 1;
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(scale.value, SPRING_CONFIG) }],
  }));

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.button, { backgroundColor: text }, style, animatedStyle]}
    >
      <ThemedText>{children}</ThemedText>
    </AnimatedPressable>
  );
};

const AlbumTracks = ({ discs }: { discs: Disc[] }) => {
  return (
    <View
      style={{
        width: "100%",
        alignSelf: "center",
      }}
    >
      {discs.map((track, index) => (
        <DiscCluster key={index} hasHead={discs.length > 1} {...track} />
      ))}
    </View>
  );
};

const DiscCluster = ({
  title,
  hasHead,
  tracks,
}: Disc & { hasHead: boolean }) => {
  const text = useThemeColor({}, "text");

  return (
    <View
      style={{
        width: "100%",
        maxWidth: 540,
        alignSelf: "center",
      }}
    >
      {hasHead && (
        <View style={{ paddingVertical: 12 }}>
          <ThemedText style={{ textAlign: "center", opacity: 0.4 }}>
            {title}
          </ThemedText>
        </View>
      )}
      <View
        style={{
          backgroundColor: text + "12",
          borderRadius: 24,
        }}
      >
        {tracks.map((disc, index) => (
          <React.Fragment key={index}>
            <TrackCard {...disc} />
            {index < tracks.length - 1 && (
              <View
                style={{
                  height: 1,
                  backgroundColor: text + "10",
                }}
              />
            )}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
};

const TrackCard = ({ trackNumber, title, duration }: Track) => {
  return (
    <View
      style={{
        flexDirection: "row",
        padding: 18,
        alignItems: "center",
        gap: 12,
      }}
    >
      <ThemedText
        mono
        style={{ opacity: 0.5, fontSize: 15, paddingHorizontal: 3 }}
      >
        {String(trackNumber).padStart(2, "0")}
      </ThemedText>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <ThemedText type="defaultSemiBold">{title}</ThemedText>
        <ThemedText
          type="defaultSemiBold"
          style={{ opacity: 0.5, fontSize: 14 }}
        >
          {duration}
        </ThemedText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: VINYL_PAD,
  },
  button: {
    flex: 1,
    borderRadius: 30,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
  },
});
