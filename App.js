import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// context provider
import ExpensesContextSaglayici from "./store/expenses-context";

// components & constants
import ManageExpenseScreen from "./screens/ManageExpenseScreen";
import RecentExpensesScreen from "./screens/RecentExpensesScreen";
import AllExpensesScreen from "./screens/AllExpensesScreen";
import { GlobalStyles } from "./constants/styles";
import IconButton from "./components/UserInterface/IconButton";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

// Bottom Tabs için oluşturduğumuz component fonksiyonu
function ExpensesOverview() {
  return (
    <BottomTabs.Navigator
      // screenOptions'ın yapısını object içerecek bir fonksiyon haline getirdik
      // böylece içerisine navigation gibi paslayabileceğimiz prop'lar yerleştirebildik
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        // fonksiyon içersine tintColor'u bir prop value olarak paslayabiliyoruz
        headerRight: ({ tintColor }) => (
          <IconButton
            iconName="add"
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate("ManageExpenses");
            }}
          />
        ),
      })}
    >
      <BottomTabs.Screen
        name="RecentExpenses"
        component={RecentExpensesScreen}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpensesScreen}
        options={{
          title: "All Expenses",
          tabBarLabel: "All Expenses",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

// "manage expenses" her yerden erişilebilir olsun ve eriştiğimizde altta Tabs gözükmesin
// diğer taraftan "all" ve "recent" expenses için Tabs gözüksün

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextSaglayici>
        <NavigationContainer>
          <Stack.Navigator
            // ExpensesOverview için "headerShown: false" yapmıştık
            // dolayısıyla burada yaptığımız düzenlemelerin hepsi "ManageExpenses" için çalışacak
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
              headerTintColor: "white",
            }}
          >
            {/* ExpensesOverview, bottomTabs gruplandırması için oluşturduğumuz komponent fonksiyonu */}
            <Stack.Screen
              name="ExpensesOverview"
              component={ExpensesOverview}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ManageExpenses"
              component={ManageExpenseScreen}
              // modal is a cool component which you can drag-down to close
              options={{ presentation: "modal" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextSaglayici>
    </>
  );
}
