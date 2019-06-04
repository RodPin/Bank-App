import React from "react";
import AnimatedWrapper from "./AnimatedWrapper";
import {
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Button
} from "react-native";
import { connect } from "react-redux";
const Saldo = () => {
  return (
    <AnimatedWrapper i={3}>
      <View style={{ marginTop: 10 }}>
        {this.props.saldo ? (
          <Text
            style={{
              fontSize: 20,
              marginTop: 10,
              color: "white",
              alignSelf: "center"
            }}
          >
            Saldo R$ {Math.round(this.props.saldo.toFixed(2))}
          </Text>
        ) : (
          <ActivityIndicator color="white" />
        )}
      </View>
    </AnimatedWrapper>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    saldo: auth.userData
  };
};

export default connect(mapStateToProps)(Saldo);
