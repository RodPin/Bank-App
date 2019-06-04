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
import firebase from "firebase";
const WIDTH = Dimensions.get("window").width;

class Transfer extends Component {
  state = { error: "", account: null, value: null };

  transfTo(acc, quant) {
    getAcc(acc)
      .once("value", function(snapshot) {
        const saldo = snapshot.val().saldo;
        getAcc(acc).update({
          saldo: saldo + quant
        });
      })
      .then(() => {
        register(acc, quant, "Transf Out");
      });
  }
  transfFrom(acc, quant, saldo, tax) {
    getAcc(acc)
      .update({
        saldo: saldo - (quant + tax)
      })
      .then(() => {
        register(acc, quant, "Transf In", tax);
      });
  }

  transfer(conta, quant, toAccount) {
    const vip =
      this.props.navigation.getParam("account") == "54321" ? true : false;
    const tax = vip ? quant * 0.008 : quant;
    if (this.props.navigation.getParam("account") !== conta) {
      if (toAccount !== null) {
        if (quant !== null) {
          if (!vip && quant > 1000) {
            this.setState({
              error: "Usuarios normais so podem transferir ate 1000"
            });
          } else {
            firebase
              .database()
              .ref()
              .child("users")
              .once("value")
              .then(value => {
                if (value.hasChild(toAccount)) {
                  if (quant <= value.val()[conta].saldo) {
                    this.transfFrom(
                      conta,
                      quant,
                      value.val()[conta].saldo,
                      tax
                    );
                    this.transfTo(toAccount, quant);
                  } else {
                    this.setState({ error: "Saldo insuficiente" });
                  }
                } else {
                  this.setState({ error: "Conta inexistente" });
                }
              });
          }
        } else {
          this.setState({ error: "Escolha o Valor" });
        }
      } else {
        this.setState({ error: "Escolha o usuario" });
      }
    } else {
      this.setState({ error: "Não é possivel transferir para si mesmo" });
    }
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
          Transfer
        </Text>
        <Fumi
          label={"To Account"}
          inputStyle={{
            color: GREEN,
            width: WIDTH * 0.8,
            marginTop: 10
          }}
          iconClass={FontAwesomeIcon}
          iconName={"user"}
          iconColor={GREEN}
          iconSize={15}
          maxLength={5}
          keyboardType="numeric"
          onChangeText={text => this.setState({ whom: text })}
        />
        <Fumi
          label={"How much?"}
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
          onChangeText={text => this.setState({ cash: text })}
        />

        <AnimatedButton
          thin
          label="Confirm"
          i={6}
          onPress={() =>
            this.transfer(
              this.props.navigation.getParam("account"),
              parseInt(this.state.cash),
              this.state.whom
            )
          }
        />

        <ErrorText label={this.state.error} />
        <Pig i={2} />
      </View>
    );
  }
}

export default Transfer;
