import { SymbolView } from "expo-symbols";
import { mainStyle } from "./scheme_style";

export const symbolSize = 30 * mainStyle._internal.scaleFactor;

// export const symbolCache = {
//     home: (color, size=symbolSize) => (<SymbolView name={{android: 'home', web: 'home'}} size={size} tintColor={color} fallback={<Text>?🏠?</Text>}/>),
//     settings: (color, size=symbolSize) => (<SymbolView name={{android: 'settings', web: 'settings'}} size={size} tintColor={color} fallback={<Text>?⚙️?</Text>}/>),
//     dataUsage: (color, size=symbolSize) => (<SymbolView name={{android: 'data_usage', web: 'data_usage'}} size={size} tintColor={color} fallback={<Text>?📉?</Text>}/>),
//     close: (color, size=symbolSize) => (<SymbolView name={{android: 'close', web: 'close'}} size={size} tintColor={color} fallback={<Text>?📉?</Text>}/>),
// };

const symbolConfigs = {
    home: [{android: 'home', web: 'home'}, <Text>?🏠?</Text>],
    settings: [{android: 'settings', web: 'settings'}, <Text>?⚙️?</Text>],
    dataUsage: [{android: 'data_usage', web: 'data_usage'}, <Text>?📉?</Text>],
    close: [{android: 'close', web: 'close'}, <Text>?📉?</Text>],
    add: [{android: 'add', web: 'add'}, <Text>?+?</Text>],
    edit: [{android: 'edit', web: 'edit'}, <Text>?✏️?</Text>],
}

export const getSymbolConfigured = (name, color, size=symbolSize) => {
    const symbolConfig = symbolConfigs[name];
    return <SymbolView name={symbolConfig[0]} size={size} tintColor={color} fallback={symbolConfig[1]}/>
}