import React, { useState } from 'react';
import { Alert, View, SafeAreaView, TextInput, TextStyle, ViewStyle } from 'react-native';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native'
import { Picker } from '@react-native-picker/picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { Button } from '../../../components'
import { color, spacing, typography } from '../../../theme';

const BOLD: TextStyle = { 
  fontWeight: "bold" 
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
const CONTINUE: ViewStyle = {

  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: color.palette.deepPurple,
};
const TEXT: TextStyle = {

  color: color.palette.white,
  fontFamily: typography.primary,
  textAlign: 'center'
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

type EditProps = {

  id: number, 
  code: string, 
  name: string,
  description: string, 
  currency: string, 
  price: string, 
  state: string,
  primaryImage: string
};

export const EditFormComponent= ({id, code, name,  description, currency, price, state, primaryImage }: EditProps) => {
    
  const [stateProduct, setStateProduct] = useState(state);

  const navigation = useNavigation();

  const api = axios.create({

    baseURL: 'http://192.168.183.11:8000',
    headers: {

        'Content-Type': 'application/json'
    }
  });

  const openPhoneAssets = async (mode) => {

    let options: any = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    return mode.includes('camera')
     ? await launchCamera(options, (res) => console.log(res))
     : await launchImageLibrary(options, (res) => console.log(res));
  }

  return (
    
    <View>
        <Formik 
          initialValues={{code, name, description, currency, price, state, primaryImage: null}}
          onSubmit={async (values) => {
            
            try {
              
              const request = await api.put(`/products/${id}/`, {...values});

              if(request.status === 200) {

                Alert.alert('Product updated', JSON.stringify(values));

                navigation.navigate('Products');
              }

            } catch(error) {

              Alert.alert(error.message)
            }
            
        }} >

          {(formikProps) => (

            <>

              <TextInput 
               editable 
               placeholder='Code' 
               style={INPUT}
               value={formikProps.values.code}
               onChangeText={formikProps.handleChange('code')}
              />


              <TextInput 
               editable 
               placeholder='Product Name' 
               style={INPUT}
               value={formikProps.values.name}
               onChangeText={formikProps.handleChange('name')}
              />

              <TextInput 
                editable 
                multiline
                placeholder='Description' 
                style={INPUT}
                value={formikProps.values.description}
                onChangeText={formikProps.handleChange('description')}
              />

              <TextInput 
                editable 
                placeholder='Currency' 
                style={INPUT}
                value={formikProps.values.currency}
                onChangeText={formikProps.handleChange('currency')}
                maxLength={3}
              />

              <TextInput 
                editable 
                keyboardType='numeric'
                placeholder='Price' 
                style={INPUT}
                value={formikProps.values.price}
                onChangeText={formikProps.handleChange('price')}
                
              />

              <Picker style={PICKER} selectedValue={stateProduct} onValueChange={(item, index) => {

                setStateProduct(item)
                formikProps.setFieldValue('state', item)
                
              }}>

                <Picker.Item enabled={false} label='State of product' value={'State of the product'} />
                <Picker.Item enabled={true} label='In stock' value={'In stock'} />
                <Picker.Item label='Off stock' value={'Off stock'} />

              </Picker>

              <SafeAreaView style={{marginTop: '3%'}}>
                <View style={FOOTER_CONTENT}>
                    <Button
                      testID="next-screen-button"
                      style={CONTINUE}
                      textStyle={CONTINUE_TEXT}
                      text='Open Camera'
                      onPress={() => openPhoneAssets('camera')}
                    />
                </View>

                <View style={FOOTER_CONTENT}>
                  <Button
                    testID="next-screen-button"
                    style={CONTINUE}
                    textStyle={CONTINUE_TEXT}
                    text='Open Gallery'
                    onPress={() => openPhoneAssets('gallery')}
                  />
                </View>

                <View style={FOOTER_CONTENT}>
                  <Button
                    testID="next-screen-button"
                    style={CONTINUE}
                    textStyle={CONTINUE_TEXT}
                    text='Submit'
                    onPress={formikProps.submitForm}
                  />
                </View>

              </SafeAreaView>

            </>  
          )}

        </Formik>
    </View>
  )
}
