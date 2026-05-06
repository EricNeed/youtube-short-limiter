import { SymbolView } from "expo-symbols";
import { StyleSheet } from "react-native";
import { mainStyle } from "./scheme_style";

export const symbolSize = 30 * mainStyle._internal.scaleFactor;

export const symbolCache = StyleSheet.create({
    home: <SymbolView name={{android: 'home'}} size={symbolSize} tintColor={color} fallback={<Text>?🏠?</Text>}/>
});