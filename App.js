// import React, { Component } from "react";
// import { StyleSheet, Text, View, Button, TextInput } from "react-native";
// import firebase from "firebase";

// var firebaseConfig = {
//   apiKey: "AIzaSyCy1nUNwKGcUD8Qg8xntedzC3TVH1FseNg",
//   authDomain: "testee-9c33e.firebaseapp.com",
//   databaseURL: "https://testee-9c33e.firebaseio.com",
//   projectId: "testee-9c33e",
//   storageBucket: "testee-9c33e.appspot.com",
//   messagingSenderId: "450952465493",
//   appId: "1:450952465493:web:e253d13dc8ac4d5b"
// };
// function getAcc(acc) {
//   return firebase
//     .database()
//     .ref()
//     .child("users/" + acc);
// }

// export default class App extends Component {
//   saldo() {
//     ref.once("value", function(snapshot) {
//       console.log(snapshot.val().saldo);
//     });
//   }
//   extrato() {
//     ref.once("value", function(snapshot) {
//       console.log(snapshot.val().extrato);
//     });
//   }

//   register(acc, quant, tipo, taxa) {
//     const verified = true;
//     var today = new Date();
//     var time =
//       today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//     var date =
//       today.getFullYear() +
//       "/" +
//       (today.getMonth() + 1) +
//       "/" +
//       today.getDate();
//     const registerJSON = {
//       data: date,
//       hora: time,
//       descricao: tipo,
//       valor: quant,
//       taxa: taxa ? taxa : ""
//     };
//     getAcc(acc)
//       .child("transacoes")
//       .push(registerJSON);
//   }

//   transfTo(acc, quant) {
//     getAcc(acc)
//       .once("value", function(snapshot) {
//         const saldo = snapshot.val().saldo;
//         getAcc(acc).update({
//           saldo: saldo + quant
//         });
//       })
//       .then(() => {
//         this.register(acc, quant, "transferencia");
//       });
//   }
//   transfFrom(acc, quant, saldo, tax) {
//     getAcc(acc)
//       .update({
//         saldo: saldo - (quant + tax)
//       })
//       .then(() => {
//         this.register(acc, -quant, "transferencia", tax);
//       });
//   }

//   transfeee(conta, quant, toAccout) {
//     const verified = true;
//     const tax = verified ? quant * 0.008 : quant;
//     if (!verified && quant > 1000) {
//       console.log("Usuarios normais so podem transferir ate 1000");
//     } else {
//       console.log("fazendo transacao");
//       firebase
//         .database()
//         .ref()
//         .child("users")
//         .once("value")
//         .then(value => {
//           if (value.hasChild(toAccout)) {
//             if (quant <= value.val()[conta].saldo) {
//               this.transfFrom(conta, quant, value.val()[conta].saldo, tax);
//               this.transfTo(toAccout, quant);
//             } else {
//               console.log("saldo insuficiente");
//             }
//           } else {
//             console.log("conta inexistente");
//           }
//         });
//     }
//   }
//   componentWillMount() {
//     if (!firebase.apps.length) {
//       firebase.initializeApp(firebaseConfig);
//     }
//   }
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>Welcome to React !</Text>
//         <TextInput ></TextInput>
//         <Button title="Press" onPress={() => {}} />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#F5FCFF"
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: "center",
//     margin: 10
//   },
//   instructions: {
//     textAlign: "center",
//     color: "#333333",
//     marginBottom: 5
//   }
// });

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
