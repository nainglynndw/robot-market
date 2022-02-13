import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useContext } from "react";
import { dataContext } from "../index.js";

const Navbar = (props) => {
  const { data, setData } = useContext(dataContext);

  console.log("Nav");

  const search = (text) => {
    if (text) {
      const newData = data.masterData.filter((item) => {
        const itemData = item.material
          ? item.material.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setData({ ...data, filteredData: newData });
    } else {
      setData({ ...data, filteredData: data.masterData });
    }
  };

  return (
    <View style={styles.navbar}>
      <Text style={styles.title}>Robot Market </Text>
      <View style={styles.filter}>
        <TextInput
          style={styles.input}
          placeholder="Search by Material"
          onChangeText={(text) => {
            search(text);
          }}
        />
      </View>
    </View>
  );
};

export default React.memo(Navbar);

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    borderBottomColor: "#ffffff0f",
    borderBottomWidth: 5,
  },
  title: {
    marginRight: 20,
    marginVertical: 20,
    fontSize: 25,
    fontWeight: "bold",
    color: "#ffffff",
  },
  filter: {
    padding: 5,
    backgroundColor: "white",
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: 300,
    fontSize: 14,
    paddingHorizontal: 5,
    outlineWidth: 0,
  },
});
