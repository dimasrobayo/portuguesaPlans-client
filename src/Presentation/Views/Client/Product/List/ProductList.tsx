import { StackScreenProps } from '@react-navigation/stack'
import React, { useEffect } from 'react'
import { UserStackParamList } from '../../../../Navigator/UserStackNavigator'
import { Text, View } from 'react-native'
import useViewModel from './ViewModel'
import { FlatList } from 'react-native-gesture-handler'
import { ClientProductList } from './Item'

interface Props extends StackScreenProps<UserStackParamList, 'ClientProductListScreen'>{};

export const ClientProductListScreen = ({navigation, route}: Props) => {
  const {products, getProducts} = useViewModel()
  const { idCategory } = route.params;

  useEffect(() => {
    getProducts(idCategory);
  }, [])

  return (
    <View>
      <FlatList
        data={ products}
        keyExtractor={item => item.id!}
        renderItem={({item}) => <ClientProductList product={item} navigation={navigation} />}
      />
    </View>
  )
}
