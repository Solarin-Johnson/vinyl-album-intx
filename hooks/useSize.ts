import { ALBUM_PEEK_HEIGHT, HEADER_HEIGHT, VINYL_PAD } from "@/constants";
import { useState, useEffect } from "react";
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
  const { top } = useSafeAreaInsets();

  const header_full = useMemo(() => HEADER_HEIGHT + top, [top]);
  const vinyl_height = useMemo(
    () => (height - ALBUM_PEEK_HEIGHT - header_full) / 2,
    [top, header_full]
  );

  return useMemo(
    () => ({
      HEADER_FULL_HEIGHT: header_full,
      VINYL_HEIGHT_CLOSED: vinyl_height + VINYL_PAD * 2,
      VINYL_HEIGHT_OPEN: vinyl_height * 2 + VINYL_PAD * 2.5,
      VINYL_HEIGHT: vinyl_height,
    }),
    [width, height]
  );
};
