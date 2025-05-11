import {
  ALBUM_PEEK_HEIGHT,
  HEADER_HEIGHT,
  isWeb,
  VINYL_PAD,
} from "@/constants";
import { useState, useEffect, use } from "react";
import { useWindowDimensions } from "react-native";
import { useMemo } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Sizes = {
  VINYL_HEIGHT_OPEN: number;
  VINYL_HEIGHT_CLOSED: number;
  VINYL_HEIGHT: number;
  HEADER_FULL_HEIGHT: number;
};

export const useSize = (): Sizes => {
  const { width, height } = useWindowDimensions();
  const top = isWeb ? Math.min(64, height / 20) : useSafeAreaInsets().top;

  const header_full = useMemo(() => HEADER_HEIGHT + top + 16, [top]);
  const vinyl_height = useMemo(
    () =>
      Math.min(
        360,
        Math.max(
          240,
          (height - ALBUM_PEEK_HEIGHT - header_full - VINYL_PAD * 4) / 2
        )
      ),
    [top, header_full, height]
  );

  return {
    HEADER_FULL_HEIGHT: header_full,
    VINYL_HEIGHT_CLOSED: vinyl_height,
    VINYL_HEIGHT_OPEN: vinyl_height * 2 + VINYL_PAD,
    VINYL_HEIGHT: vinyl_height,
  };
};
