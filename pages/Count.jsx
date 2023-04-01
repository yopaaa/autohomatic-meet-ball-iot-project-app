import React, { useState } from "react";
import reactNative from "react-native";
import MyButton from "./components/MyButton";
import vars from "./components/Vars";

const { View, Text, TextInput, StyleSheet } = reactNative;
const API_URL = "http://192.168.0.1:3000/Count";

const Count = () => {
  const [target, settarget] = useState("20");

  const handleStartCount = () => {
    const data = JSON.stringify({ target });

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((response) => {
        console.log(response);
        alert(response);
        // Handle the response as needed
      })
      .catch((error) => {
        console.log(error);
        alert(error);
        // Handle the error as needed
      });
  };

  return (
    <View style={{ flex: 1, backgroundColor: vars.color.four }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 15,
        }}
      >
        <Text>Set Target</Text>

        <MyButton title="Increment" onPress={() => settarget(Number(target) + 1)} />

        <TextInput
          placeholder="00"
          value={target.toString()}
          onChangeText={(text) => {
            const num = Number(text);
            settarget(num);
          }}
          keyboardType="numeric"
          style={styles.numberInput}
        />

        <MyButton title="decrement" onPress={() => settarget(Number(target) - 1)} />
      </View>

      <View
        style={{
          // backgroundColor: "blue",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          height: "30%",
          // top: 0
        }}
      >
        <MyButton
          title="Start Count"
          textStyle={{ padding: 20, fontSize: 20 }}
          onPress={handleStartCount}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  numberInput: {
    borderWidth: 1,
    borderColor: vars.color.two,
    padding: 30,
    fontSize: 30,
    margin: 20,
    textAlign: "center",
  },
});

export default Count;
