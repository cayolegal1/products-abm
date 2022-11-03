import React, {FC, useContext, useState, useCallback} from 'react';
import { View, ScrollView, Image, TextStyle, ViewStyle, ImageStyle } from 'react-native';
import { StackScreenProps } from "@react-navigation/stack"
import { useFocusEffect } from '@react-navigation/native';
import { observer } from "mobx-react-lite";
import { NavigatorParamList } from "../../../navigators"
import { UserGlobalContext } from '../../../models';
import { GoBackButton, ModalComponent } from '.';
import {Text, Header, GradientBackground} from '../../../components';
import { spacing, color, typography } from '../../../theme';
import {api} from '../../../helpers';

const FULL: ViewStyle = { flex: 1, height: '100%' };
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
const OTHER_IMAGES_CONTAINER : ViewStyle = {

    ...IMAGE_CONTAINER,
    marginVertical: '5%'

}

export const ProductDetailScreen: FC<StackScreenProps<NavigatorParamList, "productDetail">> = observer(

    ({navigation, route}) => {

        const {user : {is_user, is_staff}} = useContext(UserGlobalContext);

        const {id, code, name, price, currency, description, primaryImage, state} : any = route.params;

        const [images, setImages] = useState([]);

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

        const getImages = async () => {

            const {data} : any = await api.get(`/products/images/${id}`);
            const imagesResponse = data.results.map(img => img.image);
            setImages(imagesResponse);
        }

        useFocusEffect(useCallback(() => {

            getImages();

        }, []))

        return(

            <ScrollView style={FULL}>
                
                <GradientBackground colors={["#422443", "#281b34"]} />

                <Header
                    headerTx="demoListScreen.title"
                    leftIcon={is_staff ? 'edit' : 'back'}
                    headerText={`${name} details`}
                    onLeftPress={is_staff ? editNavigate : goBack}
                    style={HEADER}
                    titleStyle={HEADER_TITLE}
                    rightIcon={(is_user) ? (is_staff) ? 'delete' : 'logout' : 'login'}
                    onRightPress={is_staff ? showModal : logout }
                />

                <ModalComponent 
                  modalVisible={modalVisible} 
                  setModalVisible={setModalVisible} 
                  id={id}
                  name={name} 
                />
                
                {is_staff && (<GoBackButton goBack={goBack} />)}

                <View style={IMAGE_CONTAINER}>
                    <Image
                      style={IMAGE}
                      source={{uri: primaryImage}}
                    />
                </View>

                <Text text={`Description: ${description}`} style={TEXT_PRODUCT} />
                <Text text={`Actual price: ${price}`} style={TEXT_PRODUCT} />
                <Text text={`Currency: ${currency}`} style={TEXT_PRODUCT} />

                {is_user  && (<Text text={`State: ${state}`} style={TEXT_PRODUCT} />)}

                <Text text={`Other Images`} style={OTHER_IMAGES_TEXT} />

                {images.map(img => (

                    <View style={OTHER_IMAGES_CONTAINER} key={img}>
                        <Image
                          style={IMAGE}
                          source={{uri: img}}
                        />
                    </View>
                ))}

            </ScrollView>
        )
    }
)