import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDecay,
  withDelay,
  withSequence,
  withSpring,
  WithSpringConfig,
  withTiming,
} from "react-native-reanimated";
import { useSize } from "@/hooks/useSize";
import { layoutConfig, SPRING_CONFIG, VINYL_PAD } from "@/constants";
import { Image } from "expo-image";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useThemeColor } from "@/hooks/useThemeColor";

const AnimatedImage = Animated.createAnimatedComponent(Image);

const SLIDE_FACTOR = 0.01;

export default function Vinyl({
  opened,
  imageUrl,
}: {
  opened: SharedValue<boolean>;
  imageUrl: string;
}) {
  const { VINYL_HEIGHT_OPEN, VINYL_HEIGHT_CLOSED, VINYL_HEIGHT } = useSize();
  const bg = useThemeColor({}, "background");
  const offset = useSharedValue<number>(1);
  const revealed = useSharedValue<boolean>(false);
  const pressScale = useSharedValue<number>(1);

  const tap = Gesture.Tap()
    .maxDeltaX(10)
    .maxDeltaY(10)
    .onBegin(() => {
      if (revealed.value) return;
      pressScale.value = 0.98;
    })
    .onEnd(() => {
      pressScale.value = 1;
      if (revealed.value) return;
      opened.value = !opened.value;
    });

  const pan = Gesture.Pan()
    .onBegin(() => {})
    .onUpdate((e) => {
      if (!opened.value) return;
      offset.value += e.velocityX * SLIDE_FACTOR;
    })
    .onEnd((e) => {
      const factor = 80;
      const snap_end = -VINYL_HEIGHT * 1.15;

      const isValidSlide =
        offset.value < (revealed.value ? snap_end + factor : -factor);

      offset.value = withDecay({
        velocity: e.velocityX * SLIDE_FACTOR,
        deceleration: 0.985,
      });

      offset.value = withSpring(
        isValidSlide ? snap_end : 0,
        SPRING_CONFIG,
        () => {
          revealed.value = offset.value < 0;
        }
      );
    })
    .onFinalize(() => {
      pressScale.value = 1;
    });

  const composed = Gesture.Simultaneous(pan, tap);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: opened.value ? VINYL_HEIGHT_OPEN : VINYL_HEIGHT_CLOSED,
    };
  });

  const textureTranslateY = useDerivedValue(() => {
    return withSequence(
      withSpring(VINYL_HEIGHT + VINYL_PAD, SPRING_CONFIG),
      withSpring(opened.value ? 0 : 0, SPRING_CONFIG)
    );
  });

  const textureAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: textureTranslateY.value,
        },
      ],
      zIndex: withDelay(
        400,
        withTiming(opened.value ? -1 : 0, { duration: 0 })
      ),
    };
  });

  const coverAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withDelay(
            opened.value ? 400 : 0,
            withSpring(opened.value ? VINYL_HEIGHT / 2 : 0, SPRING_CONFIG)
          ),
        },
        { scale: withTiming(pressScale.value, { duration: 150 }) },
      ],
    };
  });

  const coverImageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withDelay(
            opened.value ? 400 : 0,
            withSpring(opened.value ? 1.02 : 1, SPRING_CONFIG)
          ),
        },
      ],
    };
  });

  const revealCoverAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: Math.min(0, offset.value),
        },
      ],
    };
  });

  const diskAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withDelay(
        opened.value ? 600 : 0,
        withTiming(opened.value ? 1 : 0, { duration: 0 })
      ),
    };
  });

  return (
    <Animated.View
      layout={layoutConfig}
      style={[styles.container, animatedStyle]}
    >
      <GestureDetector gesture={composed}>
        <View
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
          }}
        >
          <Animated.View
            style={[
              {
                height: VINYL_HEIGHT,
                pointerEvents: "none",
                alignItems: "center",
                position: "absolute",
                top: VINYL_HEIGHT / 2,
              },
              diskAnimatedStyle,
            ]}
          >
            <AnimatedImage
              source={require("@/assets/images/cd.png")}
              style={[styles.image, styles.cd]}
              contentFit="cover"
              contentPosition="top"
            />
          </Animated.View>
          <Animated.View
            style={[
              {
                flex: 1,
                alignItems: "center",
                height: VINYL_HEIGHT,
                pointerEvents: "none",
              },
              revealCoverAnimatedStyle,
            ]}
          >
            <Animated.View
              style={[
                {
                  height: VINYL_HEIGHT,
                  borderRadius: 80,
                  position: "absolute",
                  width: VINYL_HEIGHT / 1.1,
                  alignItems: "center",
                  boxShadow: "0px 30px 30px #00000030",
                },
                coverAnimatedStyle,
              ]}
            >
              <AnimatedImage
                source={imageUrl}
                style={[styles.image, coverImageAnimatedStyle]}
              />
              <AnimatedImage
                source={require("@/assets/images/wrap-texture.png")}
                style={[styles.image, styles.texture, textureAnimatedStyle]}
                tintColor={"#ffffff"}
              />
            </Animated.View>
          </Animated.View>
        </View>
      </GestureDetector>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: VINYL_PAD,
    alignItems: "center",
  },
  image: {
    height: "100%",
    aspectRatio: 1,
    borderRadius: 10,
  },
  cd: {
    borderRadius: 200,
  },
  texture: {
    position: "absolute",
    backgroundColor: "#80808030",
    // top: "105%",
    boxShadow: "0px 5px 8px #00000015",
  },
});
