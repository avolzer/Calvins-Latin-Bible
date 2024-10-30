import React, { useContext } from "react";
import { StyleSheet, View, Text, Switch } from "react-native";
import { globalStyles } from "../styles/global";
import { Picker } from "@react-native-picker/picker";
import { SettingsContext } from "../context/settingsContext";

export default function Settings() {
  const {
    appLanguage,
    setAppLanguage,
    showLongmarks,
    toggleLongmarks,
    fontSize,
    setFontSize,
    translation,
    setTranslation,
  } = useContext(SettingsContext);

  return (
    <View style={globalStyles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.label}>App Preferences</Text>
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.text}>App Language</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={appLanguage}
                style={{ width: 150 }}
                onValueChange={(itemValue) => {
                  setAppLanguage(itemValue);
                }}
              >
                <Picker.Item label="English" value="English" />
                <Picker.Item label="Latin" value="Latin" />
              </Picker>
            </View>
          </View>
        </View>
        <Text style={styles.label}>Text Settings</Text>

        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.text}>Show long marks</Text>
            <Switch
              style={{ flex: 1 }}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={global.showLongmarks ? "#f5dd4b" : "#f4f3f4"}
              // ios_backgroundColor="#3e3e3e"
              onValueChange={() => {
                toggleLongmarks();
              }}
              value={showLongmarks}
            />
          </View>
          <View
            style={[styles.row, { borderTopWidth: 1, borderColor: "gray" }]}
          >
            <Text style={styles.text}>Font Size</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={fontSize}
                style={{ width: 150 }}
                onValueChange={(itemValue) => {
                  setFontSize(itemValue);
                }}
              >
                <Picker.Item label="Small" value={14} />
                <Picker.Item label="Regular" value={20} />
                <Picker.Item label="Large" value={24} />
                <Picker.Item label="Extra Large" value={30} />
              </Picker>
            </View>
          </View>
          <View
            style={[styles.row, { borderTopWidth: 1, borderColor: "gray" }]}
          >
            <Text style={styles.text}>English Translation</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={translation}
                style={{ width: 150 }}
                onValueChange={(itemValue) => {
                  setTranslation(itemValue);
                }}
              >
                <Picker.Item label="ESV" value={"ESV"} />
                <Picker.Item label="KJV" value={"KJV"} />
              </Picker>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  text: {
    fontSize: 16,
  },
  label: {
    fontSize: 14,
    color: "gray",
  },
  section: {
    marginBottom: 30,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 8,
    // padding: 20,
    marginVertical: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    width: 150,
    borderRadius: 4,
    borderColor: "gray",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
});
