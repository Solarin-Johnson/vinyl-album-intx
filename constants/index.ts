import { PixelRatio, Platform } from "react-native";
import { LinearTransition } from "react-native-reanimated";

export const SPRING_CONFIG = {
  stiffness: 400,
  damping: 32,
  mass: 0.4,
};

export const isWeb = Platform.OS === "web";

export const VINYL_PAD = isWeb ? 24 : 20;
export const ALBUM_PEEK_HEIGHT = 150;
export const HEADER_HEIGHT = 32;

export const layoutConfig = LinearTransition.springify()
  .damping(SPRING_CONFIG.damping)
  .stiffness(SPRING_CONFIG.stiffness)
  .mass(SPRING_CONFIG.mass);
