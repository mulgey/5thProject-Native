import { createContext, useReducer } from "react";

// the-initial data
/*
const SANAL_VERI_YIGINI = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2021-12-19"),
  },
  {
    id: "e2",
    description: "A cup of coffee",
    amount: 9.99,
    date: new Date("2022-01-05"),
  },
  {
    id: "e3",
    description: "New book",
    amount: 12.99,
    date: new Date("2021-12-01"),
  },
  {
    id: "e4",
    description: "A watermelon",
    amount: 2.99,
    date: new Date("2022-02-19"),
  },
  {
    id: "e5",
    description: "Game set",
    amount: 29.99,
    date: new Date("2022-02-18"),
  },
  {
    id: "e6",
    description: "New laptop",
    amount: 1059.5,
    date: new Date("2023-08-12"),
  },
  {
    id: "e7",
    description: "Gift for the boys",
    amount: 120.554,
    date: new Date("2023-08-12"),
  },
  {
    id: "e8",
    description: "Registration Fee",
    amount: 520.5,
    date: new Date("2023-08-14"),
  },
];
*/

// diğer sayfalar içerisinde bu const u çağıracağız useContext için
// initial values below help for the auto-complation later
export const ExpensesContext = createContext({
  expenses: [],
  // gerekli parametreleri object destructring için sunduk
  addExpense: ({ description, amount, date }) => {},
  setExpenses: (expenses) => {},
  updateExpense: (id, { description, amount, date }) => {},
  // 2-parameter here, id and the object containing those values
  deleteExpense: (id) => {},
});

// state, aşağıdaki "SANAL_VERI_YIGINI"nı alır(dı)
function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      // let's create a random unique ID for this small project
      const id = new Date().toString() + Math.random().toString();
      // bring the new items in its object, add the random ID and then spread the existing items
      return [{ ...action.payload, id: id }, ...state];
    case "SET":
      // bu aksiyonda sadece bizim için "array of expenses"i getirmesini bekliyoruz
      return action.payload;
    case "UPDATE":
      // öncelikle güncelleyeceğimiz öğenin indeksini bulalım
      const indexNumber = state.findIndex(
        (herBirItem) => herBirItem.id === action.payload.id
      );

      // index'i bulduğumuza göre şimdi de öğeyi bulalım
      const guncellenecekExpense = state[indexNumber];

      // nihayet güncelleyelim
      const guncellenmisExpense = {
        // güncelleyeceğimiz öğeyi getir
        ...guncellenecekExpense,
        // action.payload'dakileri üstüne yaz. "veri" -> aşağıdaki "expenseVerisi"ni işaret eder
        // "expenseVerisi" -> yukarıdaki "{ description, amount, date }" nesnesini işaret eder
        ...action.payload.veri,
      };

      // yeni serimizi önce bir serelim
      const guncellenmisSeri = [...state];
      // serdikten sonra doğru index'e gidip güncellemeyi gerçekleştirelim
      guncellenmisSeri[indexNumber] = guncellenmisExpense;
      return guncellenmisSeri;
    case "DELETE":
      // en kolayı, direkt filtrele gitsin (aynı olmayanları (!==) getir, aynı olan gitsin)
      return state.filter((herBirItem) => herBirItem.id !== action.payload);
    default:
      return state;
  }
}

// actual provider with the actual logic
function ExpensesContextSaglayici({ children }) {
  // parantez içerisi şu şekilde ((1) yukarıdaki iş yapar fonksiyonumuz, (2) başlangıç verilerimiz)
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function addExpense(expenseVerisi) {
    // burdaki "type", yukarıdaki "action.type"dan geliyor
    // "expenseVerisi" bir object olarak dönecektir
    // payload, eylemin taşıdığı veriyi temsil eder
    dispatch({ type: "ADD", payload: expenseVerisi });
  }

  function setExpenses(expenseVerisi) {
    dispatch({ type: "SET", payload: expenseVerisi });
  }

  function updateExpense(id, expenseVerisi) {
    // burdaki "type", yukarıdaki "action.type"dan geliyor
    dispatch({ type: "UPDATE", payload: { id: id, veri: expenseVerisi } });
  }

  function deleteExpense(id) {
    // burdaki "type", yukarıdaki "action.type"dan geliyor
    dispatch({ type: "DELETE", payload: id });
  }

  // tüm veriyi ve fonksiyonları aşağıda paketleyip aşağıya, app-wide kullanılmak üzere yollayacağız
  const degerler = {
    // "expenses", "const ExpensesContext" içerisindeki initial value olarak geldi
    // "expensesState", useReducer fonksiyonundaki state olarak geldi
    expenses: expensesState,
    // diğerleri de initial value başlıkları
    addExpense: addExpense,
    setExpenses: setExpenses,
    // içerikteki fonksiyonlar, ExpensesContextSaglayici fonk. içerisindeki fonksiyonlar
    updateExpense: updateExpense,
    deleteExpense: deleteExpense,
  };

  return (
    // value içersindeki değerlerin hepsi, wrapped components ler için kullanılabilir
    <ExpensesContext.Provider value={degerler}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextSaglayici;
