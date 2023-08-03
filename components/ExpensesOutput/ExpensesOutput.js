import { View, StyleSheet } from "react-native";

// components & constants
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";

// data
const SANAL_VERI_YIGINI = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2021-12-19"),
  },
  {
    id: "e2",
    description: "A cup of coffee",
    amount: 9.99,
    date: new Date("2022-01-05"),
  },
  {
    id: "e3",
    description: "A new book",
    amount: 12.99,
    date: new Date("2021-12-01"),
  },
  {
    id: "e4",
    description: "A watermelon",
    amount: 2.99,
    date: new Date("2022-02-19"),
  },
  {
    id: "e5",
    description: "A new keyboard",
    amount: 29.99,
    date: new Date("2022-02-18"),
  },
];

export default function ExpensesOutput({ harcamalar, expensePeriyodu }) {
  return (
    <View style={styles.container}>
      <ExpensesSummary
        harcamalar={SANAL_VERI_YIGINI}
        periodIsmi={expensePeriyodu}
      />
      <ExpensesList harcamalar={SANAL_VERI_YIGINI} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
