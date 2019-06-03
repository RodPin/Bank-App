import React, { Component } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  View,
  Text
} from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import FontAwesomeIcon5 from "react-native-vector-icons/FontAwesome5";
import { Fumi } from "react-native-textinput-effects";
import * as Animatable from "react-native-animatable";
import firebase from "firebase";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../redux/authReducer";
import AnimatedButton from "../components/AnimatedButton";
import Pig from "../components/Pig";
function getAcc(acc) {
  return firebase
    .database()
    .ref()
    .child("users/" + acc);
}

//   saque(acc, quant) {
//     getAcc(acc)
//       .once("value", function(snapshot) {
//         var saldo = snapshot.val().saldo;
//         if (quant <= saldo) {
//           getAcc(acc)
//             .update({
//               saldo: saldo - quant
//             })
//             .then(() => this.register(acc, quant, "saque"));
//           console.log("saque de R$ " + quant + ",00 realizado com sucesso");
//         } else {
//           console.log("tentou sacar mais q tem");
//         }
//       })
//       .then(() => this.register(acc, quant, "saque"));
//   }
const WIDTH = Dimensions.get("window").width;
class Main extends Component {
  state = {
    account: "",
    password: "",
    buttonActive: false,
    loginOk: false,
    saldo: ""
  };
  static navigationOptions = { header: null };

  componentWillMount() {
    // const user = this.props.navigation.getParam("acc");

    const user = "12345";
    this.setState({
      user
    });
    getAcc(user).on("value", snapshot => {
      this.setState({ saldo: Math.round(snapshot.val().saldo * 100) / 100 });
    });
  }

  render() {
    const { saldo } = this.state;
    return (
      <View style={{ backgroundColor: "black", flex: 1 }}>
        <View style={{ marginTop: 10 }}>
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
        <AnimatedButton
          label="Extrato"
          onPress={() => this.props.navigation.navigate("Extract")}
          i={1}
        />
        <AnimatedButton
          label="Saque"
          onPress={() => console.log("saque")}
          i={2}
        />
        <AnimatedButton
          label="Deposito"
          onPress={() => console.log("saque")}
          i={3}
        />
        <AnimatedButton
          label="Transferencia"
          onPress={() => console.log("saque")}
          i={4}
        />

        <AnimatedButton
          label="Visita do gerente"
          onPress={() => console.log("saque")}
          i={5}
        />
        <AnimatedButton
          label="Trocar de usuário"
          onPress={() => console.log("saque")}
          i={6}
        />

        <Pig i={7} />
      </View>
    );
  }
}

export default Main;
