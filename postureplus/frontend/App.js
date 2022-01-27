import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";

//redux
import { Provider } from "react-redux";

//TODO: Uncomment this back to get back to previous change__________________
// import { createStore, applyMiddleware, combineReducers } from "redux";
// import thunk from "redux-thunk";
// import themeReducer from "./redux/themeReducer";
//_________________________________________________________________________

import { store, appPersist } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

import SideMenu from "./navigation/SideMenu";

// const store = createStore(
//   combineReducers({ themeReducer }),
//   applyMiddleware(thunk)
// );

export default function App() {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={appPersist}> */}
      <NavigationContainer>
        {/* <Tabs/> */}
        <SideMenu />
      </NavigationContainer>
      {/* </PersistGate> */}
    </Provider>
  );
}
