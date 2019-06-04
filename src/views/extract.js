import React, { Component } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  View,
  Text,
  ScrollView
} from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import FontAwesomeIcon5 from "react-native-vector-icons/FontAwesome5";
import { Fumi } from "react-native-textinput-effects";
import * as Animatable from "react-native-animatable";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../redux/authReducer";
import AnimatedButton from "../components/AnimatedButton";
import { getAcc } from "../utils";
import Pig from "../components/Pig";
import ExtractDisplay from "../components/AnimatedExtractDisplay";

const WIDTH = Dimensions.get("window").width;
class Extract extends Component {
  state = {
    transf: []
  };
  static navigationOptions = {
    headerTitle: "Extrato"
  };
  componentWillMount() {
    const user = this.props.navigation.getParam("account");

    getAcc(user).on("value", snapshot => {
      var arrayTransf = [];

      // alert(snapshot.val().transacoes["-LgQ988CX2PJlVpZ1e62"]["data"]);
      var array = Object.values(snapshot.val().transacoes);
      array.forEach(data => {
        arrayTransf.push(data);
      });
      this.setState({ transf: arrayTransf.reverse() });
    });
  }

  renderDisplays() {
    var aux = [];
    this.state.transf.map((x, i) => {
      // alert(x);
      aux.push(<ExtractDisplay i={i} transf={x} />);
    });
    return aux;
  }
  render() {
    const { saldo } = this.state;
    return (
      <ScrollView style={{ backgroundColor: "black", flex: 1 }}>
        {this.renderDisplays()}
        <Pig i={7} />
      </ScrollView>
    );
  }
}

export default Extract;
