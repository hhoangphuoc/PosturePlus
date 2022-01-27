import React from 'react'
import { Text,TouchableOpacity } from 'react-native'


import {FONTS, COLORS} from '../constant'


//________________________________________|
//
//CREATE TEMPLATE FOR ALL BUTTON WITH TEXT
//________________________________________|


const TextButton = ({
    //required properties of this button component
    contentContainerStyle, 
    disabled, 
    label, 
    labelStyle, 
    onPress
}) => {
    return (
        <TouchableOpacity
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor:COLORS.primary,
                ...contentContainerStyle
            }}
            //the properties of this component is set manually
            disabled={disabled}
            onPress={onPress}
        >
            <Text
                style={{
                    color:COLORS.white,
                    // ...FONTS.h3,
                    fontSize:16,lineHeight:22,
                    ...labelStyle
                }}
            >
                {label}
            </Text>
        </TouchableOpacity>
    )
}

export default TextButton;