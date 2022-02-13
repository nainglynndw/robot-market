import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useMemo } from "react";
import RobotShop from "./RobotShop.js";
import Cart from "./Cart.js";
import FetchData from "../fetch/FetchData";
import { dataContext } from "../index.js";

const Body = () => {
  const { setData } = useContext(dataContext);

  console.log("body");

  const getData = async () => {
    try {
      const gg = await FetchData();
      setData({ masterData: gg, filteredData: gg });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(
    useMemo(
      () => () => {
        getData();
      },
      []
    ),
    []
  );

  return (
    <View style={styles.body}>
      {/* RobotShop For Browsing */}
      <RobotShop />

      {/* Cart */}
      <Cart />
    </View>
  );
};

export default React.memo(Body);

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#121212",
  },
});
