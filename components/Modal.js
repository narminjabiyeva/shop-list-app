import React  from 'react';
import {
    Modal,
    StyleSheet,
    View
} from 'react-native';

import {CustomBtn,CustomText} from "../components"

export const ModalWindow = (props) => {
    
    return(
        <View style={styles.wrapper}>
          <Modal  transparent={true} animationType="fade" style={{height: "100%"}}>
            <View style={styles.container}>
               <View style={styles.card}>
                    <CustomText weight="bold" >Do you want to delete this list?</CustomText>
            
                    <View style={styles.btnWrapper}>
                        <CustomBtn style={styles.btn} title="delete"  onPress={props.delete}/>
                        <CustomBtn style={styles.btn} title="cancel"  onPress={props.close} />
                    </View>

                </View>
            </View>
          </Modal>
      </View>
    );
    
};


const styles = StyleSheet.create({
    wrapper: {
      position: "absolute",
      top:"40%",
      left: "15%"
    },
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    card: {
      width: 300,
      padding: 30,
      backgroundColor: "white",
      alignItems: "center",
    },
    btnWrapper: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 20
    },
    btn: {
        width: "45%"
    }
  });
  