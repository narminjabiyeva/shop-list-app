import * as Font from "expo-font"

import MontserratRegular from "../assets/fonts/Montserrat-Regular.ttf"
import MontserratMedium from "../assets/fonts/Montserrat-Medium.ttf"
import MontserratBold from "../assets/fonts/Montserrat-Bold.ttf"
import {loadAsync} from "expo-font";

export const loadFonts = () => {
return Font.loadAsync({
        MontserratRegular,
        MontserratMedium,
        MontserratBold
        }
        )
};