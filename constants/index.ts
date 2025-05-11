import { PixelRatio, Platform } from "react-native";
import { LinearTransition } from "react-native-reanimated";

export const SPRING_CONFIG = {
  stiffness: 400,
  damping: 32,
  mass: 0.4,
};

export const isWeb = Platform.OS === "web";

export const VINYL_PAD = 20;
export const ALBUM_PEEK_HEIGHT = 150;
export const HEADER_HEIGHT = 42;

export const applySpringConfig = (
  animation: any,
  config: { damping: number; stiffness: number; mass?: number } = SPRING_CONFIG
) => {
  return animation
    .springify()
    .damping(config.damping)
    .stiffness(config.stiffness)
    .mass(config.mass);
};

export const layoutConfig = applySpringConfig(LinearTransition);
