import { createContext, useReducer } from "react";

// diğer sayfalar içerisinde bu const u çağıracağız useContext için
// initial values below help for the auto-complation later
export const ExpensesContext = createContext({
  expenses: [],
  // gerekli parametreleri object destructring için sunduk
  addExpense: ({ description, amount, date }) => {},
  updateExpense: (id) => {},
  // 2-parameter here, id and the object containing those values
  deleteExpense: (id, { description, amount, date }) => {},
});

// actual provider with the actual logic
function ExpensesContextSaglayici({ children }) {
  // aşağıda bunu context.provider içerisinde yollayacağız
  useReducer();

  return (
    // value içersindeki değerlerin hepsi, wrapped components ler için kullanılabilir
    <ExpensesContext.Provider value={degerler}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextSaglayici;
