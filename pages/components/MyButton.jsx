import React from "react";
import { TouchableOpacity, Text } from "react-native";

export default function MyButton(props) {
  const defaultBtnStyle = {
    
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  };
  const btnStyle = { ...defaultBtnStyle, ...props.btnStyle };

  const defaultTextStyle = {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    textTransform: "capitalize",
  };
  const textStyle = { ...defaultTextStyle, ...props.textStyle };

  return (
    <TouchableOpacity style={btnStyle} onPress={props.onPress}>
      <Text style={textStyle}>{props.title}</Text>
    </TouchableOpacity>
  );
}
