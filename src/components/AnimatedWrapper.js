import React from "react";
import * as Animatable from "react-native-animatable";
const AnimatedWrapper = props => {
  return (
    <Animatable.View animation={"fadeIn"} duration={1000} delay={props.i * 300}>
      {props.children}
    </Animatable.View>
  );
};

export default AnimatedWrapper;
