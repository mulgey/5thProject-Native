import { useContext, useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";

// context provider
import { ExpensesContext } from "../store/expenses-context";

// components & constants
import IconButton from "../components/UserInterface/IconButton";
import Button from "../components/UserInterface/Button";
import { GlobalStyles } from "../constants/styles";

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

  function guncelleEkleFonksiyonu() {
    // first it should be closed
    navigation.goBack();
    // id var mı? varsa bu bir update girişimi
    if (isCheckPositive) {
      expenseCtx.updateExpense(checkID, {
        // currently it's dummy
        description: "The Other Test",
        amount: 59.99,
        date: new Date("2023-08-12"),
      });
      // yoksa eğer bu bir ekleme girişimi
    } else {
      expenseCtx.addExpense({
        // currently it's dummy
        description: "Test",
        amount: 29.99,
        date: new Date("2023-08-11"),
      });
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonsGroup}>
        <Button style={styles.button} mode="flat" onPress={cancelFonksiyonu}>
          Iptal Et
        </Button>
        <Button style={styles.button} onPress={guncelleEkleFonksiyonu}>
          {isCheckPositive ? "Guncelle" : "Ekle"}
        </Button>
      </View>
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
  // button style'ını prop olarak "button" component'inin içerisine gönderdik
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  buttonsGroup: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
