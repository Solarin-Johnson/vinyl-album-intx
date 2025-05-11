import {
  ALBUM_PEEK_HEIGHT,
  HEADER_HEIGHT,
  isWeb,
  VINYL_PAD,
} from "@/constants";
import { useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Sizes = {
  VINYL_HEIGHT_OPEN: number;
  VINYL_HEIGHT_CLOSED: number;
  VINYL_HEIGHT: number;
  HEADER_FULL_HEIGHT: number;
};

export const useSize = (): Sizes => {
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const bottom = isWeb ? 24 : insets.bottom;
  const top = isWeb ? 16 : insets.top;

  const header_full = HEADER_HEIGHT + top;
  const vinyl_height = Math.max(
    240,
    (height - ALBUM_PEEK_HEIGHT - header_full - VINYL_PAD * 4) / 2
  );

  return {
    HEADER_FULL_HEIGHT: header_full - (isWeb ? 12 : 0),
    VINYL_HEIGHT_CLOSED: vinyl_height,
    VINYL_HEIGHT_OPEN: Math.min(
      vinyl_height * 2 + VINYL_PAD,
      height - ALBUM_PEEK_HEIGHT - header_full - VINYL_PAD * 2 - bottom
    ),
    VINYL_HEIGHT: vinyl_height,
  };
};
