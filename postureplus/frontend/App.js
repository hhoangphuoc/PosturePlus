import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";

//redux
import { Provider } from "react-redux";

import { store } from "./redux/store";
import SideMenu from "./navigation/SideMenu";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* <Tabs/> */}
        <SideMenu />
      </NavigationContainer>
    </Provider>
  );
}
