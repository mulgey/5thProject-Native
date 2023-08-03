import { View, Text, StyleSheet } from "react-native";

// constants
import { GlobalStyles } from "../../constants/styles";

export default function ExpensesSummary({ harcamalar, periodIsmi }) {
  // harcamalar array olarak gelecektir. üstünde reduce metodunu kullanırız
  // metod array'daki birden fazla değeri tek değer yapmaya yarar
  const harcamalarToplami = harcamalar.reduce((araToplam, herbirDeger) => {
    // harcamalar object'inin her birinde amount olarak sayısal bir değer varmış demek ki
    return araToplam + herbirDeger.amount;
    // 0'dan başlıyoruz
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.periodText}>{periodIsmi}</Text>
      {/* virgülden sonra 2 basamak olacak şekilde */}
      <Text style={styles.sumText}>${harcamalarToplami.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  periodText: {
    fontSize: 12,
    color: GlobalStyles.colors.primary400,
  },
  sumText: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary500,
  },
});
