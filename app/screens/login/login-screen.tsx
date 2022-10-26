import React, {FC, useState, useContext} from 'react';
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { View, TextStyle, ViewStyle, TextInput, Text } from 'react-native';
import { Header, GradientBackground, Button } from '../../components';
import { observer } from "mobx-react-lite";
import { color, typography, spacing } from '../../theme';
import { UserGlobalContext } from '../../models';

const FULL: ViewStyle = { flex: 1, margin: 'auto' };
const BOLD: TextStyle = { fontWeight: "bold" };
const TEXT: TextStyle = {
    
    color: color.palette.white,
    fontFamily: typography.primary,
};
const HEADER: TextStyle = {
    paddingTop: spacing[3],
    paddingBottom: spacing[4] + spacing[1],
    paddingHorizontal: 0,
};
const HEADER_TITLE: TextStyle = {
    ...TEXT,
    ...BOLD,
    fontSize: 12,
    lineHeight: 15,
    textAlign: "center",
    letterSpacing: 1.5,
};
const INPUT: TextStyle = {

    backgroundColor: 'white',
    borderRadius: 5,
    marginHorizontal: '5%',
    marginTop: '10%'
};
const LOGIN_CONTENT: ViewStyle = {
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[4]
};
const LOGIN: ViewStyle = {
    paddingVertical: spacing[4],
    backgroundColor: color.palette.deepPurple,
    marginTop: '5%',
};
const LOGIN_TEXT: TextStyle = {
    ...TEXT,
    ...BOLD,
    fontSize: 13,
    letterSpacing: 2,
};

const ERROR_TEXT: TextStyle = {

    ...TEXT,
    marginTop: '10%',
    textAlign: 'center'
};


export const LoginScreen: FC<StackScreenProps<NavigatorParamList, "login">> = observer(

    ({navigation}) => {

        const {user, setUser} : any = useContext(UserGlobalContext);

        const [error, setError] = useState({isError: false, message: ''});

        const paramInfo: any = {

            name: user.name,
            password: user.password
        };

        const customUsers = [

            {
                name: 'cayolegal',
                password: 'hola1606',
                is_admin: true
            },

            {
                name: 'guest',
                password: 'hola1606',
                is_admin: false
            },

            {
                name: 'olivio',
                password: 'admin123',
                is_admin: true
            }
        ];

        const Login = () => {

            if(user.name !== '' && user.password !== '') {

                if(customUsers.some(u => u.name === user.name && u.password === user.password)) 
                  return navigation.navigate('products', paramInfo);

                setUser({});
                setError({isError: true, message: 'Wrong username or password'});
                
            } else setError({isError: true, message: 'Please provide user and pasword to login'});

        }

        const goBack = () => navigation.goBack();

        const setErrorToFalse = () => setError({...error, isError: false})

        return(

            <View style={FULL}>
                
                <GradientBackground colors={["#422443", "#281b34"]} />

                <Header
                  headerText='Log into your account'
                  leftIcon="back"
                  onLeftPress={goBack}
                  style={HEADER}
                  titleStyle={HEADER_TITLE}
                />

                <TextInput 
                  editable 
                  placeholder='Username' 
                  style={INPUT}
                  value={user.name}
                  onPressIn={setErrorToFalse}
                  onChangeText={name => setUser({...user, name})}
                />

                <TextInput 
                  editable
                  placeholder='Password'
                  style={INPUT}
                  value={user.password}
                  onPressIn={setErrorToFalse}
                  secureTextEntry={true}
                  onChangeText={password => setUser({...user, password}) }
                />

                {error.isError && <Text style={ERROR_TEXT}>{error.message}</Text>}

                <View style={LOGIN_CONTENT}>
                    
                    <Button 
                    text='Login'
                    style={LOGIN}
                    textStyle={LOGIN_TEXT}
                    onPress={Login}
                    />

                </View>

            </View>
        )
    }
);