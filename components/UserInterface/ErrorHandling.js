import { View, Text, StyleSheet } from "react-native";

// components & constants
import { GlobalStyles } from "../../constants/styles";
import Button from "../UserInterface/Button";

export default function ErrorHandling({ hataMesajı, onay }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.titleText]}>Bir hata söz konusu</Text>
      <Text style={styles.text}>{hataMesajı}</Text>
      <Button onPress={onay}>Tamamdır</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    color: "white",
    textAlign: "center",
    marginBottom: 8,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
