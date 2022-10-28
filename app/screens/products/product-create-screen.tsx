import { DrawerScreenProps } from '@react-navigation/drawer';
import React, {FC, useState, useContext} from 'react';
import {View, TextInput, ViewStyle, TextStyle} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { UserGlobalContext } from '../../models';
import {GradientBackground, Header} from '../../components';
import {NavigatorParamListDrawer} from '../../navigators';
import {spacing} from '../../theme';
import {ForbideScreen} from './for-bidden-screen'

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
const PICKER: ViewStyle = {

  ...INPUT,
  borderRadius: 10
};

export const CreateProductScreen: FC<DrawerScreenProps<NavigatorParamListDrawer, "Create">> = ({navigation}) => {

  const {user} = useContext(UserGlobalContext);

  const {is_admin} = user;

  const [stateProduct, setStateProduct] = useState('State of the product');

  const goBack = () => navigation.goBack();

  const goHome = () => {

    const route: any = 'welcome';
    return navigation.navigate(route)
  };

  const goLogin = () => {

    const route: any = 'login';
    return navigation.navigate(route);
  };

  const toggleDrawer = () => navigation.toggleDrawer();
  return (

    <View style={FULL}>

        <GradientBackground colors={["#422443", "#281b34"]} />

        <Header
          titleStyle={HEADER_TITLE}
          style={HEADER}
          headerText={is_admin ? 'Create a new Product' : 'Unauthorized'}
          leftIcon='navbar'
          onLeftPress={toggleDrawer}
        />

        { !is_admin 
        
           ?  ( <ForbideScreen goBack={goBack} goHome={goHome} goLogin={goLogin} /> ) 
            
           : (
              <>
                <TextInput 
                  editable 
                  placeholder='Code' 
                  style={INPUT}
                  onChangeText={name => console.log(name)}
                />

                <TextInput 
                  editable 
                  placeholder='Product Name' 
                  style={INPUT}
                  onChangeText={name => console.log(name)}
                />

                <TextInput 
                  editable 
                  multiline={true}
                  placeholder='Description' 
                  style={INPUT}
                  onChangeText={name => console.log(name)}
                />

                <TextInput 
                  editable 
                  placeholder='Currency' 
                  style={INPUT}
                  onChangeText={name => console.log(name.toUpperCase())}
                  maxLength={3}
                />

                <TextInput 
                  editable 
                  keyboardType='numeric'
                  placeholder='Price' 
                  style={INPUT}
                  onChangeText={name => console.log(name.toUpperCase())}
                  maxLength={3}
                />

                <Picker style={PICKER} selectedValue={stateProduct} onValueChange={(item, index) => setStateProduct(item)} >
                  <Picker.Item enabled={false} label='State of product' value={'State of the product'} />
                  <Picker.Item enabled={true} label='In stock' value={'En stock'} />
                  <Picker.Item label='Off stock' value={'Sin stock'} />
                </Picker>
              </>
            )
        }

    </View>
  )
}
