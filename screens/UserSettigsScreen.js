import React, { useState } from "react";
import {  StyleSheet,TextInput } from "react-native";
import {connect} from "react-redux";

import { ScreenLayOut, CustomText, CustomBtn } from "../components"
import { addUser,getUser } from "../store/lists"

const mapStateToProps = (state) => ({
    user: getUser(state),
  });


export const UserSettingsScreen = connect(mapStateToProps,{addUser})(({navigation,addUser,user}) => {

    const [fields,setFields]  = useState({
        name: "",
        img: ""
    })

    const handleFieldChange = (name, value) => {
        setFields((fields) => ({
          ...fields,
          [name]: value,
        }));
      };

      const saveChanges = () => {
        if (fields.name.trim() !== ''){
            addUser({
                name: fields.name,
                img: fields.img
            });
            navigation.navigate("one time list");
            navigation.openDrawer()
        }
      }
      console.log(user);
      console.log(fields)

    return (
        <ScreenLayOut 
            title="User Settings"
         >
           <CustomText style={styles.inputTitle}>username</CustomText>
           <TextInput style={styles.input} onChangeText={(value) => handleFieldChange("name",value)}/>
           <CustomText style={styles.inputTitle}>avatar url</CustomText>
           <TextInput style={styles.input} onChangeText={(value) => handleFieldChange("img",value)}/>
           <CustomBtn title="SAVE CHANGES"  onPress={() => saveChanges()}/>
        </ScreenLayOut>
    )

})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "red",
        paddingVertical: 20,
      
    },
    inputTitle: {
        color: "#303234",
        fontSize: 12,
        textAlign: "center",
        opacity: 0.75,
        padding:5
    },
    input: {
        backgroundColor: "#EEEEEE",
        padding:10,
        borderRadius: 25,
        textAlign: "center",
        fontSize:18,
        marginBottom:15,
        fontFamily: "MontserratRegular",
    }
})