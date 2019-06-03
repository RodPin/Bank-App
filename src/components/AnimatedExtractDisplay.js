import React from "react";
import AnimatedWrapper from "./AnimatedWrapper";
import { View, Text } from "react-native";
const Display = ({ transf, i }) => {
  return (
    <AnimatedWrapper i={i}>
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
          {transf.data} {transf.descricao} {transf.hora} {transf.taxa}
          {transf.valor}
        </Text>
      </View>
    </AnimatedWrapper>
  );
};

export default Display;
