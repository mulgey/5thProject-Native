import { View, StyleSheet } from "react-native";

// components
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

export default function AllExpensesScreen() {
  return (
    <View style={styles.container}>
      <ExpensesOutput expensePeriyodu="Hepsi" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
