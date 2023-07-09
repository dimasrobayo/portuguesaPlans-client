import React, { useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import useViewModel from  './ViewModel';
import { StackScreenProps } from '@react-navigation/stack';
import { ProductStackParamList } from '../../../../Navigator/AdminProductNavigator';
import { AdminProductListItem } from './Item';

interface Props extends StackScreenProps<ProductStackParamList, 'AdminProductListScreen'>{};

export default function AdminProductListScreen({navigation, route}: Props) {
    const {category} = route.params;
    const {products, getProducts, deleteProduct} = useViewModel();

    useEffect(() => {
      if (category.id !== undefined) {
        getProducts(category.id!);
      }
    }, [])

    return (
        <View style={{backgroundColor: 'white'}}>
          <FlatList
            data={ products }
            keyExtractor={(item) => item.id!}
            renderItem={ ({item}) => <AdminProductListItem product={item} remove={ deleteProduct } category={category} /> }
          />
        </View>
    )
}