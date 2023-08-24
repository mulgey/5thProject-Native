import { useContext, useLayoutEffect, useState } from "react";
import { View, StyleSheet } from "react-native";

// context provider
import { ExpensesContext } from "../store/expenses-context";

// components & constants & utilities
import IconButton from "../components/UserInterface/IconButton";
import { GlobalStyles } from "../constants/styles";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import LoadingSpinner from "../components/UserInterface/LoadingSpinner";
import ErrorHandling from "../components/UserInterface/ErrorHandling";
import {
  masrafDepola,
  masrafUpdatele,
  masrafaDeletele,
} from "../utilities/http";

// screen içerinde default olan "route" ve "navigation"ı kullandık
export default function ManageExpenseScreen({ route, navigation }) {
  // loading-spinner için state kullanmaya karar verdik
  // başlangıçta kullanıcıdan bilgi aldığımız için "false" geçtik
  const [sayfaYukleniyor, yukleniyorAksiyonu] = useState(false);

  // hata-yönetimi için state kullanmaya karar verdik. undefined başlayalım
  const [hata, hataAksiyonu] = useState();

  // context üzerinden verilere ulaşalım. createContext'teki ismi kullanmalıyız
  const expenseCtx = useContext(ExpensesContext);

  // parameter extract'leme zamanı. Soru işareti ekledik çünkü
  // route.params ya da harcamaIDsi özelliği yoksa, kod hata vermez, sadece editedID değişkeni undefined olur.
  // "harcamaIDsi" ExpenseItem.js'ten buraya navigate'lenirken içerik olarak paslandı
  const whatsMyID = route.params?.harcamaIDsi;
  // bu değeri boolean'a çevirelim, var mı yok mu, true or false?
  const isCheckPositive = !!whatsMyID;

  // üzerine dokunduğumuz masrafın hangisi olduğunu bir bulalım
  // sonra prop olarak ExpenseForm içerisine yollayalım
  const seciliMasraf = expenseCtx.expenses.find(
    (herBirTekilMasraf) => herBirTekilMasraf.id === whatsMyID
  );

  // "useLayoutEffect", DOM güncellemeleri tamamlanmadan önce çalışır ve kullanıcıya daha hızlı geri bildirim sağlar
  // DOM güncellemesi gerekmeyen bir şeyi güncelliyorsanız, o zaman "useEffect" kullanabilirsiniz. Bu, uygulama performansını artırabilir.
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isCheckPositive ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isCheckPositive]);

  async function trashPressFonksiyonu() {
    // loading spinner'ı aktive edebiliriz
    yukleniyorAksiyonu(true);
    // hata yönetimini başlatalım. "try"ladığımız şu kod süreci için hata "catch"leyelim
    try {
      expenseCtx.deleteExpense(whatsMyID);
      // await eklememizin tek sebebi pencereyi kapattığımız fonksiyonun en son çalışması
      await masrafaDeletele(whatsMyID);
      // lastly it should be closed
      navigation.goBack();
    } catch (err) {
      hataAksiyonu(
        `Silme işlemi tamamlanmadı. Lütfen tekrar deneyin. Hata mesajı: ${err}`
      );
      // bu örnekte bu sayfada kaldığımız için loading spinner ın gözükmesini istemiyoruz
      yukleniyorAksiyonu(false);
    }
  }

  function cancelFonksiyonu() {
    navigation.goBack();
  }

  async function guncelleEkleFonksiyonu(gelenVeri) {
    // loading spinner'ı aktive edebiliriz
    // bunu deaktive etmeye gerek duymadık çünkü sürecin sonunda modal sayfayı kapatıyoruz
    yukleniyorAksiyonu(true);
    // hata yönetimini başlatalım. "try"ladığımız şu kod süreci için hata "catch"leyelim
    try {
      // id var mı? varsa bu bir update girişimi
      if (isCheckPositive) {
        // burada update yaparken, local ve backend için sıra önemli değil
        // first, do it locally
        expenseCtx.updateExpense(whatsMyID, gelenVeri);
        // secondly, do it in firebase backend
        // await eklememizin tek sebebi en aşağıda pencereyi kapattığımız fonksiyonun en son çalışması
        await masrafUpdatele(whatsMyID, gelenVeri);
        // yoksa eğer bu bir ekleme girişimi
      } else {
        // burada ekleme yaparken, backend ve local sırası öenmli. çünkü önce backend'den ID'yi almalıyız
        // http.js içerisinde bu fonksiyonu promise return leyecek şekilde async yaptığımız için burada sürdürüyoruz
        // promise sonucunu fonksiyonda return'lediğimiz üzere store'luyoruz
        const ID = await masrafDepola(gelenVeri);
        // yeni masraf eklerken store'ladığımız bu ID'yi aynı zamanda context içerisine ekliyoruz
        expenseCtx.addExpense({ ...gelenVeri, id: ID });
      }
      // then it should be closed
      navigation.goBack();
    } catch (err) {
      hataAksiyonu(
        `Veriyi kaydedemedim. Lütfen tekrar deneyin. Hata mesajı: ${err}`
      );
      // bu örnekte bu sayfada kaldığımız için loading spinner ın gözükmesini istemiyoruz
      yukleniyorAksiyonu(false);
    }
  }

  // ErrorHandling içerisindeki button için fonk. tanımlayalım
  function hataFonksiyonu() {
    // hata sürecini sıfırlayalım
    hataAksiyonu(null);
  }

  // hata varsa ve sayfa yüklemesi söz konusu değil ise
  if (hata && !sayfaYukleniyor) {
    return <ErrorHandling hataMesajı={hata} onay={hataFonksiyonu} />;
  }

  if (sayfaYukleniyor) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        cancelFonksiyonu={cancelFonksiyonu}
        guncelleEkleFonksiyonu={guncelleEkleFonksiyonu}
        guncelleVeyaEkleText={isCheckPositive ? "Guncelle" : "Ekle"}
        seciliMasraf={seciliMasraf}
      />
      {isCheckPositive && (
        <View style={styles.deleteContainer}>
          <IconButton
            iconName="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={trashPressFonksiyonu}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
