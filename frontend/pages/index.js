import { StyleSheet, View } from "react-native";
import React, { createContext, useState } from "react";
import Navbar from "./components/Navbar";
import Body from "./components/Body";

export const dataContext = createContext();

const index = (props) => {
  const [data, setData] = useState({
    masterData: {},
    filteredData: {},
  });

  const [cart, setCart] = useState([]);

  return (
    <dataContext.Provider value={{ data, setData, cart, setCart }}>
      <View style={styles.container}>
        {/* Navbar Component */}
        <Navbar />

        {/* Body Component */}
        <Body />
      </View>
    </dataContext.Provider>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#121212",
  },
});
