import { StyleSheet, Text, View, FlatList, Button } from "react-native";

import React, { useContext, useCallback } from "react";
import { dataContext } from "../index.js";

const Cart = (props) => {
  const { cart, setCart } = useContext(dataContext);

  const totalAmount = () => {
    let amount = 0;
    for (let i = 0; i < cart.length; i++) {
      amount = amount + cart[i].count * cart[i].price;
    }
    return amount;
  };

  const totalItem = () => {
    let item = 0;
    for (let i = 0; i < cart.length; i++) {
      item = item + cart[i].count;
    }
    return item;
  };

  const decrease = useCallback(
    (item) => {
      const find = cart.find((e) => e.name === item.name);
      const index = cart.indexOf(find);
      if (item.count <= 1) {
        const unique = cart.slice();
        unique.splice(index, 1);

        setCart(unique);
      } else {
        cart[index].count = cart[index].count - 1;
        setCart([...cart]);
      }
    },
    [cart]
  );

  const increase = useCallback(
    (item) => {
      if (item.count === item.stock) {
        return alert(" Out Of Stock ! ");
      }
      const find = cart.find((e) => e.name === item.name);
      const index = cart.indexOf(find);
      cart[index].count = cart[index].count + 1;
      setCart([...cart]);
    },
    [cart]
  );
  let currencyFormat = new Intl.NumberFormat("TH", {
    style: "currency",
    currency: "THB",
  });

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
        <View style={styles.buttonContainer}>
          <Button
            title=" - "
            color="#4f1515"
            onPress={() => {
              decrease(item);
            }}
          />
          <Text style={styles.itemCount}>{item.count}</Text>
          <Button
            title=" + "
            color="#152b4f"
            onPress={() => {
              increase(item);
            }}
          />
        </View>
        <Text style={[styles.itemName, { textAlign: "end" }]}>
          {currencyFormat.format((item.price * item.count).toFixed(2))}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.cart}>
      <Text style={styles.itemName}>Types of Robots - {cart.length}</Text>
      <FlatList
        style={{ width: "100%" }}
        data={cart}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
      <View style={styles.total}>
        <Text style={styles.itemName}>Total</Text>
        <Text style={[styles.itemName, { textAlign: "center" }]}>
          Robots - {totalItem()}
        </Text>
        <Text style={[styles.itemName, { textAlign: "right" }]}>
          Amount - {currencyFormat.format(totalAmount())}
        </Text>
      </View>
    </View>
  );
};

export default React.memo(Cart);

const styles = StyleSheet.create({
  cart: {
    flex: 1.25,
    borderLeftWidth: 5,
    borderLeftColor: "#1f1f1f",
    padding: 10,
  },
  itemContainer: {
    width: "100%",
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#2d2d2d",
    borderRadius: 5,
  },
  itemName: {
    width: "33%",
    color: "#ffffff",
    fontSize: 14,
  },
  itemCount: {
    color: "#ffffff",
    fontSize: 14,
    marginHorizontal: 5,
  },
  itemSign: {
    borderWidth: 1,
    borderColor: "grey",
    fontSize: 14,
    color: "white",
  },
  buttonContainer: {
    width: "33%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  total: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2d2d2d",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 5,
    height: 100,
  },
});
