import { View, StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";

// context provider
import { ExpensesContext } from "../store/expenses-context";

// components & utilities
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { belirliGunOncesininTarihi } from "../utilities/date";
import { masrafFetchle } from "../utilities/http";
import LoadingSpinner from "../components/UserInterface/LoadingSpinner";
import ErrorHandling from "../components/UserInterface/ErrorHandling";

export default function RecentExpensesScreen() {
  // loading-spinner için state kullanmaya karar verdik. başlangıçta "yükleniyor": true
  const [sayfaYukleniyor, yukleniyorAksiyonu] = useState(true);

  // hata-yönetimi için state kullanmaya karar verdik. undefined başlayalım
  const [hata, hataAksiyonu] = useState();

  // app-wide context'imizi tanıtalım. createContext içerisine yazdığımız ismi yazmalıyız
  const expensesCtx = useContext(ExpensesContext);

  // component ler re-render'landığında bazı kodların execute lanmasını sağlar
  useEffect(() => {
    // useEffect içerisinde direkt async olamayacağı için önce async olan bir fonksiyon tanımlıyoruz
    async function masraflariSirasiylaAl() {
      // süreç başlamadan yükleniyor durumunu "true" belirleyelim
      yukleniyorAksiyonu(true);
      // hata yönetimini başlatalım. "try"ladığımız şu kod süreci için hata "catch"leyelim
      try {
        const masraflar = await masrafFetchle();
        // context içerisindeki SET aksiyonu, bize "güncel veri seti"ni getiriyor
        expensesCtx.setExpenses(masraflar);
      } catch (err) {
        hataAksiyonu(`Masrafları çekemedim. Hata mesajı: ${err}`);
      }
      // yükleme süreci bittikten sonra yükleniyor durumunu "false"luyoruz
      yukleniyorAksiyonu(false);
    }
    // sonra yukarıda tanımladığımız bu async fonksiyonu çağırıyoruz
    masraflariSirasiylaAl();
  }, []);

  // ErrorHandling içerisindeki button için fonk. tanımlayalım
  function hataFonksiyonu() {
    // hata sürecini sıfırlayalım
    hataAksiyonu(null);
  }

  // hata varsa ve sayfa yüklemesi söz konusu değil ise
  if (hata && !sayfaYukleniyor) {
    return <ErrorHandling hataMesajı={hata} onay={hataFonksiyonu} />;
  }

  // yükleme devam ediyorsa Loading sayfasını gösterelim
  if (sayfaYukleniyor) {
    return <LoadingSpinner />;
  }

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
