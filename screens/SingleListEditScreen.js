import React, {useState} from "react";
import { View, StyleSheet, FlatList, TouchableOpacity,TextInput } from "react-native";
import { connect } from "react-redux";

import { ScreenLayOut, CustomText,ListItem, CustomBtn} from "../components"
import saveImg from "../assets/save.png"
import backArrow from "../assets/backArrow.png"
import { deleteItem, addItem } from "../store/lists"


const mapStateToProps = (state) => ({
    sections: state.shopList.sections,
  });

export const SingleListEditScreen =  connect(mapStateToProps,{deleteItem, addItem})(
  ({deleteItem, 
    route,
    sections,
    navigation,
    addItem}) => {

      const [fields,setFields] = useState({
        name: "",
        count: 0,
        measurement: "pkg"
      })

      const {
         params: { sectionID, listID },
      } = route;

      const list = sections.find((section) => section.id === sectionID)?.list.find((list) => list.id === listID);

      const deleteListItem = (id) => {
        deleteItem({
          sectionID,
          listID,
          itemID: id
        })
      };

      const handleFieldChange = (name, value) => {
        setFields((fields) => ({
          ...fields,
          [name]: value,
        }));
      };

      const addToList = () => {
        if (fields.name.trim() !== '' && fields.count !== 0) {
          addItem({
          sectionID,
          listID,
          fields
        });
        }
      
        
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
                <TextInput 
                  style={styles.positionFields}
                  value={fields.name}
                  onChangeText={(value) => handleFieldChange("name", value)}
                />
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
           <CustomBtn title="ADD TO LIST" onPress={() => { addToList()}}/>
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
                   itemID : item.id
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
     fontWeight: "bold"
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
   }
   
})









































