import { SymbolView } from "expo-symbols";
import { mainStyle } from "./scheme_style";

export const symbolSize = 30 * mainStyle._internal.scaleFactor;

export const symbolCache = {
    home: (color, size=symbolSize) => (<SymbolView name={{android: 'home', web: 'home'}} size={size} tintColor={color} fallback={<Text>?🏠?</Text>}/>),
    settings: (color, size=symbolSize) => (<SymbolView name={{android: 'settings', web: 'settings'}} size={size} tintColor={color} fallback={<Text>?⚙️?</Text>}/>),
    dataUsage: (color, size=symbolSize) => (<SymbolView name={{android: 'data_usage', web: 'data_usage'}} size={size} tintColor={color} fallback={<Text>?📉?</Text>}/>),
};