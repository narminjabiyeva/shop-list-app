import React from 'react';
import {StyleSheet, View,} from 'react-native';

import { CustomText } from "../components";

export const List = ({list,oneTime}) => {
    const bought = list.items.filter(item => item.bought === true).length;
    const count = list.items.length
    const progress = `${(bought/count) * 100}%`;
    const opacity = oneTime && progress === "100%" && count ? true : false;

    return(
        
            <View style={[styles.container,{opacity: opacity ? 0.5 : 1}]}>
                 <View style={styles.header}>
                    <CustomText  weight="bold">{list.name}</CustomText>
                    <CustomText>{bought}/{count}</CustomText>
                 </View>
         
                 <View style={styles.progressBar}>
                     <View style={[styles.progress,{width: count ? progress : 0}]}/>
                 </View>
            </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
       borderColor:"#FFE194",
       borderWidth: 2,
       borderRadius: 10,
       paddingHorizontal: 20,
       paddingVertical: 15,
       marginBottom: 15
    },
    header:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    progressBar: {
        backgroundColor: "#EEEEEE",
        height: 20,
        width: "100%",
        borderRadius:20,
        marginTop: 5
    },
    progress: {
    backgroundColor: "#FFD976",
    borderRadius:20,
    height: 20,
    }
})