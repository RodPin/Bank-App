import React, { Component } from "react";
import firebase from "firebase";
import Login from "./src/views/login";
import { Provider } from "react-redux";
import store from "./src/store";
import RootNavigator from "./src/navigators/rootNavigator";

var firebaseConfig = {
  apiKey: "AIzaSyCy1nUNwKGcUD8Qg8xntedzC3TVH1FseNg",
  authDomain: "testee-9c33e.firebaseapp.com",
  databaseURL: "https://testee-9c33e.firebaseio.com",
  projectId: "testee-9c33e",
  storageBucket: "testee-9c33e.appspot.com",
  messagingSenderId: "450952465493",
  appId: "1:450952465493:web:e253d13dc8ac4d5b"
};

export default class App extends Component {
  componentWillMount() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  render() {
    return (
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    );
  }
}
