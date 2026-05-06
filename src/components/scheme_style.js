import { Dimensions, StyleSheet } from 'react-native';


export let mainStyle;

export function setUpStyle(isNight){
    let wW = Dimensions.get('window').width; 
    let sF = wW / 360;//360 is the width for my phone, all interfaces are tested on this phone, all proportion are aim to be same as this

    mainStyle = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            outlineColor: isNight?'#c9c9c9':'#000000',
            backgroundColor: isNight?'#000000':'#000000',
        },
        text: {
            fontSize: 14 * sF,
            color: '#c9c9c9',
        },
        _internal: {
            windowWidth: wW,
            scaleFactor: sF,
        }
    })
}
setUpStyle(true);