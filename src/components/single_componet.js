import { useState } from "react";
import { HelperText, TextInput } from "react-native-paper";
import { mainStyle } from "./scheme_style";

export const NumInput = ({lable, placeholder, defaultValue, onNumberChange, onFocusOrBlur}) => {
    const [showError, setShowError] = useState(false);

    return <>
        <TextInput 
            label={lable}
            placeholder={placeholder}
            mode='outlined'
            dense={true}
            style={{alignSelf:"stretch", backgroundColor: '#000000'}}
            activeOutlineColor={mainStyle.text.color}
            outlineColor={mainStyle.borderColor}
            inputMode='numeric'
            textColor={mainStyle.text.color}
            value={defaultValue}
            onChangeText={(text) => {
            const inNumber = +text;//turn to number
            //handle error and display error message
            if(isNaN(inNumber)){
                setShowError(true);
                return;
            }else if(showError){
                setShowError(false);
            }
            onNumberChange(inNumber);
            }}
            onFocus={onFocusOrBlur !== undefined? () => onFocusOrBlur(true):()=>{}}
            onBlur={onFocusOrBlur !== undefined? () => onFocusOrBlur(false):()=>{}}
        />
        <HelperText type="error" visible={showError}>
            Input can only be number
        </HelperText>
    </>
}
// currentGroup.dailyLimitinNumber = currentGroup.dailyLimit;