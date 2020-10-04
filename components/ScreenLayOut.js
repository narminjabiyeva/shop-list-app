import React from "react";
import { View, StyleSheet, Image,TouchableOpacity,ScrollView} from "react-native";

import { CustomText } from "../components";

export const ScreenLayOut = ({title,rightImg,leftImg,onPressRight,onPressLeft,children,...rest}) => {

    return (
        <View style={styles.container}>
            <View style={styles.header}>
            <TouchableOpacity style={styles.rightIcon} onPress={onPressRight}>
                    <Image
                        style={styles.rightIconImg}
                        source={rightImg}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
                <CustomText style={styles.headerTitle}>{title}</CustomText>
                <TouchableOpacity style={styles.leftIcon} onPress={onPressLeft}>
                    <Image
                        style={styles.leftIconImg}
                        source={leftImg}
                        resizeMode="cover"

                    />
                </TouchableOpacity>
               
            </View>
            <ScrollView style={styles.content}>
                {children}
            </ScrollView>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FF7676",
        paddingVertical: 20,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 25,
        justifyContent: "center"
    },
    headerTitle: {
        color: "white",
        fontSize: 16,
        lineHeight: 20,        
    },
    leftIcon: {        
        position: "absolute",
        left: 15,
        top: 20
    },
    leftIconImg: {
        width: 30,
        height: 20,
        resizeMode: "cover"
    },
    rightIcon:{
        position: "absolute",
        right: 15,
        top: 20
    },
    rightIconImg: {
        width: 30,
        height: 30,
        resizeMode: "cover"

    },    
    content: {
        padding: 15,
        backgroundColor: "white",
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        minHeight: "100%"
    },

})