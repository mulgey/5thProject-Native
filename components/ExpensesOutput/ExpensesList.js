import { FlatList, Text } from "react-native";

// components
import ExpenseItem from "./ExpenseItem";

function harcamaRenderFonksiyonu(harcamaOgesi) {
  return (
    <ExpenseItem
      // bu pratik versiyonu olur
      // ExpenseItem.js deki object destructring içerisindeki isimler aynı olduğu için uygulayabildik
      {...harcamaOgesi.item}
      /*
      id={harcamaOgesi.item.id}
      description={harcamaOgesi.item.description}
      amount={harcamaOgesi.item.amount}
      date={harcamaOgesi.item.date}
      */
    />
  );
}

export default function ExpensesList({ harcamalar }) {
  return (
    <FlatList
      data={harcamalar}
      renderItem={harcamaRenderFonksiyonu}
      keyExtractor={(item) => item.id}
    />
  );
}
