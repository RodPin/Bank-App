import React, { Component } from "react";
import {
  Modal,
  ActivityIndicator,
  Dimensions,
  View,
  Text,
  Button
} from "react-native";
import { Fumi } from "react-native-textinput-effects";
import * as Animatable from "react-native-animatable";
import firebase from "firebase";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../redux/authReducer";
import AnimatedButton from "../components/AnimatedButton";
import Pig from "../components/Pig";
import { getAcc } from "../utils";

function reverseString(str) {
  var newString = "";
  for (var i = str.length - 1; i >= 0; i--) {
    newString += str[i];
  }
  return newString;
}

const WIDTH = Dimensions.get("window").width;
class Main extends Component {
  state = {
    account: "",
    password: "",
    buttonActive: false,
    loginOk: false,
    saldo: "",
    managerVisitConfimation: false
  };
  static navigationOptions = { header: null };

  updateTotal(userCode) {
    getAcc(userCode).on("value", snapshot => {
      this.setState({ saldo: Math.round(snapshot.val().saldo * 100) / 100 });
    });
  }
  componentDidMount() {
    const user = this.props.navigation.getParam("account");
    this.setState({ user });
    this.updateTotal(user);
  }

  managerVisit(acc) {
    getAcc(acc).once("value", snapshot => {
      var saldo = snapshot.val().saldo;
      getAcc(acc).update({
        saldo: saldo - 50
      });
    });
  }
  renderModal() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.managerVisitConfimation}
      >
        <View style={{ marginTop: 22 }}>
          <View>
            <Text>Are you sure you want to call the manager?</Text>
            <View
              style={{
                flexDirection: "row",

                marginHorizontal: 10
              }}
            >
              <Button
                color="green"
                title="yes"
                onPress={() => {
                  this.managerVisit(this.state.user);
                  this.setState({
                    managerVisitConfimation: !this.state.managerVisitConfimation
                  });
                }}
              />
              <Button
                color="red"
                title="no"
                onPress={() =>
                  this.setState({
                    managerVisitConfimation: !this.state.managerVisitConfimation
                  })
                }
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
  render() {
    const { saldo } = this.state;
    return (
      <View style={{ backgroundColor: "black", flex: 1 }}>
        {this.renderModal()}
        <View style={{ marginTop: 10 }}>
          <Text style={{ color: "white", textAlign: "center" }}>
            Usuario logado:
            {this.state.user}
          </Text>
          {saldo ? (
            <Text
              style={{
                fontSize: 20,
                marginTop: 10,
                color: "white",
                alignSelf: "center"
              }}
            >
              Saldo R$ {saldo}
            </Text>
          ) : (
            <ActivityIndicator color="white" />
          )}
        </View>
        {//if its vip
        this.state.user == "54321" && (
          <AnimatedButton
            label="Visita do gerente"
            onPress={() =>
              this.setState({
                managerVisitConfimation: !this.state.managerVisitConfimation
              })
            }
            i={0}
          />
        )}
        <AnimatedButton
          label="Extrato"
          onPress={() =>
            this.props.navigation.navigate("Extract", {
              account: this.state.user
            })
          }
          i={1}
        />
        <AnimatedButton
          label="Saque"
          onPress={() =>
            this.props.navigation.navigate("WithDraw", {
              account: this.state.user
            })
          }
          i={2}
        />
        <AnimatedButton
          label="Deposito"
          onPress={() =>
            this.props.navigation.navigate("Deposit", {
              account: this.state.user
            })
          }
          i={3}
        />
        <AnimatedButton
          label="Transferencia"
          onPress={() =>
            this.props.navigation.navigate("Transfer", {
              account: this.state.user
            })
          }
          i={4}
        />

        <AnimatedButton
          label="Trocar de usuário"
          onPress={() => {
            const user = this.state.user;
            this.setState({ user: reverseString(user) });
            this.updateTotal(reverseString(user));
          }}
          i={5}
        />

        <Pig i={7} />
      </View>
    );
  }
}

export default Main;
