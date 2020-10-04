import React, { useState } from "react";
import { connect } from "react-redux";
import { TouchableOpacity} from "react-native";

import { List ,ScreenLayOut,ModalWindow } from "../components";
import menuIcon from "../assets/menuIcon.png"
import { getSections,deleteList } from "../store/lists";

const mapStateToProps = (state) => ({
    sections: getSections(state)
  });

export const OneTimeListScreen = connect(mapStateToProps, {deleteList})(({deleteList,sections,navigation}) => {

    const [modal, setModal] = useState({
        show: false,
        id: ""
    })
    

    
    const section = sections.find((section) => section.name === "one time list");

    const deleteListHandler = (id) => {
          
        deleteList({
            sectionID: section.id,
            listID: id
        })
        closeModal();
    };

    const showModal = (id) => {
        setModal({
            show: true,
            id: id
        })
    };

    const closeModal = () => {
        setModal({
            show: false,
            id: ""
        })
    }

    return (
        <>
        <ScreenLayOut 
            title="One Time List"
            rightImg={menuIcon}
            onPressRight={() => navigation.toggleDrawer()}
            
         >
            {
                    section.list.map((list) => { 
                       
                       return <TouchableOpacity
                                  key={list.id}
                                  onPress={ () =>
                                               navigation.navigate("single list static",{
                                                   listID: list.id,
                                                   sectionID: section.id
                                               })
                                             }
                                  onLongPress={() => showModal(list.id)}           
                              >
                         <List list={list} oneTime={true}/>
                      </TouchableOpacity>                  
                     } )   
            }
        </ScreenLayOut>
        {
            modal.show ? <ModalWindow  delete={() => {deleteListHandler(modal.id)}} close={() => {closeModal()}} /> : null
        }
        </>
    );

})
