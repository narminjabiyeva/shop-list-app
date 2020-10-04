import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { HomeStack } from "./HomeStack";
import {CustomDrawer} from "../components";

const { Navigator, Screen } = createDrawerNavigator();

export const RootNav = () => (
    <NavigationContainer>
      <Navigator drawerContent={(props) => <CustomDrawer {...props} />} > 
        <Screen name="HomeStack" component={HomeStack}/>
      </Navigator>
    </NavigationContainer>
  );
  