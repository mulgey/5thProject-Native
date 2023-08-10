import { View, Text, StyleSheet, Pressable } from "react-native";

// constants
import { GlobalStyles } from "../../constants/styles";

export default function Button({ children, onPress, mode, style }) {
  return (
    // dışarıdan ayrı bir style uygulamak istersek button component ine, "style" prop'u buraya paslarız
    // sadece outer view için değil, içeriside komponent'ler için de style'lar import'layabiliriz
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        {/* aşağıda "button" style her zaman uygulanır, "flatStyle" sadece mode = "flat" ise uygulanır */}
        <View style={[styles.button, mode === "flat" && styles.flatStyle]}>
          <Text
            style={[styles.buttonText, mode === "flat" && styles.flatTextStyle]}
          >
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary500,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  flatStyle: {
    backgroundColor: "transparent",
  },
  flatTextStyle: {
    color: GlobalStyles.colors.primary200,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 4,
  },
});
