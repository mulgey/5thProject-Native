import { View, Text, StyleSheet, TextInput } from "react-native";

// constants
import { GlobalStyles } from "../../constants/styles";

export default function Input({ label, extraStyle, textInputConfig, invalid }) {
  // multiline mu diye kontrol edelim, ona göre uygulayacağız
  // öncelikle multiline değilmiş gibi style'ımızı yüklüyoruz
  let inputStyles = [styles.input];
  // bakalım. config setimiz var mı, varsa içinde multiline var mı
  if (textInputConfig && textInputConfig.multiline) {
    // varsa styles array'imize ilişkili styles'ı ekleyelim
    inputStyles.push(styles.inputMultiLine);
  }
  // invalid durumu varsa style için bir ekleme daha yapacağız
  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }

  return (
    <View style={[styles.inputContainer, extraStyle]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      {/* accepted config details as an object and spread all, below */}
      {/* yukarıdaki if condition'ın sonucunun yansıması için "style={styles.input}"u, "style={inputStyles}" olarak değiştirdik */}
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiLine: {
    minHeight: 100,
    // android'de ortaladığı için bunu eklemek zorunda kaldık
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});
