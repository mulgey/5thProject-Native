import { View, StyleSheet } from "react-native";
import { useContext } from "react";

// context provider
import { ExpensesContext } from "../store/expenses-context";

// components
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

export default function AllExpensesScreen() {
  // app-wide context'imizi tanıtalım. createContext içerisine yazdığımız ismi yazmalıyız
  const expensesCtx = useContext(ExpensesContext);

  return (
    <View style={styles.container}>
      <ExpensesOutput
        // context içerisindeki "expenses", mevcut veriyi array olarak içerir
        harcamalar={expensesCtx.expenses}
        expensePeriyodu="Hepsi"
        fallBackText="Sistemde maalesef hiç harcamanız yok. Dışarı çıkın ve ekonomiye can verin"
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
