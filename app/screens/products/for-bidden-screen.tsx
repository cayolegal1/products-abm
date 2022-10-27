import React from 'react';
import {View, ViewStyle, TextStyle, SafeAreaView} from 'react-native';
import { Text, Button} from '../../components';
import {color, spacing, typography} from '../../theme';

const BOLD: TextStyle = { 
    fontWeight: "bold" 
};
const TEXT: TextStyle = {

    color: color.palette.white,
    fontFamily: typography.primary,
    textAlign: 'center'
};
const ERROR_TEXT: TextStyle = {

    ...TEXT, 
    marginTop: '5%'
};
const CONTINUE: ViewStyle = {

    paddingVertical: spacing[4],
    paddingHorizontal: spacing[4],
    backgroundColor: color.palette.deepPurple,
};
const CONTINUE_TEXT: TextStyle = {

    ...TEXT,
    ...BOLD,
    fontSize: 13,
    letterSpacing: 2,
};
const FOOTER_CONTENT: ViewStyle = {

    paddingVertical: spacing[4],
    paddingHorizontal: spacing[4],
};

type ForbideProps = {

    goBack: any, 
    goHome?: any,
    goLogin?: any
}

export const ForbideScreen = (props: ForbideProps) => {
 
  return (
    <View>

        <Text 
          style={ERROR_TEXT} 
          text='You do not have permissions for this. ' 
        />

        <Text 
          style={ERROR_TEXT} 
          text='Please contact to the admin for perform this action'
        />

        <SafeAreaView style={{marginTop: '3%'}}>

            <View style={FOOTER_CONTENT}>
                <Button
                  testID="next-screen-button"
                  style={CONTINUE}
                  textStyle={CONTINUE_TEXT}
                  text='Log with another account'
                  onPress={props.goLogin}
                />
            </View>

            <View style={FOOTER_CONTENT}>
                <Button
                  testID="next-screen-button"
                  style={CONTINUE}
                  textStyle={CONTINUE_TEXT}
                  text='Go back'
                  onPress={props.goBack}
                />
            </View>

            <View style={FOOTER_CONTENT}>
                <Button
                  testID="next-screen-button"
                  style={CONTINUE}
                  textStyle={CONTINUE_TEXT}
                  text='Go Home'
                  onPress={props.goHome}
                />
            </View>

        </SafeAreaView>
    
  </View>
  )
}
