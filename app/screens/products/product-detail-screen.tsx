import React, {FC, useContext} from 'react';
import { View, ScrollView, Image, TextStyle, ViewStyle, ImageStyle, SafeAreaView, Alert } from 'react-native';
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite";
import axios from 'axios';
import { NavigatorParamList } from "../../navigators"
import { UserGlobalContext } from '../../models';
import {Text, Header, GradientBackground, Button} from '../../components';
import { spacing, color, typography } from '../../theme';

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
const GO_BACK_CONTENT: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
};
const GO_BACK: ViewStyle = {
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[4],
};
const GO_BACK_TEXT: TextStyle = {
    ...TEXT,
    ...BOLD,
    fontSize: 13,
    letterSpacing: 2,
};


export const ProductDetailScreen: FC<StackScreenProps<NavigatorParamList, "productDetail">> = observer(

    ({navigation, route}) => {

        const {user} = useContext(UserGlobalContext);
        const {Is_user, is_admin} = user
        const {id, code, name, price, currency, description, primaryImage, state} : any = route.params;

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

        const deleteProduct = async () => {

            const requestDelete = await axios({

                baseURL: `http://192.168.183.11:8000/products/${id}/`,
                method: 'DELETE'
            });

            if(requestDelete.status === 204) {

                Alert.alert(`${name} product deleted successfully!`)
                navigation.goBack();
            }
        };

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
                    onRightPress={is_admin ? deleteProduct : logout }
                />
                
                {is_admin && 
                    (
                        <SafeAreaView>
                            <View style={GO_BACK_CONTENT}>
                                <Button
                                  testID="next-screen-button"
                                  style={GO_BACK}
                                  textStyle={GO_BACK_TEXT}
                                  text='Go Back to Products section'
                                  onPress={goBack}
                                />
                            </View>
                        </SafeAreaView>
                    )}

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