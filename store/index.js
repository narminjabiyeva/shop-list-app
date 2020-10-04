import { createStore, combineReducers } from "redux";
import {  shopListReducer  } from "./lists"


const rootReducer = combineReducers({
    shopList: shopListReducer,
});

const store = createStore(rootReducer);

export default store;