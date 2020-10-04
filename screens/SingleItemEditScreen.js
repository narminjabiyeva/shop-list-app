import React, {useState} from "react";
import { View, StyleSheet, FlatList, TouchableOpacity,TextInput } from "react-native";
import { connect } from "react-redux";

import { ScreenLayOut, CustomText,ListItem, CustomBtn} from "../components"
import saveImg from "../assets/save.png"
import backArrow from "../assets/backArrow.png"
import { deleteItem, addItem, updateItem } from "../store/lists"



const mapStateToProps = (state) => ({
    sections: state.shopList.sections,
  });

export const SingleItemEditScreen =  connect(mapStateToProps,{deleteItem, addItem, updateItem})(
  ({deleteItem, 
    route,
    sections,
    navigation,
    addItem,
    updateItem }) => {
      
      
      const {
         params: { sectionID, listID ,itemID},
      } = route;

      const list = sections.find((section) => section.id === sectionID)?.list.find((list) => list.id === listID);
      const item = list.items.find((item) => item.id === itemID);
     
      const [fields,setFields] = useState({
        count: item.count,
        measurement: item.measurement
      })

      
      

      const deleteListItem = (id) => {
        deleteItem({
          sectionID,
          listID,
          itemID:id
        })
      };

      const updateListItem = () => {
        updateItem({
          sectionID,
          listID,
          itemID,
          fields
        });
       
        navigation.navigate("single list edit",{
              listID,
              sectionID,
          });
      };

      const handleFieldChange = (name, value) => {
        setFields((fields) => ({
          ...fields,
          [name]: value,
        }));
      };

      const addToList = (itemID) => {
        addItem({
          sectionID,
          listID,
          fields
        });
        
        setFields({
          name: "",
          count: 0,
          measurement: "pkg"
        });
       }
      

      return (
        <ScreenLayOut 
          leftImg = {backArrow}
          onPressLeft = {() => navigation.goBack()}
          rightImg={saveImg} 
          onPressRight= {() => navigation.navigate("single list static") }
          title={list.name} >
           <View style={styles.fieldsWrapper}>
              
              <View style={styles.position}>
                <CustomText weight="medium" style={styles.fieldTitle}>position name</CustomText>
                <View style={styles.positionFields}>
                  <CustomText weight="bold"> {item.name} </CustomText>
                </View>
              </View>
              
              <View style={styles.count}>
                <CustomText weight="medium" style={styles.fieldTitle}>count</CustomText>
                <View style={styles.countField}>
                  <TouchableOpacity
                   style={styles.countBtn}
                   onPress={() => {handleFieldChange("count",fields.count - 1)}}
                  >
                   <CustomText weight="bold" style={styles.countBtnText}>-</CustomText>
                  </TouchableOpacity >

                    <CustomText weight="bold" style={styles.countText}> {fields.count} </CustomText>
                  
                  <TouchableOpacity 
                   style={styles.countBtn}
                   onPress={() => {handleFieldChange("count",fields.count + 1)}}
                  >
                    <CustomText weight="bold" style={styles.btnText}>+</CustomText>
                  </TouchableOpacity>                
                </View>
              </View>              
           </View>
           <View style={styles.measurements}>
              <TouchableOpacity 
                style={[styles.measurementBtn, { opacity: fields.measurement==="pkg" ? 1 : 0.5 }]}
                onPress={() => {handleFieldChange("measurement","pkg")}}
              >
                    <CustomText weight="bold" style={styles.measurementBtnText}>pkg</CustomText>
              </TouchableOpacity> 
              <TouchableOpacity 
                style={[styles.measurementBtn , { opacity: fields.measurement==="kg" ? 1 : 0.5 }]}
                onPress={() => {handleFieldChange("measurement","kg")}}
              >
                    <CustomText weight="bold" style={styles.measurementBtnText}>kg</CustomText>
              </TouchableOpacity>  
              <TouchableOpacity
                style={[styles.measurementBtn, { opacity: fields.measurement==="litre" ? 1 : 0.5 }]}
                onPress={() => {handleFieldChange("measurement","litre")}}
              >
                    <CustomText weight="bold" style={styles.measurementBtnText}>litre</CustomText>
              </TouchableOpacity>  
              <TouchableOpacity
                style={[styles.measurementBtn, { opacity: fields.measurement==="bott" ? 1 : 0.5 }]}
                onPress={() => {handleFieldChange("measurement","bott")}}
              >
                    <CustomText weight="bold" style={styles.measurementBtnText}>bott</CustomText>
              </TouchableOpacity>   
           </View>

           <View style={styles.btnWrapper}>
             <CustomBtn
              title="CANCEL"
              style={styles.btn}
              onPress={() => navigation.navigate("single list edit") }
            />
             <CustomBtn
              title="UPDATE"
              style={styles.btn}
              onPress={() =>{updateListItem()}}
            />
           </View>
           <View style={styles.line}/>       

          <FlatList 
             data={list.items}
             keyExtractor={item => item.id}
             renderItem={({item}) => 
                <ListItem
                 name={item.name}
                 count={item.count}
                 measurement={item.measurement}
                 deleteItem={() => {deleteListItem(item.id)}} 
                 editItem={() =>
                 navigation.navigate("single item edit",{
                   listID,
                   sectionID,
                 })}
                />
            }
           
           /> 
           
          
        </ScreenLayOut>
    )

}
)

const styles = StyleSheet.create({
   fieldsWrapper: {
     flexDirection: "row",
     alignItems: "center",
     justifyContent: "space-between"
   },
   position:{
     width: "58%"
   },
    fieldTitle: {
     fontSize: 12,
     color: "#303234",
     textAlign: "center",
     padding: 5
   },
   positionFields: {
     backgroundColor: "#EEEEEE",
     padding: 8,
     borderRadius: 25,
     textAlign: "center",
   },
   count:{
     width: "38%"
   },
   countField: {
     flexDirection:"row",
     alignItems: "center",justifyContent: "space-between",
     backgroundColor: "#EEEEEE",
     borderRadius: 25,
     
   },
   countText: {
     fontSize: 20,
   },
   countBtn: {
     fontSize: 18,
     paddingHorizontal:15,
     paddingVertical: 10
   },
   btnText: {
     fontSize: 18
   },
   measurements: {
     flexDirection: "row",
     alignItems: "center",
     justifyContent: "space-between"
   },
   measurementBtn: {
     backgroundColor: "#EEEEEE",
     padding: 10,
     width: "23%",
     borderRadius: 25,
     marginVertical: 15

   },
   measurementBtnText: {
     fontSize: 12,
     textAlign: "center"
   },
   line: {
     height: 2,
     backgroundColor: "#EEEEEE",
     marginTop: 20,
     marginBottom: 30
   },
   btnWrapper: {
     flexDirection: "row",
     justifyContent: "space-between",
     alignItems: "center"
   },
   btn: {
     width: "48%"
   }
   
})









































