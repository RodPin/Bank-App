import { createAppContainer, createStackNavigator } from "react-navigation";

import Main from "../views/main";

import Login from "../views/login";
import Extract from "../views/extract";
export default createAppContainer(
  createStackNavigator(
    {
      Main: { screen: Main },
      Extract: { screen: Extract },
      Login: { screen: Login }
    },
    {
      headerMode: "float",
      cardStyle: {
        backgroundColor: "black"
      },
      headerTransitionPreset: "uikit",
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: "black"
        },
        headerTintColor: "#fff"
      }
    }
  )
);
