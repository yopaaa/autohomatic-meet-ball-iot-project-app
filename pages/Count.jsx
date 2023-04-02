import React, { useState, useEffect } from "react";
import reactNative from "react-native";
import MyButton from "./components/MyButton";
import vars from "./components/Vars";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const { View, Text, TextInput, StyleSheet } = reactNative;

const Count = () => {
  const [target, settarget] = useState("20");
  const [ipAddress, setIpAddress] = useState("");
  const [isPause, setisPause] = useState(false);

  const handleStartCount = () => {
    const data = JSON.stringify({ target });

    fetch(`http://${ipAddress}:3000/count`, {
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
        alert(`Failed to set ${ipAddress} \n${error}`);

        // Handle the error as needed
      });
  };

  const getVariable = () => {
    axios
      .get(`http://${ipAddress}:3000/variable`)
      .then((val) => {
        val.data.payload.isPause == true ? setisPause(true) : setisPause(false);
      })
      .catch((error) => {
        console.log(error);
        alert(`Failed to get ${ipAddress} \n${error}`);
        // Handle the error as needed
      });
  };
   const handleStopCount = () => {
     axios
       .post(`http://${ipAddress}:3000/stop`, {})
       .then((val) => {
         val.data.payload.isPause == true
           ? setisPause(true)
           : setisPause(false);
       })
       .catch((error) => {
         console.log(error);
         alert(`Failed to get ${ipAddress} \n${error}`);
         // Handle the error as needed
       });
   };


  const loadIpAddress = async () => {
    try {
      const ipAddress = await AsyncStorage.getItem("ipAddress");
      if (ipAddress !== null) {
        setIpAddress(ipAddress);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadIpAddress();
    getVariable();
  }, []);

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

        <MyButton
          title="Increment"
          onPress={() => settarget(Number(target) + 1)}
        />

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

        <MyButton
          title="decrement"
          onPress={() => settarget(Number(target) - 1)}
        />
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
        {isPause == false ? (
          <MyButton
            title="Start count"
            textStyle={{ padding: 20, fontSize: 20 }}
            onPress={handleStartCount}
          />
        ) : (
          <MyButton
            title="Stop"
            btnStyle={{ backgroundColor: vars.color.tree, borderWidth: 1 }}
            textStyle={{ padding: 20, fontSize: 20 }}
            onPress={handleStopCount}
          />
        )}
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
