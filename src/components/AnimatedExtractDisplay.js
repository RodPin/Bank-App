import React from "react";
import AnimatedWrapper from "./AnimatedWrapper";
import { View, Text, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IconFA5 from "react-native-vector-icons/FontAwesome5";
import { GREEN, RED, BLUE, PINK } from "../utils";
const WIDTH = Dimensions.get("window").width;
const SmallText = ({ label, key, smaller, red }) => (
  <Text
    style={{
      color: red ? "red" : "black",
      fontSize: smaller ? 13 : 16,
      fontFamily: "Roboto",
      alignSelf: "center"
    }}
  >
    {label}
  </Text>
);

function getIconNameAndColor(tipo) {
  switch (tipo) {
    case "Transf Out":
      return { color: RED, icon: "bank-transfer-out" };
    case "Transf In":
      return { color: GREEN, icon: "bank-transfer-in" };
    case "Deposito":
      return { color: BLUE, icon: "call-received" };
    case "Saque":
      return { color: PINK, icon: "upload-outline" };
    default:
      return { color: "purple", icon: "upload-outline" };
  }
}

function getIcon(tipo) {
  var icon = getIconNameAndColor(tipo);
  return <Icon name={icon.icon} color={icon.color} size={30} />;
}

const Display = ({ transf, i }) => {
  return (
    <AnimatedWrapper i={i}>
      <View
        style={{
          alignSelf: "center",
          width: WIDTH * 0.8,
          height: 70,
          borderWidth: 2,
          borderRadius: 10,
          borderColor: "white",
          marginTop: 10,
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: WIDTH * 0.05,
          backgroundColor: "white",
          alignItems: "center"
        }}
      >
        <View>
          <SmallText smaller label={transf.data} />
          <SmallText smaller label={transf.hora} />
        </View>
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <IconFA5 name="money-bill-wave" color="black" size={17} />
            <SmallText label={"R$ " + transf.valor} />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <IconFA5 name="coins" color="black" size={17} />
            <SmallText
              red={transf.taxa > 0}
              label={transf.taxa ? " R$ " + transf.taxa : 0}
            />
          </View>
        </View>
        <View style={{ alignItems: "center", width: 80 }}>
          <SmallText label={transf.descricao} />
          {/* <Icon name="bank-transfer-out" color="red" /> */}
          {getIcon(transf.descricao)}
        </View>
      </View>
    </AnimatedWrapper>
  );
};

export default Display;
