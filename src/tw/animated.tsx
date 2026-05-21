import * as TW from "./index";
import RNAnimated from "react-native-reanimated";
import { Image } from "./image";

export const Animated = {
  ...RNAnimated,
  View: RNAnimated.createAnimatedComponent(TW.View),
  Text: RNAnimated.createAnimatedComponent(TW.Text),
  ScrollView: RNAnimated.createAnimatedComponent(TW.ScrollView),
  Image,
};
