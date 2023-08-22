import { View, StyleSheet } from "react-native";
import { useContext, useEffect } from "react";

// context provider
import { ExpensesContext } from "../store/expenses-context";

// components & utilities
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { belirliGunOncesininTarihi } from "../utilities/date";
import { masrafFetchle } from "../utilities/http";

export default function RecentExpensesScreen() {
  // app-wide context'imizi tanıtalım. createContext içerisine yazdığımız ismi yazmalıyız
  const expensesCtx = useContext(ExpensesContext);

  // bunu kullanmıyoruz çünkü ekledikten sonra sayfa güncellenmiyor (A01)
  // const [fetchlenenMasraflar, fetchAksiyonu] = useState([]);

  // component ler re-render'landığında bazı kodların execute lanmasını sağlar
  useEffect(() => {
    // useEffect içerisinde direkt async olamayacağı için önce async olan bir fonksiyon tanımlıyoruz
    async function masraflariSirasiylaAl() {
      const masraflar = await masrafFetchle();
      // bunu kullanmıyoruz çünkü ekledikten sonra sayfa güncellenmiyor (A01)
      // fetchAksiyonu(masraflar);
      // context içerisindeki SET aksiyonu, bize "güncel veri seti"ni getiriyor
      expensesCtx.setExpenses(masraflar);
    }

    // sonra bu async fonksiyonu çağırıyoruz
    masraflariSirasiylaAl();
  }, []);

  // context içerisindeki "expenses", mevcut veriyi array olarak içerir
  // yakın tarihteki masrafları bulmak için filtreleyelim
  // "fetchlenenMasraflar" yerine tekrardan "expensesCtx.expenses"ı ekledik
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
