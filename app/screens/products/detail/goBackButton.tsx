import React from 'react';
import {SafeAreaView, View, ViewStyle, TextStyle} from 'react-native';
import {Button} from '../../../components';
import { color, spacing, typography } from '../../../theme';

const BOLD: TextStyle = { fontWeight: "bold" };
const TEXT: TextStyle = {
    
  color: color.palette.white,
  fontFamily: typography.primary,

};
const GO_BACK_CONTENT: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
};
const GO_BACK: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
};
const GO_BACK_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
};

type goBackButtonProps = {

  goBack: any
}

export const GoBackButton = ({goBack} : goBackButtonProps) => {
  return (
    <SafeAreaView>
        <View style={GO_BACK_CONTENT}>
            <Button
                testID="next-screen-button"
                style={GO_BACK}
                textStyle={GO_BACK_TEXT}
                text='Go Back to Products section'
                onPress={goBack}
            />
        </View>
    </SafeAreaView>
  )
}
