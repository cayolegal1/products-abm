import React, {FC, useContext} from 'react';
import { StackScreenProps } from "@react-navigation/stack"
import { View, ScrollView, Image, TextStyle, ViewStyle, ImageStyle } from 'react-native';
import { NavigatorParamList } from "../../navigators"
import { UserGlobalContext } from '../../models';
import {Text, Header, GradientBackground} from '../../components';
import { observer } from "mobx-react-lite";
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
}

const IMAGE_CONTAINER: ViewStyle = {

    justifyContent: 'center',
    alignItems: 'center'
}

const IMAGE: ImageStyle = {

    width: 300,
    height: 300,
    borderRadius: 10 
}

const OTHER_IMAGES_TEXT: TextStyle = {


    ...TEXT, 
    fontWeight: 'bold',
    marginTop: '10%',
    textAlign: 'center'

};

const OTHER_IMAGES: ImageStyle = {

    ...IMAGE, 
    margin: '7%'
}



export const ProductDetailScreen: FC<StackScreenProps<NavigatorParamList, "productDetail">> = observer(

    ({navigation, route}) => {

        const {user} = useContext(UserGlobalContext);
        const {is_user} = user
        const {name, price, currency, description, primaryImage, images, state} : any = route.params;

        const goBack = () => navigation.goBack();
        const logout = () => navigation.navigate('login');

        return(

            <ScrollView style={FULL}>
                
                <GradientBackground colors={["#422443", "#281b34"]} />

                <Header
                    headerTx="demoListScreen.title"
                    leftIcon="back"
                    headerText={`${name} details`}
                    onLeftPress={goBack}
                    style={HEADER}
                    titleStyle={HEADER_TITLE}
                    rightIcon={is_user ? 'logout' : 'login'}
                    onRightPress={logout}
                />
                
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

                {images.map(image => 

                    <View key={image} style={IMAGE_CONTAINER}>
                        <Image
                            style={OTHER_IMAGES}
                            source={{uri: image}}
                        />
                    </View>
                )}

            </ScrollView>
        )
    }
)