import axios from "axios";

// firestore'daki başlık URL'i standart olduğu için const ladık
const firebaseURL =
  "https://react-native-stage10-default-rtdb.europe-west1.firebasedatabase.app/";

export function masrafDepola(masrafVerisi) {
  // ilk parametre, firestore'daki başlık URL'idir. sonuna "expenses.json" ekledik
  // ikinci parametre, gönderilecek değerdir. unique ID göndermeyiz, kendisi otomatik halleder
  axios.post(firebaseURL + "expenses.json", masrafVerisi);
}

export async function masrafFetchle() {
  // depoladığımız URL ile aynı olmalı ilk parametre
  // öncelikle yanıtı bir alalım, async şekilde
  const response = await axios.get(firebaseURL + "expenses.json");

  // sonra masraflar için uygun array'i (ortamı) hazırlayalım
  const masraflarDolabi = [];

  // veri içeriğine bir bakmak istersek
  // console.log(response.data);

  // "data" axios'un verdiği standart veri içeriğidir. object olarak gelir
  // dinamik olarak "key" const u içerisinde depolanan property lere loop'layarak erişim sağlarız
  for (const key in response.data) {
    // her "key" için yeni bir masraf object'i oluştururuz
    const masrafNesnesi = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date), // veritabanında string olarak duruyor, date nesnesine çevirerek alalım,
      description: response.data[key].description,
    };
    // hazırladığımız nesneyi, önceden hazırladığımız array'e enjekte edelim
    masraflarDolabi.push(masrafNesnesi);
  }
  // hazırladığımız seti loop bittikten sonra artık sunabiliriz
  return masraflarDolabi;
}
