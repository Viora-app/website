import { redirect } from "next/navigation";

export {default as Text} from "./Text";
export {default as View} from "./View";
export {default as ScrollView} from "./ScrollView";
export {default as TextInput} from "./TextInput";
export {default as Image} from "./Image";
export {default as ActivityIndicator} from "./ActivityIndicator";
export {default as ImageBackground} from "./ImageBackground";
export * from "./Touchable";

export const Linking = {
  openURL: (url: string) => redirect(url),
};

export const Dimensions = {
  get: () => ({
    height: '800px',
    width: '600px',
  }),
};

export interface ViewStyle {}
export interface StyleProp<Type> {
  (arg: Type): Type;
}
export interface InputModeOptions {}