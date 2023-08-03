import { View, StyleSheet, Pressable, Text } from "react-native";

// constants
import { GlobalStyles } from "../../constants/styles";

export default function ExpenseItem({ description, date, amount }) {
  return (
    <Pressable>
      <View>
        <View style={styles.expenseItem}>
          <Text style={[styles.textBase, styles.descriptionText]}>
            {description}
          </Text>
          <Text style={styles.textBase}>{date.toString()}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amountText}>${amount}</Text>
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
  },
  amountText: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
});
