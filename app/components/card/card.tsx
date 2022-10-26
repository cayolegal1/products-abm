import { CardProps } from './card.props'
import React from 'react'
import { View, ViewStyle } from 'react-native'

const CARD : ViewStyle = {

    borderRadius: 6,
    elevation: 3, 
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2, 
    marginHorizontal: 4,
    marginVertical: 6,
    justifyContent: 'center',
    alignItems: 'center'
};
const CARD_CONTENT: ViewStyle = {

    margin: '5%'
};

export const Card = (props: CardProps) => {

  const {children} = props;

  return (
    <View style={CARD}>
        <View style={CARD_CONTENT}>
            {children}
        </View>
    </View>
  )
}
