import React from 'react';
import {View, ScrollView, TextInput, SafeAreaView, TextStyle, ViewStyle} from 'react-native';
import {Formik} from 'formik'
import { useNavigation } from '@react-navigation/native'
import {Picker} from '@react-native-picker/picker';
import { Button } from '../../../components';
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
    paddingHorizontal: spacing[4],
};

type FormProps = {

    stateProduct: any,
    setStateProduct: any
};

export const FormComponent = (props: FormProps) => {
  
  const navigation = useNavigation();
  
  const initialValues = {
    code: '',
    name: '', 
    description: '', 
    currency: '', 
    price: '', 
    state: '', 
    primaryImage: {}
  };

  const Submit = async (values, {resetForm}) => {

    await submitData(values, 'POST', api, navigation);
    resetForm({values: ''});
  }

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
