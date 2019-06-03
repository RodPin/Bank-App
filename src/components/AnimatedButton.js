import React from "react";
import AnimatedWrapper from "./AnimatedWrapper";
import { View, TouchableOpacity, Text } from "react-native";
const button = ({ onPress, i, label }) => {
  return (
    <AnimatedWrapper i={i}>
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            alignSelf: "center",
            width: 250,
            height: 50,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: "white",
            marginTop: 10,
            justifyContent: "center"
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 19,
              fontFamily: "Roboto",
              alignSelf: "center"
            }}
          >
            {label}
          </Text>
        </View>
      </TouchableOpacity>
    </AnimatedWrapper>
  );
};

export default button;
