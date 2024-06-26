// ExpenseItem.js içerisinde tarihi güzel bir biçimde sunmak için kullandık
export function tarihiFormatla(date) {
  return date.toISOString().slice(0, 10);
}

// RecentExpenses.js dosyasında masrafları tarihe göre filtrelemek için kullandık
export function belirliGunOncesininTarihi(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
