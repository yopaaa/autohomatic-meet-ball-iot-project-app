import React, { useState } from "react";
import reactNative from "react-native";
import MyButton from "./components/MyButton";
import vars from "./components/Vars";

const { View, Text, TextInput, StyleSheet } = reactNative;
const API_URL = "http://192.168.0.1:3000/timer";

const Timer = () => {
  const [minutes, setMinutes] = useState("5");
  const [seconds, setSeconds] = useState("0");

  const handleStartTimer = () => {
    const targetM = parseInt(minutes) || 0;
    const targetS = parseInt(seconds) || 0;

    const data = JSON.stringify({ targetM, targetS });

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
          flexDirection: "row",
        }}
      >
        <View
          style={{ justifyContent: "center", alignItems: "center", gap: 15 }}
        >
          <Text>Set minutes</Text>

          <MyButton
            title="Increment"
            onPress={() => setMinutes(Number(minutes) + 1)}
          />

          <TextInput
            placeholder="00"
            value={minutes.toString()}
            onChangeText={(text) => setMinutes(Number(text))}
            keyboardType="numeric"
            style={styles.numberInput}
          />
          <MyButton
            title="decrement"
            onPress={() => setMinutes(Number(minutes) - 1)}
          />
        </View>

        <Text style={{ fontSize: 30 }}>:</Text>

        <View
          style={{ justifyContent: "center", alignItems: "center", gap: 15 }}
        >
          <Text>Set seconds</Text>

          <MyButton
            title="Increment"
            onPress={() => {
              if (Number(seconds) >= 59) {
                setMinutes(Number(minutes) + 1);
                setSeconds(0);
              } else {
                setSeconds(Number(seconds) + 1);
              }
            }}
          />

          <TextInput
            placeholder="00"
            value={seconds.toString()}
            onChangeText={(text) => {
              const num = Number(text);

              if (num >= 59) {
                setMinutes(Number(minutes) + Math.floor(num / 60));
                setSeconds(num % 60);
              } else {
                setSeconds(num);
              }
            }}
            keyboardType="numeric"
            style={styles.numberInput}
          />

          <MyButton
            title="decrement"
            onPress={() => {
              if (Number(seconds) <= 0) {
                setMinutes(Number(minutes) - 1);
                setSeconds(59);
              } else {
                setSeconds(Number(seconds) - 1);
              }
            }}
          />
        </View>
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
          title="Start Timer"
          textStyle={{ padding: 20, fontSize: 20 }}
          onPress={handleStartTimer}
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

export default Timer;
