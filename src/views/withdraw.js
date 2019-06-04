import React, { Component } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  View,
  Text
} from "react-native";

import Pig from "../components/Pig";
import { Fumi } from "react-native-textinput-effects";
import { GREEN, getAcc, register } from "../utils";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import AnimatedButton from "../components/AnimatedButton";
import ErrorText from "../components/ErrorText";
const WIDTH = Dimensions.get("window").width;
const myAccount = "12345";
class WithDraw extends Component {
  state = { error: "" };
  componentWillMount() {
    this.setState({ myAcc: this.props.navigation.getParam("account") });
  }
  withdraw(acc, quant) {
    getAcc(acc).once("value", snapshot => {
      var saldo = snapshot.val().saldo;
      if (quant <= saldo) {
        getAcc(acc)
          .update({
            saldo: saldo - quant
          })
          .then(() => register(acc, this.state.value, "Saque"));
        console.log("saque de R$ " + quant + ",00 realizado com sucesso");
      } else {
        this.setState({ error: "Voce não pode sacar mais do que tem" });
      }
    });
  }

  render() {
    return (
      <View
        style={{ backgroundColor: "black", flex: 1, paddingHorizontal: 20 }}
      >
        <Text
          style={{
            fontSize: 30,
            color: "white",
            fontFamily: "Roboto",
            marginVertical: 10,
            textAlign: "center"
          }}
        >
          WithDraw
        </Text>
        <Fumi
          label={"How Much?"}
          inputStyle={{
            color: GREEN,
            width: WIDTH * 0.8
          }}
          iconClass={FontAwesomeIcon}
          iconName={"dollar"}
          iconColor={GREEN}
          iconSize={15}
          maxLength={8}
          keyboardType="numeric"
          onChangeText={text => this.setState({ value: text })}
        />
        <AnimatedButton
          thin
          label="Confirm"
          i={6}
          onPress={() => this.withdraw(this.state.myAcc, this.state.value)}
        />

        <ErrorText label={this.state.error} />
        <Pig i={7} />
      </View>
    );
  }
}

export default WithDraw;
