import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState, useContext, useCallback } from "react";
import { dataContext } from "../index.js";

const RobotShop = (props) => {
  const { data, cart, setCart } = useContext(dataContext);
  const [loading, setloading] = useState(false);

  const cartImg = require("../../assets/cart.png").default.src;

  console.log(cart);

  const addCart = useCallback(
    (item, index) => {
      const find = cart.find((e) => e.name === item.name);
      if (!find) {
        if (cart.length === 5) {
          alert("Limit to 5");
          setloading(false);
        } else {
          !item.count ? (item.count = 1) : (item.count = item.count);
          cart.push(item);
          setCart([...cart]);
        }
      }
      //   else {
      //     const index = cart.indexOf(find);
      //     cart[index].count += 1;
      //     setCart([...cart]);
      //   }
    },
    [cart]
  );

  const renderItem = ({ item, index }) => {
    // Format Currency
    let currencyFormat = new Intl.NumberFormat("TH", {
      style: "currency",
      currency: "THB",
    });

    return (
      <View style={styles.robotContainer}>
        <Image
          style={styles.img}
          source={{ uri: item.image }}
          resizeMode="contain"
          resizeMethod="scale"
        />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{currencyFormat.format(item.price)}</Text>
        <Text style={styles.material}>
          Made With - {item.material} Meterial
        </Text>
        <Text style={styles.createdAt}>
          Manufacture At -{" "}
          {new Date(item.createdAt)
            .toISOString()
            .split("T")[0]
            .split("-")
            .reverse()
            .join("-")}
        </Text>
        <Text style={styles.stock}>Current Stock - {item.stock}</Text>
        <TouchableOpacity
          style={[
            styles.btn,
            { backgroundColor: item.stock === 0 ? "#7a7a7a" : "#ffffff" },
          ]}
          disabled={item.stock === 0 ? true : false}
          onPress={() => addCart(item, index)}
        >
          <Image source={{ uri: cartImg }} style={styles.icon} />
          <Text style={styles.btnText}>Add To Cart</Text>
          <Text style={styles.btnText}></Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.robotShop}>
      {loading ? (
        <View style={styles.modal}>
          <ActivityIndicator animating={loading} size="large" color="#000" />
          <Text style={styles.load}>Just a blink</Text>
        </View>
      ) : data && data.filteredData.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          initialNumToRender={6}
          numColumns={3}
          data={data.filteredData}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
        />
      ) : (
        <View style={styles.noDataContainer}>
          <Text style={styles.noData}>No Data Here !</Text>
        </View>
      )}
    </View>
  );
};

export default React.memo(RobotShop);

const styles = StyleSheet.create({
  robotShop: {
    flex: 3,
  },

  icon: {
    width: 20,
    height: 20,
  },
  modal: {
    position: "absolute",
    backgroundColor: "#eeeeeeaf",
    borderRadius: 20,
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    top: "40%",
    left: "40%",
  },
  robotContainer: {
    alignSelf: "center",
    padding: 10,
    backgroundColor: "#272f3b",
    borderRadius: 5,
    borderColor: "#272f3b",
    shadowColor: "#272f3b5f",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 3,
    shadowRadius: 3,
    margin: 20,
    flex: 1,
  },

  load: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 20,
  },
  noDataContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  noData: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#eeeeee",
  },
  img: {
    width: "100%",
    height: (Dimensions.get("window").width * 15) / 100,
    resizeMode: "contain",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginVertical: 5,
  },
  price: {
    fontSize: 14,
    fontWeight: "600",
    color: "lightblue",
    textAlign: "center",
  },
  material: {
    fontSize: 13,
    fontWeight: "600",
    color: "#8aff94",
    marginTop: 10,
  },
  createdAt: {
    fontSize: 13,
    fontWeight: "600",
    color: "#b892fc",
    marginVertical: 3,
  },
  stock: {
    fontSize: 13,
    fontWeight: "600",
    color: "#fcb092",
  },
  btn: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
    borderRadius: 10,
    shadowColor: "#ffffff8f",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 2,
    shadowRadius: 2,
    backgroundColor: "#ffffff",
    flexDirection: "row",
  },
  btnText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
  },
});
