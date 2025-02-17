import { Platform } from "react-native";
import { useState, useEffect } from "react";
import Purchases, {
  CustomerInfo,
  PurchasesOffering,
} from "react-native-purchases";

const APIKeys = {
  apple: "your_revenuecat_apple_api_key",
  google: "goog_auMEMLHgfyTxKWvdrvEdHBHNrXN",
};

function useRevenueCat() {
  const [currentOffering, setCurrentOffering] = useState();
  const [customerInfo, setCustomerInfo] = useState();

  const isProMember = customerInfo?.activeSubscriptions.length > 0;

  useEffect(() => {
    const fetchData = async () => {
      // Purchases.setDebugLogsEnabled(true);
      Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);
      if (Platform.OS == "android") {
        await Purchases.configure({ apiKey: APIKeys.google });
      } else {
        await Purchases.configure({ apiKey: APIKeys.apple });
      }

      const offerings = await Purchases.getOfferings();
      const customerInfo = await Purchases.getCustomerInfo();

      setCurrentOffering(offerings.current);
      setCustomerInfo(customerInfo);
    };

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const customerInfoUpdated = async (purchaserInfo) => {
      setCustomerInfo(purchaserInfo);
    };

    Purchases.addCustomerInfoUpdateListener(customerInfoUpdated);
  }, []);

  return { currentOffering, customerInfo, isProMember };
}

export default useRevenueCat;
