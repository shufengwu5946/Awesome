import AsyncStorage from "@react-native-community/async-storage";

export const storeData = async (key, value) => {
    await AsyncStorage.setItem(key, value);
};

export const retrieveData = async (key) => {
  const value = await AsyncStorage.getItem(key);
  return value;
};
