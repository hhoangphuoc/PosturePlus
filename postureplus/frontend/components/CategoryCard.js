import React from 'react'
import { TouchableOpacity, StyleSheet, Text, Image, ImageBackground, View } from 'react-native';
import {
    // FONTS, 
    COLORS, SIZES} from '../constant'

import { SharedElement } from 'react-navigation-shared-element';

const CategoryCard = ({sharedElementPrefix, category, containerStyle, onPress}) => {
    //argument: sharedElementPrefix -- TO DIFFERENTIATE SAME ELEMENT FROM DIFFERENT PAGES.
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                height:120,width:170,
                ...containerStyle
            }}
        >
            <SharedElement
                id={`${sharedElementPrefix}-categoryCard-bg-${category?.id}`}
                style={[StyleSheet.absoluteFillObject]}
            >
                <Image
                    source={category?.thumbnail}
                    resizeMode='cover'
                    style={{
                        width:"100%",
                        height:"100%",
                        borderRadius: SIZES.radius
                    }}
                />
            </SharedElement>
            <View
                style={{
                    position: 'absolute',
                    bottom:20, 
                    left:5
                }}
            >
                <SharedElement
                    id={`${sharedElementPrefix}-categoryCard-title-${category?.id}`}
                    // style={
                    //     [StyleSheet.absoluteFillObject]
                    // }
                >
                    <Text
                        style={{
                            flex: 1,
                            color:COLORS.white,
                            fontSize:18,
                            lineHeight:30,
                            // ...FONTS.h2
                        }}
                    >
                        {category?.title}
                    </Text>
                </SharedElement>

            </View>
            <SharedElement
                id={`${sharedElementPrefix}-categoryCard-image-${category?.id}`}
                style={[StyleSheet.absoluteFillObject]}
            >
                <Image
                        source={category?.category}
                        resizeMode='cover'
                        style={{
                            flex: 1,
                            position:'absolute',
                            right:5,
                            top:20,
                            width:100,height:80}}
                />
            </SharedElement>
        </TouchableOpacity>
    )
}

export default CategoryCard;
