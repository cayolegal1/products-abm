import React from 'react';
import { View, Modal, ViewStyle, Pressable, Text, TextStyle, Alert } from 'react-native';
import {useNavigation} from '@react-navigation/native'
import axios from 'axios';
import { color } from '../../../theme';

const MODAL_CONTAINER : ViewStyle = {

    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.palette.lightGrey,
    opacity: 0.5
};
const BUTTON : ViewStyle = {

    borderRadius: 20,
    padding: 10,
    elevation: 2
};
const MODAL_TEXT : TextStyle = {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: "center",
    color: 'white'
};

const BUTTONS_CONTAINER : ViewStyle = {

    flexDirection: 'row',
    justifyContent: 'space-around'
};
const BUTTON_DELETE : ViewStyle = {

    backgroundColor: "red",
};
const BUTTON_OMMIT : ViewStyle = {

    backgroundColor: '#2196F3'
};
const TEXT_STYLE : TextStyle =  {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: '10%'
};
type ModalProps = {

    id?: number,
    name: string,
    modalVisible: any, 
    setModalVisible: any
};

export const ModalComponent = ({modalVisible, setModalVisible, id, name} : ModalProps) => {

    const navigation = useNavigation();

    const deleteProduct = async () => {

        const requestDelete = await axios({

            baseURL: `http://192.168.183.11:8000/products/${id}/`,
            method: 'DELETE'
        });

        if(requestDelete.status === 204) {

            Alert.alert(`Product ${name} deleted successfully!`)
            navigation.goBack();
        }
    };
  return (
    <View style={MODAL_CONTAINER}>

        <Modal 
          animationType='slide'
          transparent
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible) }
        >

            <View style={MODAL_CONTAINER}>

                <Text style={MODAL_TEXT}>Are you sure to delete this product?</Text>
                
                <View style={BUTTONS_CONTAINER}>

                    <Pressable
                      style={[BUTTON, BUTTON_DELETE]}
                      onPress={deleteProduct}
                    >
                        <Text style={TEXT_STYLE}>Yes</Text>

                    </Pressable>

                    <Pressable
                      style={[BUTTON, BUTTON_OMMIT]}
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                        <Text style={TEXT_STYLE}>No</Text>
                        
                    </Pressable>

                </View>
            </View>
        </Modal>

    </View>
  )
}
