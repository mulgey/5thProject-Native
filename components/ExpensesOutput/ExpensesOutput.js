import { View, StyleSheet, Text } from "react-native";

// components & constants
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";

// data was moved from here

export default function ExpensesOutput({
  harcamalar,
  expensePeriyodu,
  fallBackText,
}) {
  // içerik olmayacakmış gibi text'imizi hazırlayalım
  let icerik = <Text style={styles.infoText}>{fallBackText}</Text>;

  // eğer gösterecek bir içerik var ise list comp. miz çalışsın
  if (harcamalar.length > 0) {
    icerik = <ExpensesList harcamalar={harcamalar} />;
  }

  return (
    <View style={styles.container}>
      <ExpensesSummary harcamalar={harcamalar} periodIsmi={expensePeriyodu} />
      {/* yukarıdaki duruma göre içerik neyse aşağıya yansısın */}
      {icerik}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
