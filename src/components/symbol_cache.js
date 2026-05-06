import { SymbolView } from "expo-symbols";
import { mainStyle } from "./scheme_style";

export const symbolSize = 30 * mainStyle._internal.scaleFactor;

export const symbolCache = {
    home: (color) => (<SymbolView name={{android: 'home', web: 'home'}} size={symbolSize} tintColor={color} fallback={<Text>?🏠?</Text>}/>),
    settings: (color) => (<SymbolView name={{android: 'settings', web: 'settings'}} size={symbolSize} tintColor={color} fallback={<Text>?⚙️?</Text>}/>),
    dataUsage: (color) => (<SymbolView name={{android: 'data_usage', web: 'data_usage'}} size={symbolSize} tintColor={color} fallback={<Text>?📉?</Text>}/>),
};