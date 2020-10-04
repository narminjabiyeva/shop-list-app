import { View, StyleSheet,TextInput, TouchableOpacity  } from "react-native";
import React, { useState } from "react";
import {connect} from "react-redux";

import { ScreenLayOut, CustomText, CustomBtn } from "../components";
import { addList} from "../store/lists"

export const NewListScreen = connect(null,{addList}) ((props) => {
    
    const [listName, setListName] = useState("");
    const [listSection,setListSection] = useState("one time list")

    const addNewList = () => {
        if (listName.trim() !== ''){
            props.addList({name:listName, section:listSection});
            props.navigation.navigate(listSection);
        }
        setListName("");
    }

    return (
        <ScreenLayOut title="New List">
            <CustomText weight="medium" style={styles.listName}>list name</CustomText>
            <TextInput
             style={styles.nameField}
             onChangeText={(text) => {setListName(text)}}
             value={listName}
            />
            <View style={styles.btnWrapper}>
                <View 
                 style={[
                        styles.btn,
                        {opacity: listSection === "one time list" ? 1 : 0.4}
                    ]}
                    >
                    <TouchableOpacity onPress={() => setListSection("one time list")}>
                       <CustomText 
                         style={[styles.btnName]}
                         weight={listSection === "one time list" ? "bold" : "regular"}
                        >
                           one time
                        </CustomText>
                    </TouchableOpacity>
                </View>
                <View 
                 style={[
                        styles.btn,
                         {opacity: listSection === "regular list" ? 1 : 0.4}
                    ]}
                >
                    <TouchableOpacity onPress={() => setListSection("regular list")} >
                        <CustomText
                         style={styles.btnName}
                         weight={listSection === "regular list" ? "bold" : "regular"}
                         >
                            regular
                        </CustomText>
                     </TouchableOpacity>
                </View>                
            </View>
            

            <CustomBtn title="CREATE LIST" onPress={() => addNewList()} />
        </ScreenLayOut>
    )

})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "red",
        paddingVertical: 20,
      
    },
    listName:{
        color: "#303234",
        fontSize: 12,
        textAlign: "center",
        opacity: 0.75,
        padding:5
    },
    nameField: {
        backgroundColor: "#EEEEEE",
        padding:10,
        borderRadius: 25,
        textAlign: "center",
        fontSize:18,
        marginBottom:15,
        fontFamily: "MontserratRegular",
    },
    btnWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    btn: {
        backgroundColor: "#EEEEEE",
        marginBottom: 15,
        padding: 15,
        width: "48%",
        borderRadius: 45,
        overflow: "hidden"
    },
    btnName: {
        fontSize: 12,
        textAlign: "center",
        textTransform: "capitalize"
    }
})