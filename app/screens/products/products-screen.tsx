import React, {FC, useContext} from 'react';
import { StackScreenProps } from "@react-navigation/stack"
import { TextStyle, ViewStyle, Image, ScrollView, TouchableOpacity, ImageStyle } from 'react-native';
import { observer } from "mobx-react-lite";
import {Text, Header, GradientBackground, Card} from '../../components';
import { UserGlobalContext } from '../../models';
import { NavigatorParamList } from "../../navigators"
import {products} from './data'
import { spacing, color, typography } from '../../theme';

const FULL: ViewStyle = { 
    flex: 1
};
const BOLD: TextStyle = { 
    fontWeight: "bold" 
};
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
    textAlign: 'center'
};
const TEXT_USER: TextStyle = {

    ...TEXT, 
    fontSize: 20
};
const TEXT_PRODUCT: TextStyle = {

    ...TEXT, 
    marginTop: '3%',
};
const IMAGE: ImageStyle = {

    width: 300,
    height: 300,
    borderRadius: 10
};

export const ProductListScreen: FC<StackScreenProps<NavigatorParamList, "products">> = observer(

    ({navigation, route}) => {

        const {setUser} : any = useContext(UserGlobalContext);

        const {name} : any = route.params;

        const goToProductDetail = (product) => { 

            const productDetail : any = { ...product }
            navigation.navigate("productDetail", productDetail) 
        };

        const logout = () => {
            
            setUser({});
            navigation.navigate('login')
        };
        
        const renderProducts = () => (
            
            products.map((product) => 

                <Card key={product.id}>

                    <TouchableOpacity onPress={() => goToProductDetail(product)}>
                        <Image
                         style={IMAGE}
                         source={{uri: product.primaryImage}}
                        />
                    </TouchableOpacity>

                    <Text text={product.name} style={TEXT_PRODUCT} />

                </Card>
            )   
        );

        return(

            <ScrollView style={FULL}>
                
                <GradientBackground colors={["#422443", "#281b34"]} />

                <Header
                  headerTx="demoListScreen.title"
                  titleStyle={HEADER_TITLE}
                  style={HEADER}
                  rightIcon="logout"
                  onRightPress={logout}
                />

                <Text text={`Welcome ${name}!`} style={TEXT_USER}/>

                {renderProducts()}

            </ScrollView>
        )
    }
)