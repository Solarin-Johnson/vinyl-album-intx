import { LinearTransition } from "react-native-reanimated";

export const SPRING_CONFIG = {
  damping: 24,
  stiffness: 180,
};

export const VINYL_PAD = 24;
export const ALBUM_PEEK_HEIGHT = 300;
export const HEADER_HEIGHT = 36;

export const layoutConfig = LinearTransition.springify()
  .damping(SPRING_CONFIG.damping)
  .stiffness(SPRING_CONFIG.stiffness);
