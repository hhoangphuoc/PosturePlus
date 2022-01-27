
//--------------------------------
//THIS IS THE SIDE MENU OF THE APP
//----------------------------------


import React from 'react'
import { View,Text,Image,TouchableOpacity } from 'react-native'

import {
    createDrawerNavigator, 
    DrawerContentScrollView
} from '@react-navigation/drawer'

import {Profile} from "../screens"

import Tabs from './tabs'
import {COLORS, SIZES, icons, dummydata} from '../constant';
import constants from '../constant/constants'

const Drawer = createDrawerNavigator();


const DrawerItem = ({label, icon, onPress}) => {
    return (
        <TouchableOpacity
            style={{
                    flexDirection:"row",
                    height: 40,
                    marginBottom: SIZES.base,
                    alignItems: "center",
                    paddingLeft:SIZES.radius, 
                    borderRadius:SIZES.base
            }}
            onPress={onPress}
        
        >
            <Image
                source={icon}
                style={{
                    width:20,height:20,
                    tintColor:COLORS.white
                }}
            />
            <Text
                style={{
                    marginLeft:15,
                    color:COLORS.white,
                    fontSize:SIZES.h4, lineHeight: 22
                }}
            >
                {label}
            </Text>


        </TouchableOpacity>
    )
}

const CustomDrawerContent = ({navigation}) => {
    return (
        <DrawerContentScrollView
            scrollEnabled={true}
            contentContainerStyle={{
                flex:1
            }}
        >
            <View
                style={{ 
                    flex:1,
                    paddingHorizontal: SIZES.radius
                }}
            >

                <View
                    style={{
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                    }}
                >   
                    {/* Close Button */}
                    <TouchableOpacity
                        style={{
                            alignItems: 'center',justifyContent: 'center'
                        }}
                        onPress={() => navigation.closeDrawer()}
                    >
                        <Image
                            source={icons.close}
                            style={{
                                height:35,
                                width:35,
                                tintColor:COLORS.white
                            }}
                        />

                    </TouchableOpacity>
                </View>
                {/* Profile Section */}
                <TouchableOpacity
                    style={{
                        flexDirection:'row',
                        marginTop: SIZES.radius,
                        alignItems: 'center',
                    }}
                    onPress={() => navigation.navigate("Profile")}
                >   
                    <View
                        style={{
                            backgroundColor: COLORS.black,
                            borderRadius:60,
                            width:60,height:60,
                            alignItems: 'center',justifyContent: 'center'
                        }}
                    >
                        <Image
                            source={icons.profile}
                            style={{
                                height:50,
                                width:50,
                                borderRadius:SIZES.radius
                            }}
                        />
                    </View>
                    <View
                        style={{
                            marginLeft:SIZES.radius
                        }}
                    >
                        <Text
                            style={{
                                color:COLORS.white, fontSize:SIZES.h3, lineHeight:22
                            }}
                        >
                            Mr.Posture Plus
                        </Text>
                        <Text
                            style={{
                                color:COLORS.white, fontSize:SIZES.body5 , lineHeight:22
                            }}
                        >
                            View your profile
                        </Text>
                    </View>
                </TouchableOpacity>
                {/* Drawer Items */}
                <View
                    style={{
                        flex:1,
                        marginTop:SIZES.padding
                    }}
                >
                    <DrawerItem
                        label={constants.screens.home}
                        icon={icons.home}
                        onPress={() => navigation.navigate("Home")}
                    />
                    <DrawerItem
                        label={constants.screens.search}
                        icon={icons.search}
                        onPress={() => navigation.navigate("Search")}
                    />
                    <DrawerItem
                        label={constants.screens.favourite}
                        icon={icons.bookmark}
                        onPress={() => navigation.navigate("Favorites")}
                    />
                    {/* Line Seperator */}
                    <View
                        style={{
                            height:1,
                            marginVertical:SIZES.radius,
                            marginLeft:SIZES.radius,
                            backgroundColor:COLORS.lightGray,
                        }}
                    >
                    </View>
                    <DrawerItem
                        label="Settings"
                        icon={icons.settings}
                    />
                    <DrawerItem
                        label="AI Helper"
                        icon={icons.voice}
                    />
                    <DrawerItem
                        label="Customer Service"
                        icon={icons.support}
                    />
                </View>
                <View
                    style={{
                        marginBottom:SIZES.padding
                    }}
                >
                    <DrawerItem
                        label="Logout"
                        icon={icons.logout}
                    />
                </View>
            </View>
        </DrawerContentScrollView>
    )
}
const SideMenu = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                drawerType: "slide",
                overlayColor:"transparent",
                drawerStyle:{
                    flex:1,
                    width:'65%',
                    paddingRight:20,
                    backgroundColor:COLORS.primary,
                },
                sceneContainerStyle:{
                    backgroundColor:COLORS.primary,
                },
                headerShown: false,
            }}
            initialRouteName="Home"
            drawerContent={props => {
                return (
                    <CustomDrawerContent
                        navigation={props.navigation}
                    />
                )
            }}
        >
            <Drawer.Screen
                name="Home" component={Tabs}
            />
            {/* <Drawer.Screen
                name="Profile" component={Profile}
            /> */}
        </Drawer.Navigator>

        // </View>
    )
}

export default SideMenu;