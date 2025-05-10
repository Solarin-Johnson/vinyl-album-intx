import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import HeaderButton from "./HeaderButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SharedValue } from "react-native-reanimated";

const Header: React.FC<{ show: SharedValue<boolean> }> = ({ show }) => {
  const bg = useThemeColor({}, "background");
  const text = useThemeColor({}, "text");
  const { top } = useSafeAreaInsets();

  const iconProps = useMemo(
    () => ({
      size: 24,
      color: text + "99",
    }),
    [text]
  );

  return (
    <View style={{ backgroundColor: bg, paddingTop: top }}>
      <View style={styles.container}>
        <HeaderButton>
          <AntDesign name="arrowleft" {...iconProps} />
        </HeaderButton>
        <Text style={styles.title}>Vinyl Album</Text>
        <HeaderButton>
          <Feather name="more-horizontal" {...iconProps} />
        </HeaderButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Header;
