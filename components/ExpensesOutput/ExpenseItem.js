import { View, StyleSheet, Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

// constants & utilities
import { GlobalStyles } from "../../constants/styles";
import { tarihiFormatla } from "../../utilities/date";

// ExpensesOutput.js'ten harcamalar={SANAL_VERI_YIGINI} olarak ExpensesList.js'e göndermiştik
// ExpensesList.js içerisinde FlatList renderItem'a {...harcamaOgesi.item} olarak loop'layıp veriyi saçmıştık
// .item ile saçtığımız bütün parametreleri aşağıda "prop" olarak toparladık
export default function ExpenseItem({ id, description, date, amount }) {
  // bu sayfa birden fazla screen'de kullanılıyor
  // o yüzden screen'den buraya paslamak yerine navigation'ı kendimiz import'ladık direkt
  const navigation = useNavigation();

  function expensePressFunction() {
    // sayfaya yönlendirirken, ExpensesList.js içerisinde renderItem'da loop'layarak elde ettiğimiz ID'yi 2.parametrede veri olarak pasladık
    navigation.navigate("ManageExpenses", {
      // route parameter ayarlamış olduk
      harcamaIDsi: id,
    });
  }

  return (
    <Pressable
      onPress={expensePressFunction}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.descriptionText]}>
            {description}
          </Text>
          <Text style={styles.textBase}>{tarihiFormatla(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amountText}>${amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    // android shadow
    elevation: 3,
    // iOS shadow
    shadowColor: GlobalStyles.colors.gray500,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  descriptionText: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 80,
  },
  amountText: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.75,
  },
});
