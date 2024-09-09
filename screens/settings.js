import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { globalStyles } from "../styles/global";
import { Picker } from "@react-native-picker/picker";

export default function Settings() {
  const [selectedValue, setSelectedValue] = useState("English");

  return (
    <View style={globalStyles.mainContainer}>
      <View style={globalStyles.container}>
        <Text>App Language</Text>
        <Picker
          selectedValue={selectedValue}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => {
            global.language = itemValue;
            setSelectedValue(itemValue);
          }}
        >
          <Picker.Item label="English" value="English" />
          <Picker.Item label="Latin" value="Latin" />
        </Picker>
      </View>
    </View>
  );
}
