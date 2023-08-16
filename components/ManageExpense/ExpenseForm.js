import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";

// components & utilities
import Input from "./Input";
import Button from "../UserInterface/Button";
import { tarihiFormatla } from "../../utilities/date";

export default function ExpenseForm({
  cancelFonksiyonu,
  guncelleEkleFonksiyonu,
  guncelleVeyaEkleText,
  seciliMasraf,
}) {
  // Tek tek aşağıdaki gibi yapmaktansa yeni bir metod uyguladık, buranın altında
  /*
  // miktar sayı olsa da teknik olarak başlangıçta "string"dir. sonra dönüştürebilirsin
  const [amountDegeri, amountAksiyonu] = useState("");

  function amountDegisimFonksiyonu(girilenMiktar) {
    amountAksiyonu(girilenMiktar);
  }
  */

  // her input için ayrı değil, total bir useState yönetimi örneği
  const [girilenDegerler, degerlerAksiyonu] = useState({
    // ManageExpenseScreen üzerinden bir "seciliMasraf" geliyorsa edit sayfası açıldığında verileri kutucuğa yazalım
    // ID yoksa ve veri gelmiyorsa boş bırakalım
    amount: seciliMasraf ? seciliMasraf.amount.toString() : "",
    // "toISOString" bizim formatı getirir ama fazla olduğu için kırpalım
    date: seciliMasraf ? tarihiFormatla(seciliMasraf.date) : "",
    description: seciliMasraf ? seciliMasraf.description : "",
  });

  // genel fonksiyonumuz 2 parametre içerir. ikinci parametre react-native tarafından otomatik olarak aktarılr
  // birinci parametre bizim uydurmamız (geliştirmemiz) olduğu için aşağıda ".bind()" lamamız gerekir
  function inputlarDegisimFonksiyonu(inputIsmi, girilenDeger) {
    // mevcut değerler setini, girilen input ve o inputun değeri ile güncelleriz
    degerlerAksiyonu((mevcutDegerlerSeti) => {
      return {
        ...mevcutDegerlerSeti,
        // dinamik olarak property isimlerini hedef alıp güncellememizi sağlar
        [inputIsmi]: girilenDeger,
      };
    });
  }

  function submitFonksiyonu() {
    // expenses-context içerisinde "expenseVerisi" olarak bahsettiğimiz veri nesnesini hazırlıyoruz
    const masrafVerisi = {
      // koyduğumuz "+" string'i number'a çevirir
      amount: +girilenDegerler.amount,
      date: new Date(girilenDegerler.date),
      description: girilenDegerler.description,
    };
    // ManageExpenseScreen içerisindeki fonksiyonda context üzerinden veriyi değiştirmek için bu fonk. kullandık
    // "isCheckPositive" durumuna göre "expenseCtx.updateExpense(checkID, gelenVeri)" veya "expenseCtx.addExpense(gelenVeri)"
    guncelleEkleFonksiyonu(masrafVerisi);
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Yeni Masraf</Text>
      <View style={styles.inputsRow}>
        {/* prop'ları object olarak textInputConfig içerisinde göndermek konfor sağlar */}
        {/* istediğimiz miktarda özelliği ekleyebiliyoruz */}
        <Input
          extraStyle={styles.input}
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            // yukarıda "inputIsmi" react-native tarafından "girilenDeger" gibi otomatik olarak aktarılmadığı için bind() ladık
            // "this" olmak zorunda diye ekledik, bir fonksiyonu yok (1st parameter)
            // 2nd parameter = fonksiyon tarafından kabul edilen 1st değerdir = "inputIsmi"
            onChangeText: inputlarDegisimFonksiyonu.bind(this, "amount"),
            value: girilenDegerler.amount,
          }}
        />
        <Input
          extraStyle={styles.input}
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            // yukarıda "inputIsmi" react-native tarafından "girilenDeger" gibi otomatik olarak aktarılmadığı için bind() ladık
            // "this" olmak zorunda diye ekledik, bir fonksiyonu yok (1st parameter)
            // 2nd parameter = fonksiyon tarafından kabul edilen 1st değerdir = "inputIsmi"
            onChangeText: inputlarDegisimFonksiyonu.bind(this, "date"),
            value: girilenDegerler.date,
          }}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          autoCorrect: false, // default is true,
          autoCapitalize: "sentences", // it's already default,
          // yukarıda "inputIsmi" react-native tarafından "girilenDeger" gibi otomatik olarak aktarılmadığı için bind() ladık
          // "this" olmak zorunda diye ekledik, bir fonksiyonu yok (1st parameter)
          // 2nd parameter = fonksiyon tarafından kabul edilen 1st değerdir = "inputIsmi"
          onChangeText: inputlarDegisimFonksiyonu.bind(this, "description"),
          value: girilenDegerler.description,
        }}
      />
      <View style={styles.buttonsGroup}>
        <Button style={styles.button} mode="flat" onPress={cancelFonksiyonu}>
          Iptal Et
        </Button>
        <Button style={styles.button} onPress={submitFonksiyonu}>
          {/* ManageExpenseScreen içerisinde ID'den gelme durumuna göre belirlediğimiz duruma bağlı text'i buraya yansıtıyoruz */}
          <Text>{guncelleVeyaEkleText}</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    // yukarıda flexDirection: "row", yaptıktan sonra 2 aynı elementin eşit olmasını istiyoruz
    flex: 1,
  },
  // button style'ını prop olarak "button" component'inin içerisine gönderdik
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  buttonsGroup: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
