import { createAppContainer, createStackNavigator } from "react-navigation";

import Main from "../views/main";

import Login from "../views/login";
import Extract from "../views/extract";
import WithDraw from "../views/withdraw";
import Deposit from "../views/deposit";
import Transfer from "../views/transfer";

export default createAppContainer(
  createStackNavigator(
    {
      Login: { screen: Login },
      Main: { screen: Main },
      Extract: { screen: Extract },
      WithDraw: { screen: WithDraw },
      Deposit: { screen: Deposit },
      Transfer: { screen: Transfer }
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
