import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import { connect } from "react-redux";

import {CustomText} from "../components";
import defaultUser from "../assets/default-user.png";
import { getUser } from "../store/lists"

const mapStateToProps = (state) => ({
    user: getUser(state),
  });

export const CustomDrawer =  connect(mapStateToProps )((props) => {

    const {name} = props.user;
    const {img} = props.user;

    return(
        <View style={styles.container}>
            <DrawerContentScrollView >
                <View style={styles.userInfo}>
                    <Image style={styles.userImg} source={img !== "" ? {uri:img} : defaultUser}/>
                    <CustomText  style={styles.userName}>{name}</CustomText>
                </View>

                <View style={styles.drawerLinks}>
                    <TouchableOpacity 
                        style={[styles.link,{marginBottom:30}]} 
                        activeOpacity={0.5}
                        onPress={() => {props.navigation.navigate("new list")}}
                    >
                        <CustomText weight="bold" style={styles.title}>ADD NEW LIST</CustomText>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.link}
                        activeOpacity={0.5}
                        onPress={() => {props.navigation.navigate("one time list")}}
                    >
                        <CustomText weight="bold" style={styles.title}>one time list</CustomText>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.link}
                        activeOpacity={0.5}
                        onPress={() => {props.navigation.navigate("regular list")}}   
                    >
                        <CustomText weight="bold" style={styles.title}>regular list</CustomText>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.link}
                        activeOpacity={0.5}
                        onPress={() => {props.navigation.navigate("user settings")}} 
                    >
                        <CustomText weight="bold" style={styles.title}>user settings</CustomText>
                    </TouchableOpacity>
                </View>
            </DrawerContentScrollView>
        </View>
    )
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    userInfo: {
        flexDirection: "row",
        alignItems: "center",
    },
    userImg: {
        width: 50,
        height:50,
        borderRadius:25,
        borderColor:"#FF7676",
        borderWidth: 2,
        margin: 15
    },
    userName: {
       color: "#303234",
       fontSize: 24
    },
    drawerLinks: {
        height: 540,
        backgroundColor: "#FF7676",
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
    },
    link: {
        backgroundColor: "white",
        marginHorizontal:15,
        marginTop: 10,
        borderRadius: 50,
        padding: 10
    },
    title: {
        color: "#FF7676",
        textAlign: "center",
        textTransform: "uppercase"
    }
})