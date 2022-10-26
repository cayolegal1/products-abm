import { StyleProp, TextStyle, TouchableOpacityProps, ViewStyle } from "react-native"

export interface CardProps extends TouchableOpacityProps {

  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string

  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>

  /**
   * An optional style override useful for the button text.
   */
  textStyle?: StyleProp<TextStyle>

  /**
   * One of the different types of text presets.
   */
  children?: React.ReactNode

}
