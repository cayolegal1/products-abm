import React, {FC} from 'react';
import { ViewStyle, TextStyle} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import {GradientBackground, Header} from '../../../components';
import {NavigatorParamList} from '../../../navigators';
import { EditFormComponent } from './edit-form';
import {spacing} from '../../../theme';
import { ScrollView } from 'react-native-gesture-handler';

const FULL: ViewStyle = { flex: 1 };
const BOLD: TextStyle = { 
  fontWeight: "bold" 
};
const HEADER: TextStyle = {
  paddingTop: spacing[4],
  paddingBottom: spacing[5] - 1,
  marginRight: '10%'
};
const HEADER_TITLE: TextStyle = {
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
};

export const EditProductScreen: FC<StackScreenProps<NavigatorParamList, "edit">> = ({navigation, route}) => {

  const { id, code, name, description, currency, price, state, primaryImage} : any = route.params;

  const product = {
    id,
    code,
    name,
    description, 
    currency, 
    price, 
    state,
    primaryImage
  };

  const goBack = () => navigation.goBack();

  return (

    <ScrollView style={FULL}>

        <GradientBackground colors={["#422443", "#281b34"]} />

        <Header
          titleStyle={HEADER_TITLE}
          style={HEADER}
          headerText={'Edit this product'}
          leftIcon='back'
          onLeftPress={() => goBack()}
        />
            
        <EditFormComponent {...product}/> 

    </ScrollView>
  )
}