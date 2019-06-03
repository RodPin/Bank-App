import React from "react";
import AnimatedWrapper from "./AnimatedWrapper";
import { View, TouchableOpacity, Text } from "react-native";
import FontAwesomeIcon5 from "react-native-vector-icons/FontAwesome5";

const Pig = ({ onPress, i, label }) => {
  return (
    <AnimatedWrapper i={i}>
      <FontAwesomeIcon5
        name="piggy-bank"
        color="white"
        size={100}
        style={{ alignSelf: "center", marginTop: 30 }}
      />
    </AnimatedWrapper>
  );
};

export default Pig;
