import React from "react";
import { View, StyleSheet,TouchableOpacity, FlatList  } from "react-native";
import { connect } from "react-redux";

import { ScreenLayOut, CustomText,} from "../components"
import editImg from "../assets/edit.png"
import backArrow from "../assets/backArrow.png"
import { toggleItem, resetAllItems } from "../store/lists"


const mapStateToProps = (state) => ({
    sections: state.shopList.sections,
  });

export const SingleListStaticScreen =  connect(mapStateToProps,{toggleItem, resetAllItems})(({route,sections,navigation,toggleItem,resetAllItems}) => {

     const {
         params: { sectionID, listID },
       } = route;
    
     const section = sections.find((section) => section.id === sectionID);
     const list = section.list.find((list) => list.id === listID);
     const bought = list.items.filter(item => item.bought === true).length;
     const count = list.items.length;

     const boughtItemHandler = (itemID) => {
       toggleItem({
         sectionID,
         listID,
         itemID
       })
     }
     const resetItems = () => {
      resetAllItems({
        sectionID,
         listID,
      })
     }

    return (
        <ScreenLayOut 
         leftImg = {backArrow}
         onPressLeft = {() => navigation.goBack()}
         rightImg={editImg}
         onPressRight= { () =>
            navigation.navigate("single list edit",{
              listID,
              sectionID,
          })
        }      
         title={list.name} >
           <View style={{flexDirection:"row",justifyContent: "space-between"}}>
             <TouchableOpacity
               disabled={!(section.name === "regular list")} 
               onPress={() => {resetItems()}}
              >
               <View style={styles.resetBtn}>
                 <CustomText weight="bold" style={styles.btnName} >RESET</CustomText>
               </View>               
             </TouchableOpacity>

             <CustomText style={styles.count}>{bought}/{count}</CustomText>
           </View>
           <FlatList 
             data={list.items}
             keyExtractor={item => item.id}
             renderItem={({item}) => 
               <TouchableOpacity 
                 onLongPress={() => {boughtItemHandler(item.id)}} 
              >
                 <View 
                  style={[styles.item,
                         {opacity: item.bought ? 0.5 : 1}
                         ]} >
                   <CustomText style={styles.itemName} >{item.name}</CustomText>
                   <CustomText>x{item.count} {item.measurement} </CustomText>
               </View>
              </TouchableOpacity>
            }
           
           />
           
        </ScreenLayOut>
    )

}
)



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "red",
        paddingVertical: 20,
      
    },
    item: {
      flexDirection: "row",
      padding: 10,
      borderColor: "#FFE194",
      borderWidth: 2,
      borderRadius: 25,
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 10
      
    },
    itemName: {
      textTransform: "capitalize",
      fontSize: 14,
      color: "black"
    },
    count: {
      right: 0,
      fontSize: 14,
    },
    resetBtn: {
      alignItems: "center",
      backgroundColor: "#FF7676",
      width: 70,
      padding: 5,
      borderRadius: 35,
      
    },
    btnName: {
      textTransform:"uppercase",
      color:"white",
      fontSize: 10
    }
})









































