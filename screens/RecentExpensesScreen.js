import { View, StyleSheet } from "react-native";

// components
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

export default function RecentExpensesScreen() {
  return (
    <View style={styles.container}>
      <ExpensesOutput expensePeriyodu="Son hafta" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
