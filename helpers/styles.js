import { Platform, StyleSheet } from "react-native";
import { white, purple, gray } from "./colors";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  input: {
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    width: 300,
    marginTop: 25,
    paddingLeft: 10,
  },
  deck: {
    width: 300,
    justifyContent: "space-around",
    alignContent: "center",
    backgroundColor: '#fcca03',
    // fontColor: white,
    borderColor: "transparent",
    borderRadius: 5,
    padding: 15,
    paddingLeft: 25,
    paddingRight: 25,
    marginTop: 25,

  },
  deckTitle: {
    fontSize: 18,
    fontWeight: "bold",
    // color: white
  },
  deckSubTitle: {
    fontSize: 13,
    fontWeight: "bold",
    // paddingTop: 5,
    // color: white
  },
  button: {
    width: 200,
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
    backgroundColor: 'lightgreen',
    borderRadius: 5,
    padding: 15,
    paddingLeft: 25,
    paddingRight: 25,
    marginBottom: 25,
  }
});
