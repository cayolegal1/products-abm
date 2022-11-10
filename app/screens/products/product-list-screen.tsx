import React, {FC, useContext, useEffect, useState, useCallback} from 'react';
import {DrawerScreenProps} from '@react-navigation/drawer';
import { TextStyle, ViewStyle, Image, ScrollView, TouchableOpacity, ImageStyle, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { observer } from "mobx-react-lite";
import {Text, Header, GradientBackground, Card} from '../../components';
import { UserGlobalContext } from '../../models';
import { NavigatorParamListDrawer } from '../../navigators';
import { spacing, color, typography } from '../../theme';
import {api} from '../../helpers';

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

export const ProductListScreen: FC<DrawerScreenProps<NavigatorParamListDrawer, "Products">> = observer(

    ({navigation}) => {
        
        const [products, setProducts] = useState([]);

        //@ts-ignore
        const {user: {name, is_user}, setUser} : any = useContext(UserGlobalContext);   

        const goToProductDetail = (product) => { 

            const productDetail : any = { ...product };

            //@ts-ignore
            navigation.navigate("productDetail", productDetail);
        }

        const logoutAction = () => {

            setUser({});

            const route: any = 'login';

            navigation.navigate(route)
        };

        const loginNavigateAction = () => {

            const route : any = 'login';
            navigation.navigate(route);
        }
        
        const renderProducts = () => (
            
            products.map((product : any) => 

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

        const toggleDrawer = () => navigation.toggleDrawer();

        const setData = () => api.get('/products/')
                              .then(({data}) => setProducts(data.results))
                              .catch(error => Alert.alert(error.message)); 

        useFocusEffect(useCallback(() => {

            setData()
            
        }, []));

        return(

            <ScrollView style={FULL}>
                
                <GradientBackground colors={["#422443", "#281b34"]} />

                <Header
                  titleStyle={HEADER_TITLE}
                  style={HEADER}
                  rightIcon={(is_user) ? 'logout' : 'login'}
                  leftIcon={is_user && 'navbar'}
                  onLeftPress={toggleDrawer}
                  onRightPress={(is_user) ? logoutAction : loginNavigateAction }
                  headerText='Products section'
                />

                {(is_user) && (<Text text={`Welcome ${name}!`} style={TEXT_USER} />)}

                {renderProducts()}

            </ScrollView>
        )
    }
)