import React from 'react';
import {StyleSheet, View, Image,TouchableOpacity} from 'react-native';

import { CustomText } from "../components";
import  deleteItemImg  from "../assets/deleteItem.png"
import  editItemImg  from "../assets/editItem.png"


export class ListItem extends React.Component{

render() {
  return(
        
        <View style={styles.container}>
            

            <View style={styles.item} >
                 <CustomText style={styles.itemName} >{this.props.name}</CustomText>
                 <CustomText>x{this.props.count} {this.props.measurement} </CustomText>
             </View>  
              <TouchableOpacity style={styles.editIcon} onPress={this.props.editItem}>
                 <Image source={editItemImg} style={styles.editIconImg}/>
            </TouchableOpacity>       

            <TouchableOpacity style={styles.deleteIcon} onPress={this.props.deleteItem}>
                <Image source={deleteItemImg} style={styles.deleteIconImg}/>
            </TouchableOpacity>
      </View>
        
    )
}
  

    
}

const styles = StyleSheet.create({
    container: {
        position: "relative" ,
        marginBottom: 10,
    },
    item: {
        padding: 10,
        borderColor: "#FFE194",
        borderWidth: 2,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 50
      },
      itemName: {
        textTransform: "capitalize",
        fontSize: 14
      },
      editIcon: {
          position: "absolute",
          width: 40,
          height: 40,
          left: 0,
          top: 1          
      },
      editIconImg: {
        width: 40,
        height: 40,
      },
     deleteIcon: {
        position: "absolute",
        width: 40,
        height: 40,
        right: 0,
        top: 1         
    },
    deleteIconImg: {
      width: 40,
      height: 40,
    }
})