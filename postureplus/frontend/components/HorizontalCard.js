// TEMPLATE FOR CREATING CARDS DISTRIBUTTED HORIZONTALLY
import React from 'react';
import { View, Text, Image} from 'react-native';
import {SIZES} from '../constant';
//_______________________________________|
//
//TEMPLATE FOR HORIZONTAL CAROUSEL LIST
//_______________________________________|

const HorizontalCard = ({containerStyle, exerciseDetail}) => {
    
    //Each of this touchableOpacity is an item, listed horizontally in the page.
    return (
        <View
            style={{
                flexDirection: 'row',
                ...containerStyle
            }}
        >  
            <Image
                source={exerciseDetail.src}
                style={{
                    width:'80%',
                    height:'50%',
                    marginHorizontal:SIZES.padding
                }}
            />
            <Text>
                {exerciseDetail.description}
            </Text>
        </View>
    )
}

export default HorizontalCard;

