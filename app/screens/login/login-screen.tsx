import React, {FC, useState, useContext} from 'react';
import { StackScreenProps } from "@react-navigation/stack";
import { NavigatorParamList } from "../../navigators";
import { View, TextInput, Text } from 'react-native';
import { Header, GradientBackground, Button } from '../../components';
import { observer } from "mobx-react-lite";
import { UserGlobalContext } from '../../models';
import {FULL, HEADER, HEADER_TITLE, INPUT, LOGIN_CONTENT, LOGIN, ERROR_TEXT, LOGIN_TEXT} from './styles'
import { api } from '../../helpers';

export const LoginScreen: FC<StackScreenProps<NavigatorParamList, "login">> = observer(

    ({navigation}) => {

        const {user, setUser} : any = useContext(UserGlobalContext);

        const [error, setError] = useState({isError: false, message: ''});

        const Login = async () => {

            if(user.name !== '' && user.password !== '') {
                
                try {

                    const {data} = await api.post('/login/', {
    
                        username: user.name,
                        password: user.password
                    });
                    
                    if(data) {

                        setUser(data)
                        return navigation.navigate('productList');
                    }

                    setUser({});
                    setError({isError: true, message: 'Wrong username or password'})

                } catch(error) {

                    setUser({});
                    setError({isError: true, message: 'Wrong username or password'});
                }
                
            } else setError({isError: true, message: 'Please provide user and pasword to login'});

        }

        const goBack = () => navigation.navigate('welcome');

        const setErrorToFalse = () => setError({message: '', isError: false})

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