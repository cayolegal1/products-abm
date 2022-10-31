import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {CreateProductScreen, ProductListScreen, DrawerScreen} from '../screens';


export type NavigatorParamListDrawer = {

  Products: undefined
  Create: undefined
};

const Drawer = createDrawerNavigator<NavigatorParamListDrawer>();

export const LateralMenu = () => {

  return (

    <Drawer.Navigator initialRouteName='Products'
     /*drawerContent={(props) => <DrawerScreen  props={props}/> }*/ 
     screenOptions={{
      headerShown: false,
    }}>

      <Drawer.Screen name='Products' component={ProductListScreen} />
      <Drawer.Screen name='Create' component={CreateProductScreen} />
      
    </Drawer.Navigator>  
  );
}