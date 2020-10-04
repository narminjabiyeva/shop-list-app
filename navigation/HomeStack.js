import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { OneTimeListScreen,
  SingleListStaticScreen,
  RegularListScreen,
  NewListScreen,
  SingleItemEditScreen,
  SingleListEditScreen,
  UserSettingsScreen} from "../screens";

const { Navigator, Screen } = createStackNavigator();

export const HomeStack = () => (
  <Navigator headerMode ="none">
    <Screen name="one time list" component={OneTimeListScreen} />
    <Screen name="regular list" component={RegularListScreen} />
    <Screen name="new list" component={NewListScreen} />
    <Screen name="single item edit" component={SingleItemEditScreen} />
    <Screen name="single list static" component={SingleListStaticScreen} />
    <Screen name="single list edit" component={SingleListEditScreen} />
    <Screen name="user settings" component={UserSettingsScreen} />

  </Navigator>
);
