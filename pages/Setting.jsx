import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";

const Setting = () => {
  const [netinfo, setnetinfo] = useState("");

  useEffect(() => {
    NetInfo.fetch().then((state) => {
      console.log(state);
      setnetinfo(JSON.stringify(state));
    });
  }, []);
  return (
    <View>
      <Text>Setting</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Setting;
