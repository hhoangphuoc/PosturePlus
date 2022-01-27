import React from 'react'
import { View, Text } from 'react-native'

// import {FONTS} from '../constant'

const Header = ({
    containerStyle, title, 
    titleStyle, leftComponent, rightComponent
}) => {

    return(
      <View
        style={{
            height:60,
            flexDirection: 'row',
            width: '100%',
            ...containerStyle}}
      >
        {leftComponent}
        <View
            style={{
                flex:1,
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Text
                style={{
                    // ...FONTS.h3, 
                    fontSize:16,lineHeight:22,
                    ...titleStyle
                }}
            >
                {title}
            </Text>


        </View>
        {rightComponent}
      </View>  
    );
}

export default Header;