import React, {FC, useContext} from 'react';
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { TextStyle, ViewStyle, Image, ScrollView, TouchableOpacity } from 'react-native';
import {Text, Header, GradientBackground, Card} from '../../components';
import { observer } from "mobx-react-lite";
import { spacing, color, typography } from '../../theme';
import { UserGlobalContext } from '../../models';

const FULL: ViewStyle = { flex: 1};
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
    textAlign: 'center'
};
const TEXT_USER: TextStyle = {

    ...TEXT, 
    fontSize: 20
};

const TEXT_PRODUCT: TextStyle = {

    ...TEXT, 
    marginTop: '3%'
};

const CARD: ViewStyle = {

    marginTop: '10%'
};


export const ProductListScreen: FC<StackScreenProps<NavigatorParamList, "products">> = observer(

    ({navigation, route}) => {

        const {setUser} : any = useContext(UserGlobalContext);
        
        const products = [

            {
                id: 1,
                name: 'PS4',
                price: 250,
                currency: 'USD',
                description: 'A console to play videogames',
                image: 'https://i.guim.co.uk/img/media/6e8ea77edb3da8c8e0714821229df7ed8c52383d/39_30_998_599/master/998.jpg?width=465&quality=85&dpr=1&s=none'
            },
            {
                id: 2,
                name: 'Iphone 14',
                price: 700,
                currency: 'EUR',
                description: 'A newest cellphone',
                image: "https://nissei.com/media/catalog/product/cache/16a9529cefd63504739dab4fc3414065/3/d/3d4a79a3-96dd-4176-a0bb-57603e7eec0a.jpg"
            }, 
            {
                id: 3,
                name: 'Desktop Ultimate Intel i9',
                price: 1000,
                currency: 'USD',
                description: 'Powerful computer with good components',
                image: 'https://i.pinimg.com/564x/22/7b/c6/227bc61adad08cdf08a3e37503ff286d.jpg'
            }
        ];

        const {name} : any = route.params;

        const goToProducDetail = (product) => { 

            const productDetail : any = { ...product }
            navigation.navigate("productDetail", productDetail) 
        }

        const goBack = () => navigation.goBack();
        const logout = () => {

            setUser({});
            navigation.navigate('login')
        };


        return(

            <ScrollView style={FULL}>
                
                <GradientBackground colors={["#422443", "#281b34"]} />

                <Header
                    headerTx="demoListScreen.title"
                    titleStyle={HEADER_TITLE}
                    style={HEADER}
                    leftIcon="back"
                    rightIcon="logout"
                    onLeftPress={goBack}
                    onRightPress={logout}
                />

                <Text text={`Welcome ${name}!`} style={TEXT_USER}/>

                {products.map((product) => 

                    <Card key={product.id}>

                        <TouchableOpacity onPress={() => goToProducDetail(product)}>
                            <Image
                              style={{
                                width: 300,
                                height: 300,
                                borderRadius: 10
                              }}
                              source={{uri: product.image}}
                            />
                        </TouchableOpacity>

                        <Text text={product.name} style={TEXT_PRODUCT} />

                    </Card>

                )}


            </ScrollView>
        )
    }
)