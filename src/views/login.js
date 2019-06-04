import React, { Component } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  View,
  Text
} from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { Fumi } from "react-native-textinput-effects";
import * as Animatable from "react-native-animatable";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Pig from "../components/Pig";
import { setAuthUser } from "../redux/authReducer";
import { GREEN, getAcc } from "../utils";
import ErrorText from "../components/ErrorText";
const WIDTH = Dimensions.get("window").width;
class Login extends Component {
  static navigationOptions = { header: null };
  state = {
    account: "",
    password: "",
    error: "",
    buttonActive: false,
    loginOk: false
  };

  navigateWithAuth(account) {
    getAcc(account).on("value", snapshot => {
      this.props.navigation.navigate("Main", { account });
    });
  }
  login(account, password) {
    if (account == "12345") {
      if (password == "1234") {
        this.navigateWithAuth(account);
      } else {
        this.setState({ error: "Password invalid" });
      }
    } else if (account == "54321") {
      if (password == "1234") {
        this.navigateWithAuth(account);
      } else {
        this.setState({ error: "Password invalid" });
      }
    } else {
      this.setState({ error: "Account Numbers invalid" });
    }
  }
  renderButton() {
    const { buttonActive, account, password } = this.state;
    if (buttonActive) {
      return (
        <Animatable.View animation={"fadeIn"} duration={1000}>
          <TouchableOpacity
            onPress={() => {
              this.login(account, password);
            }}
          >
            <View style={{ alignSelf: "center" }}>
              <Text
                style={{ color: "white", fontSize: 19, fontFamily: "Roboto" }}
              >
                Login
              </Text>
            </View>
          </TouchableOpacity>
        </Animatable.View>
      );
    }
    return;
  }
  render() {
    return (
      <View style={styles.container}>
        <Pig />
        <Animatable.View animation={"fadeIn"} duration={2000} delay={1000}>
          <View
            style={[
              styles.card2,
              {
                backgroundColor: "black"
              }
            ]}
          >
            <Fumi
              label={"Account Number"}
              inputStyle={{
                color: GREEN,
                width: WIDTH * 0.8
              }}
              iconClass={FontAwesomeIcon}
              iconName={"user"}
              iconColor={GREEN}
              iconSize={15}
              maxLength={5}
              keyboardType="numeric"
              onChangeText={text => this.setState({ account: text })}
            />
            <Fumi
              style={styles.input}
              label={"Password"}
              iconClass={FontAwesomeIcon}
              iconName={"key"}
              secureTextEntry
              keyboardType="numeric"
              maxLength={4}
              iconColor={"#00b33c"}
              onChangeText={text => {
                this.setState({ password: text });
                if (text.length > 2) {
                  this.setState({ buttonActive: true });
                }
              }}
            />
          </View>
          {this.renderButton()}
        </Animatable.View>
        <ErrorText label={this.state.error} />
        <View />
        <View />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "black"
  },

  card1: {
    paddingVertical: 16
  },
  card2: {
    padding: 16
  },
  input: {
    marginTop: 4
  },
  title: {
    paddingBottom: 16,
    textAlign: "center",
    color: "#404d5b",
    fontSize: 20,
    fontWeight: "bold",
    opacity: 0.8
  }
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setAuthUser
    },
    dispatch
  );
}
export default connect(
  null,
  mapDispatchToProps
)(Login);
