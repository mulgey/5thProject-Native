import { useContext, useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";

// context provider
import { ExpensesContext } from "../store/expenses-context";

// components & constants & utilities
import IconButton from "../components/UserInterface/IconButton";
import { GlobalStyles } from "../constants/styles";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { masrafDepola } from "../utilities/http";

// screen içerinde default olan "route" ve "navigation"ı kullandık
export default function ManageExpenseScreen({ route, navigation }) {
  // context üzerinden verilere ulaşalım. createContext'teki ismi kullanmalıyız
  const expenseCtx = useContext(ExpensesContext);

  // parameter extract'leme zamanı. Soru işareti ekledik çünkü
  // route.params ya da harcamaIDsi özelliği yoksa, kod hata vermez, sadece editedID değişkeni undefined olur.
  // "harcamaIDsi" ExpenseItem.js'ten buraya navigate'lenirken içerik olarak paslandı
  const checkID = route.params?.harcamaIDsi;
  // bu değeri boolean'a çevirelim, var mı yok mu, true or false?
  const isCheckPositive = !!checkID;

  // üzerine dokunduğumuz masrafın hangisi olduğunu bir bulalım
  // sonra prop olarak ExpenseForm içerisine yollayalım
  const seciliMasraf = expenseCtx.expenses.find(
    (herBirTekilMasraf) => herBirTekilMasraf.id === checkID
  );

  // "useLayoutEffect", DOM güncellemeleri tamamlanmadan önce çalışır ve kullanıcıya daha hızlı geri bildirim sağlar
  // DOM güncellemesi gerekmeyen bir şeyi güncelliyorsanız, o zaman "useEffect" kullanabilirsiniz. Bu, uygulama performansını artırabilir.
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isCheckPositive ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isCheckPositive]);

  function trashPressFonksiyonu() {
    // first it should be closed
    navigation.goBack();
    expenseCtx.deleteExpense(checkID);
  }

  function cancelFonksiyonu() {
    // first it should be closed
    navigation.goBack();
  }

  function guncelleEkleFonksiyonu(gelenVeri) {
    // first it should be closed
    navigation.goBack();
    // id var mı? varsa bu bir update girişimi
    if (isCheckPositive) {
      expenseCtx.updateExpense(checkID, gelenVeri);
      // yoksa eğer bu bir ekleme girişimi
    } else {
      masrafDepola(gelenVeri);
      expenseCtx.addExpense(gelenVeri);
    }
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
