import {ViewStyle, TextStyle} from 'react-native';
import { color, spacing, typography } from '../../theme';


export const FULL: ViewStyle = { flex: 1, margin: 'auto' };
export const BOLD: TextStyle = { fontWeight: "bold" };
export const TEXT: TextStyle = {
    
    color: color.palette.white,
    fontFamily: typography.primary,
};
export const HEADER: TextStyle = {
    paddingTop: spacing[3],
    paddingBottom: spacing[4] + spacing[1],
    paddingHorizontal: 0,
};
export const HEADER_TITLE: TextStyle = {
    ...TEXT,
    ...BOLD,
    fontSize: 12,
    lineHeight: 15,
    textAlign: "center",
    letterSpacing: 1.5,
};
export const INPUT: TextStyle = {

    backgroundColor: 'white',
    borderRadius: 5,
    marginHorizontal: '5%',
    marginTop: '10%'
};
export const LOGIN_CONTENT: ViewStyle = {
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[4]
};
export const LOGIN: ViewStyle = {
    paddingVertical: spacing[4],
    backgroundColor: color.palette.deepPurple,
    marginTop: '5%',
};
export const LOGIN_TEXT: TextStyle = {
    ...TEXT,
    ...BOLD,
    fontSize: 13,
    letterSpacing: 2,
};

export const ERROR_TEXT: TextStyle = {

    ...TEXT,
    marginTop: '10%',
    textAlign: 'center'
};