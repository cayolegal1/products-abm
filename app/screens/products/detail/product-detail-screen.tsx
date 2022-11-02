import React, {FC, useContext, useState} from 'react';
import { View, ScrollView, Image, TextStyle, ViewStyle, ImageStyle, Alert } from 'react-native';
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite";
import { NavigatorParamList } from "../../../navigators"
import { UserGlobalContext } from '../../../models';
import { GoBackButton, ModalComponent } from '.';
import {Text, Header, GradientBackground} from '../../../components';
import { spacing, color, typography } from '../../../theme';

const FULL: ViewStyle = { flex: 1 };
const BOLD: TextStyle = { fontWeight: "bold" };
const HEADER: TextStyle = {
    paddingTop: spacing[4],
    paddingBottom: spacing[5] - 1,
    paddingHorizontal: 0,
};
const HEADER_TITLE: TextStyle = {
    ...BOLD,
    fontSize: 12,
    lineHeight: 15,
    textAlign: "center",
    letterSpacing: 1.5,
};
const TEXT: TextStyle = {
    
    color: color.palette.white,
    fontFamily: typography.primary,

};
const TEXT_PRODUCT: TextStyle = {

    ...TEXT, 
    marginTop: '10%',
    marginLeft: '5%',
    textAlign: 'left'
};
const IMAGE_CONTAINER: ViewStyle = {

    justifyContent: 'center',
    alignItems: 'center'
};
const IMAGE: ImageStyle = {

    width: 300,
    height: 300,
    borderRadius: 10 
};
const OTHER_IMAGES_TEXT: TextStyle = {


    ...TEXT, 
    fontWeight: 'bold',
    marginTop: '10%',
    textAlign: 'center'

};

export const ProductDetailScreen: FC<StackScreenProps<NavigatorParamList, "productDetail">> = observer(

    ({navigation, route}) => {

        const {user : {Is_user, is_admin}} = useContext(UserGlobalContext);

        const {id, code, name, price, currency, description, primaryImage, state} : any = route.params;

        const [modalVisible, setModalVisible] = useState(false);

        const goBack = () => navigation.goBack();

        const logout = () => navigation.navigate('login');

        const editNavigate = () => {
            
            const product: any = {
                id,
                code, 
                name, 
                description, 
                currency, 
                price: price.toString(), 
                state, 
                primaryImage
            };

            navigation.navigate('edit', product);
        };

        const showModal = () => setModalVisible(!modalVisible)

        return(

            <ScrollView style={FULL}>
                
                <GradientBackground colors={["#422443", "#281b34"]} />

                <Header
                    headerTx="demoListScreen.title"
                    leftIcon={is_admin ? 'edit' : 'back'}
                    headerText={`${name} details`}
                    onLeftPress={is_admin ? editNavigate : goBack}
                    style={HEADER}
                    titleStyle={HEADER_TITLE}
                    rightIcon={(Is_user) ? (is_admin) ? 'delete' : 'logout' : 'login'}
                    onRightPress={is_admin ? showModal : logout }
                />

                <ModalComponent 
                  modalVisible={modalVisible} 
                  setModalVisible={setModalVisible} 
                  id={id}
                  name={name} 
                />
                
                {is_admin && (<GoBackButton goBack={goBack} />)}

                <View style={IMAGE_CONTAINER}>
                    <Image
                      style={IMAGE}
                      source={{uri: primaryImage}}
                    />
                </View>

                <Text text={`Description: ${description}`} style={TEXT_PRODUCT} />
                <Text text={`Actual price: ${price}`} style={TEXT_PRODUCT} />
                <Text text={`Currency: ${currency}`} style={TEXT_PRODUCT} />

                {Is_user  && (<Text text={`State: ${state}`} style={TEXT_PRODUCT} />)}

                <Text text={`Other Images`} style={OTHER_IMAGES_TEXT} />

            </ScrollView>
        )
    }
)