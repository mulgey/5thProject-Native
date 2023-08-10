import { View, StyleSheet } from "react-native";
import { useContext } from "react";

// context provider
import { ExpensesContext } from "../store/expenses-context";

// components & utilities
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { belirliGunOncesininTarihi } from "../utilities/date";

export default function RecentExpensesScreen() {
  // app-wide context'imizi tanıtalım. createContext içerisine yazdığımız ismi yazmalıyız
  const expensesCtx = useContext(ExpensesContext);

  // context içerisindeki "expenses", mevcut veriyi array olarak içerir
  // yakın tarihteki masrafları bulmak için filtreleyelim
  const recentExpenses = expensesCtx.expenses.filter((herBirExpense) => {
    // bugünü belirle
    const today = new Date();
    // 7 gün öncesini belirle
    const date7daysBefore = belirliGunOncesininTarihi(today, 7);
    // büyük = younger = daha recent
    // olmaz ama, ileri tarihli olanlar görülmesin diye ikinci bir şart ekledik
    return herBirExpense.date > date7daysBefore && herBirExpense.date <= today;
  });

  return (
    <View style={styles.container}>
      <ExpensesOutput
        harcamalar={recentExpenses}
        expensePeriyodu="Son hafta"
        fallBackText="Güncel bir harcamanız sistemde gözükmüyor"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // eğitimden farklı olarak bu hamleyi yapmadan hata verdi
  container: {
    flex: 1,
  },
});
