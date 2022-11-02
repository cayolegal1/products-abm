import React from 'react';
import {View, ScrollView, TextInput, SafeAreaView, TextStyle, ViewStyle, Alert} from 'react-native';
import {Formik} from 'formik'
import { useNavigation } from '@react-navigation/native'
import {Picker} from '@react-native-picker/picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
import { color, spacing, typography } from '../../../theme';
import { Button } from '../../../components';
import axios from 'axios'

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

type FormProps = {

    stateProduct: any,
    setStateProduct: any
};

export const FormComponent = (props: FormProps) => {


  const navigation = useNavigation();

  const api = axios.create({

    baseURL: 'http://192.168.183.11:8000',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data'
    }
  });

  const openPhoneAssets = async (mode, formik) => {

    const options: any = {
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
     //@ts-ignore
     : await launchImageLibrary(options, (res) => {

        const imageInfo = {
          uri: res.assets[0].uri,
          type: res.assets[0].type,
          name: res.assets[0].fileName
        };
        formik.setFieldValue('primaryImage', imageInfo);
        console.log(imageInfo);
     });
  }

  const submitData = async (values) => {
            
    try {
      
      
      const form = new FormData();
      form.append('code', values.code);
      form.append('name', values.name);
      form.append('description', values.description);
      form.append('currency', values.currency);
      form.append('price', values.price);
      form.append('state', values.state);
      form.append('primaryImage', values.primaryImage, 'image.png');  


       console.log(JSON.stringify(form, null, 2))
       //const request = await api.post('/products/', {...values});
       const request = await api.post('/products/', form);
       console.log('request==========================')
       console.log(JSON.stringify(request, null, 2))

      if(request.status === 201) {

        Alert.alert('Product created', JSON.stringify(values));

        //@ts-ignore
        navigation.navigate('Products');
      }

      console.log(values)

    } catch(error) { 
      
      console.log(error.message);
      Alert.alert(`Product code '${values.code}' already exists. Please provide another one.`)
    
    };
  }
    
  return (

      <ScrollView>
        
        <Formik 
          initialValues={{code: '', name: '', description: '', currency: '', price: '', state: '', primaryImage: {}}}
          onSubmit={submitData}
        >
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

              <Picker style={PICKER} selectedValue={props.stateProduct} onValueChange={(item, index) => {

                props.setStateProduct(item)
                formikProps.setFieldValue('state', item)
                
                }} >
                <Picker.Item enabled={false} label='State of product' value={'State of the product'} />
                <Picker.Item enabled={true} label='In stock' value={'In stock'} />
                <Picker.Item label='Off stock' value={'Off stock'} />
              </Picker>

              <SafeAreaView style={ { marginTop: '3%' } }>
                <View style={FOOTER_CONTENT}>
                    <Button
                      testID="next-screen-button"
                      style={CONTINUE}
                      textStyle={CONTINUE_TEXT}
                      text='Open Camera'
                      onPress={() => openPhoneAssets('camera', formikProps)}
                    />
                </View>

                <View style={FOOTER_CONTENT}>
                    <Button
                      testID="next-screen-button"
                      style={CONTINUE}
                      textStyle={CONTINUE_TEXT}
                      text='Open Gallery'
                      onPress={() => openPhoneAssets('gallery', formikProps)}
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
      </ScrollView>
  )
}
