import { StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  runOnUI,
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDecay,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSize } from "@/hooks/useSize";
import { isWeb, layoutConfig, SPRING_CONFIG, VINYL_PAD } from "@/constants";
import { Image } from "expo-image";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const AnimatedImage = Animated.createAnimatedComponent(Image);

const SLIDE_FACTOR = 0.01;

export default function Vinyl({
  opened,
  imageUrl,
  scrollY,
}: {
  opened: SharedValue<boolean>;
  imageUrl: string;
  scrollY: SharedValue<number>;
}) {
  const { VINYL_HEIGHT_OPEN, VINYL_HEIGHT_CLOSED, VINYL_HEIGHT } = useSize();
  const offset = useSharedValue<number>(1);
  const revealed = useSharedValue<boolean>(false);
  const pressScale = useSharedValue<number>(1);
  const hasSequence = useSharedValue<boolean>(false);
  const [opacity, loaded1, loaded2] = [
    useSharedValue(0),
    useSharedValue(false),
    useSharedValue(false),
  ];

  useDerivedValue(
    () =>
      loaded1.value &&
      loaded2.value &&
      (opacity.value = withTiming(1, { duration: 250 }))
  );

  useEffect(() => {
    Image.prefetch(imageUrl).then(() => (loaded1.value = true));
  }, []);

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
      offset.value = 0;
    });

  const pan = Gesture.Pan()
    .onBegin(() => {})
    .onUpdate((e) => {
      if (!opened.value) return;
      offset.value += e.velocityX * SLIDE_FACTOR;
    })
    .onEnd((e) => {
      const factor = 80;
      const snap_end = -VINYL_HEIGHT * 1.1;

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

  useAnimatedReaction(
    () => opened.value,
    (opened, prev) => {
      if (opened !== prev && prev !== null) {
        hasSequence.value = true;
        console.log(opened, prev);

        isWeb &&
          runOnUI(() => {
            setTimeout(() => {
              hasSequence.value = false;
              console.log("false");
            }, 600);
          })();
      }
    }
  );

  const composed = Gesture.Simultaneous(pan, tap);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: withDelay(
        opened.value || !hasSequence.value ? 0 : 400,
        withSpring(
          opened.value ? VINYL_HEIGHT_OPEN : VINYL_HEIGHT_CLOSED,
          isWeb ? SPRING_CONFIG : { duration: 0 }
        )
      ),
      opacity: withSpring(opacity.value, SPRING_CONFIG),
    };
  });

  const textureAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: hasSequence.value
            ? withSequence(
                withSpring(VINYL_HEIGHT + VINYL_PAD, SPRING_CONFIG),
                withSpring(opened.value ? 0 : 0, SPRING_CONFIG)
              )
            : 0,
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
      height: VINYL_HEIGHT,
      width: VINYL_HEIGHT / 1.1,
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
      ...(isWeb && {
        height: VINYL_HEIGHT,
        top: VINYL_HEIGHT / 2,
      }),
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
                pointerEvents: "none",
                alignItems: "center",
                position: "absolute",
                height: VINYL_HEIGHT,
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
                pointerEvents: "none",
                zIndex: 10,
              },
              revealCoverAnimatedStyle,
            ]}
          >
            <Animated.View
              style={[
                {
                  borderRadius: 80,
                  position: "absolute",
                  alignItems: "center",
                  boxShadow: "0px 25px 30px #00000030",
                },
                coverAnimatedStyle,
              ]}
            >
              <AnimatedImage
                source={imageUrl}
                style={[styles.image, coverImageAnimatedStyle]}
                onLoad={() => (loaded1.value = true)}
              />
              <AnimatedImage
                source={require("@/assets/images/wrap-texture.png")}
                style={[styles.image, styles.texture, textureAnimatedStyle]}
                onLoad={() => (loaded2.value = true)}
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
    boxShadow: "0px 0px 15px #00000020",
  },
});
