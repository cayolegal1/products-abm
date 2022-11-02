import React, {FC, useState, useContext} from 'react';
import {View, ViewStyle, TextStyle} from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { UserGlobalContext } from '../../../models';
import {GradientBackground, Header} from '../../../components';
import {ForbideScreen, FormComponent} from '.'
import {NavigatorParamListDrawer} from '../../../navigators';
import {spacing} from '../../../theme';

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
const INPUT: TextStyle = {

  backgroundColor: 'white',
  borderRadius: 5,
  marginHorizontal: '5%',
  marginTop: '10%'
};

export const CreateProductScreen: FC<DrawerScreenProps<NavigatorParamListDrawer, "Create">> = ({navigation}) => {

  const [stateProduct, setStateProduct] = useState('State of the product');

  const {user} = useContext(UserGlobalContext);

  const {is_staff} = user;

  const goBack = () => navigation.goBack();

  const navigateTo = (route: any) => navigation.navigate(route);

  const toggleDrawer = () => navigation.toggleDrawer();

  return (

    <View style={FULL}>

        <GradientBackground colors={["#422443", "#281b34"]} />

        <Header
          titleStyle={HEADER_TITLE}
          style={HEADER}
          headerText={is_staff ? 'Create a new Product' : 'Unauthorized'}
          leftIcon='navbar'
          onLeftPress={toggleDrawer}
        />

        { !is_staff 
        
           ?  ( <ForbideScreen navigateTo={navigateTo} goBack={goBack} /> ) 
            
           : ( <FormComponent stateProduct={stateProduct} setStateProduct={setStateProduct} /> )
        }

    </View>
  )
}
