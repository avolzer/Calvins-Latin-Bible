import {
  Modal,
  Pressable,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Linking,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialIcons } from "@expo/vector-icons";
import Purchases from "react-native-purchases";
import useRevenueCat from "../hooks/useRevenueCat";

export default function SubscriptionModal({
  modalVisible,
  setModalVisible,
  subscribed,
}) {
  const { currentOffering } = useRevenueCat();

  const handleMonthlyPurchase = async () => {
    if (!currentOffering?.monthly) return;

    const purchaserInfo = await Purchases.purchasePackage(
      currentOffering.monthly
    );

    console.log(
      "MONTHLY SUB PURCHASED >>",
      purchaserInfo.customerInfo.entitlements.active
    );

    if (purchaserInfo.customerInfo.entitlements.active.pro) {
      setModalVisible(false);
    }
  };
  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: 18,
              paddingRight: 18,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}></View>
            <Pressable
              style={{ justifyContent: "center" }}
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <MaterialIcons
                name="close"
                size={30}
                color="gray"
              ></MaterialIcons>
            </Pressable>
          </View>
          <View
            style={{
              width: "100%",
              paddingBottom: 18,
              paddingHorizontal: 18,
            }}
          >
            <View
              style={{
                alignItems: "center",
                width: "100%",
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Premium Subscription
              </Text>
              {!subscribed && (
                <>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 20,
                      alignItems: "flex-end",
                    }}
                  >
                    <Text style={{ fontSize: 40, fontWeight: "bold" }}>
                      $5.99
                    </Text>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        paddingBottom: 4,
                      }}
                    >
                      /mo
                    </Text>
                  </View>
                </>
              )}

              {!subscribed && (
                <View style={{ paddingTop: 28, paddingBottom: 28 }}>
                  <TouchableOpacity
                    onPress={handleMonthlyPurchase}
                    style={{
                      borderWidth: 1,
                      alignItems: "center",
                      paddingVertical: 12,
                      paddingHorizontal: 24,
                      borderRadius: 4,
                      borderColor: "#1B572F",
                      elevation: 1,
                      backgroundColor: "white",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        color: "#1B572F",
                        fontWeight: "bold",
                      }}
                    >
                      Subscribe
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              <View>
                <Text style={{ fontSize: 18, padding: 12 }}>
                  The monthly subscription for{" "}
                  <Text style={{ color: "#1B572F", fontWeight: "bold" }}>
                    Calvin's Latin Bible
                  </Text>{" "}
                  includes access to the Latin text and audio of other books of
                  the Bible as they are released. Your subscription will
                  auto-renew monthly unless cancelled.{"\n\n"} Currently
                  available:
                  {"\n\n"}
                  <Ionicons name="checkmark" size={18} color="black" />{" "}
                  <Text style={{ paddingLeft: 4 }}>Mark</Text>
                </Text>
              </View>
              {subscribed && (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL(
                        "https://play.google.com/store/account/subscriptions"
                      );
                    }}
                    style={{ marginTop: 30, marginBottom: 10 }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        textDecorationLine: "underline",
                      }}
                    >
                      Unsubscribe
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 50,
    marginBottom: 200,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
