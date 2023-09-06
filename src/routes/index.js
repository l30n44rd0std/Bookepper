import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./AppNavigator";
import { UserProvider } from "../UserContext";

export default function App() {
  return (

    <UserProvider>
      <NavigationContainer>
        <AppNavigator/>
      </NavigationContainer>
    </UserProvider>

  );
}
