import React from "react";
import AnimatedWrapper from "./AnimatedWrapper";
import { View, TouchableOpacity, Text } from "react-native";
import { RED } from "../utils";
const ErrorText = ({ label }) => {
  return (
    <AnimatedWrapper i={3}>
      <Text
        style={{
          color: RED,
          fontSize: 19,
          fontFamily: "Roboto",
          alignSelf: "center"
        }}
      >
        {label}
      </Text>
    </AnimatedWrapper>
  );
};

export default ErrorText;
