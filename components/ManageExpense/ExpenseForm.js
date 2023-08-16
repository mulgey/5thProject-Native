import { View, Text, StyleSheet, Alert } from "react-native";
import { useState } from "react";

// components & utilities & constants
import Input from "./Input";
import Button from "../UserInterface/Button";
import { tarihiFormatla } from "../../utilities/date";
import { GlobalStyles } from "../../constants/styles";

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
  const [girdiler, girdilerAksiyonu] = useState({
    // ManageExpenseScreen üzerinden bir "seciliMasraf" geliyorsa edit sayfası açıldığında verileri kutucuğa yazalım
    // ID yoksa ve veri gelmiyorsa boş bırakalım
    amount: {
      value: seciliMasraf ? seciliMasraf.amount.toString() : "",
      // teknik olarak "true" değil. Sıfırdan eklerken hata vermesini engelledik
      isValid: true,
    },
    // "toISOString" bizim formatı getirir ama fazla olduğu için kırpalım
    date: {
      value: seciliMasraf ? tarihiFormatla(seciliMasraf.date) : "",
      // teknik olarak "true" değil. Sıfırdan eklerken hata vermesini engelledik
      isValid: true,
    },
    description: {
      value: seciliMasraf ? seciliMasraf.description : "",
      // teknik olarak "true" değil. Sıfırdan eklerken hata vermesini engelledik
      isValid: true,
    },
  });

  // genel fonksiyonumuz 2 parametre içerir. ikinci parametre react-native tarafından otomatik olarak aktarılr
  // birinci parametre bizim uydurmamız (geliştirmemiz) olduğu için aşağıda ".bind()" lamamız gerekir
  function inputlarDegisimFonksiyonu(inputIsmi, girilenDeger) {
    // mevcut değerler setini, girilen input ve o inputun değeri ile güncelleriz
    girdilerAksiyonu((mevcutDegerlerSeti) => {
      return {
        ...mevcutDegerlerSeti,
        // dinamik olarak property isimlerini hedef alıp güncellememizi sağlar
        // sağ tarafı object olarak güncelledik. isValid'i kontrol etmeden true geçtik, sonra validate edeceğiz
        [inputIsmi]: { value: girilenDeger, isValid: true },
      };
    });
  }

  function submitFonksiyonu() {
    // expenses-context içerisinde "expenseVerisi" olarak bahsettiğimiz veri nesnesini hazırlıyoruz
    const masrafVerisi = {
      // koyduğumuz "+" string'i number'a çevirir
      amount: +girdiler.amount.value,
      date: new Date(girdiler.date.value),
      description: girdiler.description.value,
    };

    // Validation Starts
    // amount sayı mı? 0'dan büyük mü?
    const amountGecerli =
      !isNaN(masrafVerisi.amount) && masrafVerisi.amount > 0;
    const dateGecerli = masrafVerisi.date.toString() !== "Invalid Date";
    // baştaki ve sondaki boşluğu atınca değer var mı
    const aciklamaGecerli = masrafVerisi.description.trim().length > 0;

    // validation geçiyorsa işe koyulalım. herhangi birisi geçmiyorsa (şu veya bu) = stop
    if (!amountGecerli || !dateGecerli || !aciklamaGecerli) {
      /*
      // alert ten vazgeçtik
      Alert.alert(
        "Geçersiz giriş",
        "Lütfen sağladığınız değerleri kontrol ediniz"
      );
      */
      // herhangi bir hata tespit ettiysek şunu yapalım, değerleri ve hata durumlarını işleyelim
      girdilerAksiyonu((mevcutDegerlerSeti) => {
        return {
          amount: {
            value: mevcutDegerlerSeti.amount.value,
            isValid: amountGecerli,
          },
          date: {
            value: mevcutDegerlerSeti.date.value,
            isValid: dateGecerli,
          },
          description: {
            value: mevcutDegerlerSeti.description.value,
            isValid: aciklamaGecerli,
          },
        };
      });
      // return, yani burada dursun aşağısı çalışmasın
      return;
    }

    // ManageExpenseScreen içerisindeki fonksiyonda context üzerinden veriyi değiştirmek için bu fonk. kullandık
    // "isCheckPositive" durumuna göre "expenseCtx.updateExpense(checkID, gelenVeri)" veya "expenseCtx.addExpense(gelenVeri)"
    guncelleEkleFonksiyonu(masrafVerisi);
  }

  // JSX'e başlamadan önce formun genel olarak geçerli olup olmadığına baktık
  const formGecersiz =
    !girdiler.amount.isValid ||
    !girdiler.date.isValid ||
    !girdiler.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Yeni Masraf</Text>
      <View style={styles.inputsRow}>
        {/* prop'ları object olarak textInputConfig içerisinde göndermek konfor sağlar */}
        {/* istediğimiz miktarda özelliği ekleyebiliyoruz */}
        <Input
          extraStyle={styles.input}
          label="Amount"
          // hata durumunda kutucuk renk değişimi için bu durumu tersi şekilde gönderdik
          // isValid değil ise = invalid
          invalid={!girdiler.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            // yukarıda "inputIsmi" react-native tarafından "girilenDeger" gibi otomatik olarak aktarılmadığı için bind() ladık
            // "this" olmak zorunda diye ekledik, bir fonksiyonu yok (1st parameter)
            // 2nd parameter = fonksiyon tarafından kabul edilen 1st değerdir = "inputIsmi"
            onChangeText: inputlarDegisimFonksiyonu.bind(this, "amount"),
            value: girdiler.amount.value,
          }}
        />
        <Input
          extraStyle={styles.input}
          label="Date"
          // hata durumunda kutucuk renk değişimi için bu durumu tersi şekilde gönderdik
          // isValid değil ise = invalid
          invalid={!girdiler.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            // yukarıda "inputIsmi" react-native tarafından "girilenDeger" gibi otomatik olarak aktarılmadığı için bind() ladık
            // "this" olmak zorunda diye ekledik, bir fonksiyonu yok (1st parameter)
            // 2nd parameter = fonksiyon tarafından kabul edilen 1st değerdir = "inputIsmi"
            onChangeText: inputlarDegisimFonksiyonu.bind(this, "date"),
            value: girdiler.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        // hata durumunda kutucuk renk değişimi için bu durumu tersi şekilde gönderdik
        // isValid değil ise = invalid
        invalid={!girdiler.description.isValid}
        textInputConfig={{
          multiline: true,
          autoCorrect: false, // default is true,
          autoCapitalize: "sentences", // it's already default,
          // yukarıda "inputIsmi" react-native tarafından "girilenDeger" gibi otomatik olarak aktarılmadığı için bind() ladık
          // "this" olmak zorunda diye ekledik, bir fonksiyonu yok (1st parameter)
          // 2nd parameter = fonksiyon tarafından kabul edilen 1st değerdir = "inputIsmi"
          onChangeText: inputlarDegisimFonksiyonu.bind(this, "description"),
          value: girdiler.description.value,
        }}
      />
      {formGecersiz && (
        <Text style={styles.errorText}>
          Geçersiz giriş değerleri mevcut - lütfen sağladığınız verilerin
          doğruluğundan emin olun
        </Text>
      )}
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
  errorText: {
    color: GlobalStyles.colors.error500,
    textAlign: "center",
    margin: 8,
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
