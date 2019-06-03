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
import ExtractDisplay from "../components/AnimatedExtractDisplay";
function getAcc(acc) {
  return firebase
    .database()
    .ref()
    .child("users/" + acc);
}

const WIDTH = Dimensions.get("window").width;
class Extract extends Component {
  state = {
    transf: []
  };

  componentWillMount() {
    const user = "12345";
    this.setState({
      user
    });
    getAcc(user).on("value", snapshot => {
      var arrayTransf = [];
      console.log(snapshot.val().transacoes);
      // snapshot.val().transacoes.forEach(data => {
      //   console.log(data);
      //   arrayTransf.push({
      //     key: data.key,
      //     data: data.val()
      //   });
      // });
      // this.setState({ transf: arrayTransf });
    });
  }

  renderDisplays() {
    var aux = [];
    this.state.transf.map((x, i) => {
      aux.push(<ExtractDisplay i={i} transf={x} />);
    });
    return aux;
  }
  render() {
    const { saldo } = this.state;
    return (
      <View style={{ backgroundColor: "black", flex: 1 }}>
        {this.renderDisplays()}
        <Pig i={7} />
      </View>
    );
  }
}

export default Extract;
