import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Header from "@/components/ui/Header";
import Head from "expo-router/head";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    InterMedium: require("../assets/fonts/Inter-Medium.ttf"),
    InterSemiBold: require("../assets/fonts/Inter-SemiBold.ttf"),
    InterBold: require("../assets/fonts/Inter-Bold.ttf"),
    NotoSerifBold: require("../assets/fonts/NotoSerif-Bold.ttf"),
    GeistMonoSemiBold: require("../assets/fonts/GeistMono-SemiBold.ttf"),
  });
  const bg = useThemeColor({}, "background");

  useEffect(() => {
    const configureSplashScreen = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn("Error configuring splash screen:", e);
      } finally {
        if (loaded) {
          await SplashScreen.hideAsync();
        }
      }
    };

    configureSplashScreen();
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <HeadComponent />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <Stack>
              <Stack.Screen
                name="index"
                options={{
                  headerShadowVisible: false,
                  headerShown: false,
                  headerTransparent: true,
                  headerStyle: {
                    backgroundColor: bg,
                  },
                }}
              />
            </Stack>
          </ThemeProvider>
        </SafeAreaProvider>
        <StatusBar style="auto" />
      </GestureHandlerRootView>
    </>
  );
}

function HeadComponent() {
  return (
    <Head>
      <title>Vinyl Album</title>
      <meta
        name="description"
        content="An interactive vinyl album built with Expo and Reanimated"
      />
      <meta name="color-scheme" content="light dark" />

      {/* Open Graph / Facebook */}
      <meta
        name="og:image"
        content="https://raw.githubusercontent.com/Solarin-Johnson/vinyl-album-intx/refs/heads/main/assets/images/twitter-cover.png"
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="675" />
      <meta property="og:title" content="Vinyl Album" />
      <meta
        property="og:description"
        content="An interactive vinyl album built with Expo and Reanimated"
      />
      <meta property="og:url" content="https://vinyl-album-intx.expo.app" />
      <meta property="og:type" content="music.album" />

      {/* Twitter */}
      <meta
        name="twitter:image"
        content="https://raw.githubusercontent.com/Solarin-Johnson/vinyl-album-intx/refs/heads/main/assets/images/twitter-cover.png"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Vinyl Album" />
      <meta
        name="twitter:description"
        content="An interactive vinyl album built with Expo and Reanimated"
      />
    </Head>
  );
}
