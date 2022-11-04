import React from 'react';
import {View, ScrollView, TextInput, SafeAreaView, TextStyle, ViewStyle, ImageStyle, Image, TouchableOpacity} from 'react-native';
import {Formik} from 'formik'
import { useNavigation } from '@react-navigation/native'
import {Picker} from '@react-native-picker/picker';
import { Button, Text } from '../../../components';
import {submitData, openPhoneAssets, api} from '../../../helpers';
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
    paddingHorizontal: spacing[5],
};
const PREVIEW_CONTAINER : ViewStyle = {

  justifyContent: 'center'
};
const PREVIEW : ViewStyle = {

  marginLeft: '38%',
  marginTop: '5%'
};
const IMAGE: ImageStyle = {

  width: 100,
  height: 100,
  borderRadius: 10,
};
const OTHER_PREVIEW_CONTAINER : ViewStyle = {


  ...PREVIEW_CONTAINER,
  marginBottom: '2%',
  flexDirection: 'row',
  flexWrap: 'wrap'
};

const OTHER_IMAGES_PREVIEW : ViewStyle = {

  marginLeft: '5%',
  marginTop: '5%'
}


type FormProps = {

    stateProduct: any,
    setStateProduct: any
};

export const FormComponent = (props: FormProps) => {

  const navigation = useNavigation();
  
  const initialValues = {
    code: '1881818181',
    name: 'kkkk', 
    description: 'llll', 
    currency: 'pyg', 
    price: '202002', 
    state: 'In stock', 
    primaryImage: {},
    images: []
  };

  const Submit = async (values, {resetForm}) => {

    console.log(JSON.stringify(values.primaryImage, null, 2));

    await submitData(values, 'POST', api, navigation);

    resetForm({values: ''});
  }

  const deletePreview = (formik) => formik.setFieldValue('primaryImage', {});


  return (

      <ScrollView>
        
        <Formik 
          initialValues={initialValues}
          onSubmit={Submit}
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
              }}>
                <Picker.Item enabled={false} label='State of product' value={'State of the product'} />
                <Picker.Item enabled={true} label='In stock' value={'In stock'} />
                <Picker.Item label='Off stock' value={'Off stock'} />

              </Picker>

              <SafeAreaView style={ { marginTop: '5%'} }>

                
                <View style={{flexDirection:'row'}}>

                  <View style={FOOTER_CONTENT}>
                      <Button
                        testID="next-screen-button"
                        style={CONTINUE}
                        textStyle={CONTINUE_TEXT}
                        text='Open Camera'
                        onPress={() => openPhoneAssets('camera', formikProps, 'primary')}
                      />
                  </View>

                  <View style={FOOTER_CONTENT}>
                      <Button
                        testID="next-screen-button"
                        style={CONTINUE}
                        textStyle={CONTINUE_TEXT}
                        text='Open Gallery'
                        onPress={() => openPhoneAssets('gallery', formikProps, 'primary')}
                      />
                  </View>
                  

                </View>

                {!formikProps?.values?.primaryImage?.uri && (
                  <Text text='Set your Product primary Image' style={[TEXT, {textAlign: 'center', fontSize: 12}]}/>
                )}

                {(formikProps?.values?.primaryImage?.uri) && (
                
                  <View style={[PREVIEW_CONTAINER]}>
                    <TouchableOpacity 
                      onLongPress={ () => deletePreview(formikProps)}
                      style={PREVIEW}
                    >
                      <Image 
                        source={{uri: formikProps.values.primaryImage.uri}}
                        style={IMAGE}
                      />

                    </TouchableOpacity>
                  </View>
                )}

              </SafeAreaView>
              

              <SafeAreaView style={ { marginTop: '5%'} }>

                <View style={{flexDirection:'row'}}>

                  <View style={FOOTER_CONTENT}>
                      <Button
                        testID="next-screen-button"
                        style={CONTINUE}
                        textStyle={CONTINUE_TEXT}
                        text='Open Camera'
                        onPress={() => openPhoneAssets('camera', formikProps, 'others')}
                      />
                  </View>

                  <View style={FOOTER_CONTENT}>
                      <Button
                        testID="next-screen-button"
                        style={CONTINUE}
                        textStyle={CONTINUE_TEXT}
                        text='Open Gallery'
                        onPress={() => openPhoneAssets('gallery', formikProps, 'others')}
                      />
                  </View>

                  
                </View>

                <Text text='Set your other Product Images' style={[TEXT, {textAlign: 'center', fontSize: 12}]}/>

                {(formikProps?.values?.images.length > 0) && 
                  
                  ( 
                  
                    <View style={[OTHER_PREVIEW_CONTAINER]}>

                      {formikProps.values.images.map(img => (

                          <TouchableOpacity 
                           onLongPress={ () => deletePreview(formikProps)}
                           style={OTHER_IMAGES_PREVIEW}
                           key={img.uri}
                          >
                            <Image 
                              source={{uri: img.uri}}
                              style={IMAGE}
                            />

                          </TouchableOpacity>

                      ))}
                      
                    </View>
                  ) 
                }

              </SafeAreaView>

              <View style={[FOOTER_CONTENT, {marginTop: '3%'}]}>
                  <Button
                    testID="next-screen-button"
                    style={CONTINUE}
                    textStyle={CONTINUE_TEXT}
                    text='Submit'
                    onPress={formikProps.submitForm}
                  />
              </View>
            </>  
          )}

        </Formik>
      </ScrollView>
  )
}
