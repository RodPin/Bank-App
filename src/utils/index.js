import firebase from "firebase";

export const GREEN = "#009933";
export const RED = "#ff3333";
export const BLUE = "#0099ff";
export const PINK = "pink";

export function getAcc(acc) {
  return firebase
    .database()
    .ref()
    .child("users/" + acc);
}

export function register(acc, quant, tipo, taxa) {
  const verified = true;
  var today = new Date();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var date =
    today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate();
  const registerJSON = {
    data: date,
    hora: time,
    descricao: tipo,
    valor: quant,
    taxa: taxa ? taxa : ""
  };
  getAcc(acc)
    .child("transacoes")
    .push(registerJSON);
}
