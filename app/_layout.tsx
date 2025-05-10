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
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({});
  const bg = useThemeColor({}, "background");
  const text = useThemeColor({}, "text");

  const iconProps = useMemo(
    () => ({
      size: 24,
      color: text + "99",
    }),
    [text]
  );

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
      <SafeAreaProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <ThemedView style={{ flex: 1 }}>
            <View
              style={{ flex: 1, maxWidth: 500, width: "100%", margin: "auto" }}
            >
              <Stack>
                <Stack.Screen
                  name="index"
                  options={{
                    headerShadowVisible: false,
                    title: "",
                    headerLeft: () => (
                      <AntDesign name="arrowleft" {...iconProps} />
                    ),
                    headerRight: () => (
                      <Feather name="more-horizontal" {...iconProps} />
                    ),
                    headerStyle: {
                      backgroundColor: bg,
                    },
                  }}
                />
              </Stack>
            </View>
          </ThemedView>
          <StatusBar style="auto" />
        </ThemeProvider>
      </SafeAreaProvider>
    </>
  );
}
