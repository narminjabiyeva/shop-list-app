const ADD_LIST = "ADD_LIST";
const TOGGLE_ITEM = "TOGGLE_ITEM";
const RESET_ALL_ITEMS = "RESET_ALL_ITEMS";
const DELETE_ITEM = "DELETE_ITEM";
const ADD_ITEM = "ADD_ITEM";
const UPDATE_ITEM = "UPDATE_ITEM";
const DELETE_LİST = "DELETE_LİST"
const ADD_USER = "ADD_USER"

const MODULE_NAME = "shopList";
export const getSections = state => state[MODULE_NAME].sections;
export const getUser = state => state[MODULE_NAME].user;

const initialState = {

    user: 
    {
      name: "username",
      img: ""
    }  ,
   
    sections: [
        {
            id: `${Math.random()}${Date.now()}`,
            name: "one time list",
            list: [
                {
                    id: `${Math.random()}${Date.now()}`,
                    name: "everything for breakfast",
                    items: [
                        {
                            id: `${Math.random()}${Date.now()}`,
                            name: "pasta",
                            count: 2,
                            measurement: "pkg",
                            bought: true
                        },
                        {
                            id: `${Math.random()}${Date.now()}`,
                            name: "tomatoes",
                            count: 1,
                            measurement: "kg",
                            bought: true
                        }
                    ]
                },
                {
                    id: `${Math.random()}${Date.now()}`,
                    name: "everything for breakfast",
                    items: [
                        {
                            id: `${Math.random()}${Date.now()}`,
                            name: "pasta",
                            count: 2,
                            measurement: "pkg",
                            bought: true
                        },
                        {
                            id: `${Math.random()}${Date.now()}`,
                            name: "tomatoes",
                            count: 1,
                            measurement: "kg",
                            bought: false
                        }
                    ]
                }
            ]

        },
        {
            id: `${Math.random()}${Date.now()}`,
            name: "regular list",
            list: [
                {
                    id: `${Math.random()}${Date.now()}`,
                    name: "everything for dinner",
                    items: [
                        {
                            id: `${Math.random()}${Date.now()}`,
                            name: "milk",
                            count: 2,
                            measurement: "litre",
                            bought: true
                        },
                        {
                            id: `${Math.random()}${Date.now()}`,
                            name: "cheese",
                            count: 4,
                            measurement: "kg",
                            bought: true
                        }
                    ]
                }
            ]

        }
    ]
};

export function shopListReducer (state = initialState,{type,payload}) {
    switch(type) {
        case ADD_LIST:
        
            const updatedState = { ...state };
            updatedState.sections = [...updatedState.sections];
            const indexOfSection = updatedState.sections.findIndex(
                (section) => section.name === payload.section
            );
            
            updatedState.sections[indexOfSection] = {
                ...updatedState.sections[indexOfSection],
                list: [
                  ...updatedState.sections[indexOfSection].list,
                  {
                    id: `${Math.random()}${Date.now()}`,
                    name: payload.name,
                    done: false,
                    items: []
                  },
                ],
              };

            return updatedState;
    
        case DELETE_LİST:
          return {
            ...state,
            sections: state.sections.map((section) => {
              if (section.id === payload.sectionID) {
                return {
                  ...section,
                  list: section.list.filter(
                    (list) => list.id !==payload.listID
                  )
                };
              }
              return section;
            }),
          };
          
              
        case TOGGLE_ITEM:
            return {
                ...state,
                sections: state.sections.map((section) => {
                  if (section.id === payload.sectionID) {
                    return {
                      ...section,
                      list: section.list.map((list) => {
                        if (list.id === payload.listID) {
                          return {
                            ...list,
                            items: list.items.map((item) => {
                              if (item.id === payload.itemID) {
                                return {
                                  ...item,
                                  bought: !item.bought,
                                };
                              }
                              return item;
                            }),
                          };
                        }
                        return list;
                      }),
                    };
                  }
                  return section;
                }),
              };
        
        case RESET_ALL_ITEMS:
            return {
                ...state,
                sections: state.sections.map((section) => {
                  if (section.id === payload.sectionID) {
                    return {
                      ...section,
                      list: section.list.map((list) => {
                        if (list.id === payload.listID) {
                          return {
                            ...list,
                            items: list.items.map((item) => {
                                if (item.bought === true) {
                                    return {
                                      ...item,
                                      bought: false,
                                    };
                              }
                              return item;
                            }),
                          };
                        }
                        return list;
                      }),
                    };
                  }
                  return section;
                }),
             };

        case DELETE_ITEM:
          return {
            ...state,
            sections: state.sections.map((section) => {
              if (section.id === payload.sectionID) {
                return {
                  ...section,
                  list: section.list.map((list) => {
                    if (list.id === payload.listID) {
                      return {
                        ...list,
                        items: list.items.filter(
                          (item) => item.id !== payload.itemID
                        ),
                      };
                    }
                    return list;
                  }),
                };
              }
              return section;
            }),
          };

        case ADD_ITEM:
          return {
            ...state,
            sections: state.sections.map((section) => {
              if (section.id === payload.sectionID) {
                return {
                  ...section,
                  list: section.list.map((list) => {
                    if (list.id === payload.listID) {
                      return {
                        ...list,
                        items: [
                          ...list.items,
                          {
                            id: `${Math.random()}${Date.now()}`,
                            name: payload.fields.name,
                            count: payload.fields.count,
                            measurement: payload.fields.measurement,
                            bought: false
                          },
                        ],
                      };
                    }
                    return list;
                  }),
                };
              }
              return section;
            }),
          };

        case UPDATE_ITEM:
          return {
            ...state,
            sections: state.sections.map((section) => {
              if (section.id === payload.sectionID) {
                return {
                  ...section,
                  list: section.list.map((list) => {
                    if (list.id === payload.listID) {
                      return {
                        ...list,
                        items: list.items.map((item) => {
                          if (item.id === payload.itemID) {
                            return {
                              ...item,
                              count: payload.fields.count,
                              measurement: payload.fields.measurement,
                            };
                          }
                          return item;
                        }),
                      };
                    }
                    return list;
                  }),
                };
              }
              return section;
            }),
          };

        case ADD_USER:
          return {
              ...state,
              user : {
                  name: payload.name,
                  img: payload.img
              }
          }

        
        default:
            return state;

    }
}


export const addList = (payload) => ({
    type: ADD_LIST,
    payload
});
export const toggleItem = (payload) => ({
    type: TOGGLE_ITEM,
    payload
})
export const resetAllItems = (payload) => ({
    type: RESET_ALL_ITEMS,
    payload
})
export const deleteItem = (payload) => ({
  type: DELETE_ITEM,
  payload
})
export const addItem = (payload) => ({
  type: ADD_ITEM,
  payload
})
export const updateItem = (payload) => ({
  type: UPDATE_ITEM,
  payload
})
export const deleteList = (payload) => ({
  type: DELETE_LİST,
  payload
})

export const addUser = (payload) => ({
  type: ADD_USER,
  payload
});