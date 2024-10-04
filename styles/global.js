import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    marginLeft: 24,
    marginRight: 24,
    backgroundColor: "white",
  },
  text: {
    fontSize: 20,
    lineHeight: 35,
    fontFamily: "serif",
  },
  paragraph: {
    fontSize: 20,
    marginTop: 15,
    marginBottom: 15,
    fontFamily: "serif",
  },
  subHeading: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "serif",
    paddingTop: 24,
  },
});
