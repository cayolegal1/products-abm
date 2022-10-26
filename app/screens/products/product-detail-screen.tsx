import React, {FC} from 'react';
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { View, TextStyle, ViewStyle, TouchableOpacity, Image } from 'react-native';
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
const CONTAINER: ViewStyle = {

    backgroundColor: color.palette.deepPurple,
    paddingHorizontal: spacing[4],
};
const TEXT: TextStyle = {
    
    color: color.palette.white,
    fontFamily: typography.primary,
    marginLeft: '5%',
    textAlign: 'left'
};
const TEXT_PRODUCT: TextStyle = {

    ...TEXT, 
    marginTop: '10%'
}

const IMAGE_CONTAINER: ViewStyle = {

    justifyContent: 'center',
    alignItems: 'center'
}


export const ProductDetailScreen: FC<StackScreenProps<NavigatorParamList, "productDetail">> = observer(

    ({navigation, route}) => {

        const {name, price, currency, description, image} : any = route.params;

        const goBack = () => navigation.goBack();
        const logout = () => navigation.navigate('login');

        return(

            <View style={FULL}>
                
                <GradientBackground colors={["#422443", "#281b34"]} />

                <Header
                    headerTx="demoListScreen.title"
                    leftIcon="back"
                    headerText={`${name} details`}
                    onLeftPress={goBack}
                    style={HEADER}
                    titleStyle={HEADER_TITLE}
                    rightIcon="logout"
                    onRightPress={logout}
                />
                
                <TouchableOpacity style={IMAGE_CONTAINER}>
                    <Image
                        style={{
                        width: 300,
                        height: 300,
                        borderRadius: 10 
                        }}
                        source={{uri: image}}
                    />
                </TouchableOpacity>

                <Text text={`Description: ${description}`} style={TEXT_PRODUCT} />
                <Text text={`Actual price: ${price}`} style={TEXT_PRODUCT} />
                <Text text={`Currency: ${currency}`} style={TEXT_PRODUCT} />


            </View>
        )
    }
)