import { TouchableOpacity, StyleSheet } from "react-native";

interface HeaderButtonProps {
  onPress?: () => void;
  children?: React.ReactNode;
}

const HeaderButton: React.FC<HeaderButtonProps> = ({ onPress, children }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.5}
      hitSlop={{ left: 12, right: 12 }}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: { width: 24 },
});

export default HeaderButton;
