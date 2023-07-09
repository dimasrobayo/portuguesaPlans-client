import React, { useEffect } from 'react'
import { FlatList, Text, ToastAndroid, View } from 'react-native'
import { AdminPlansListItem } from './Item';
import useViewModel from './ViewModel';

export const AdminPlansListScreen = () => {
  const {categories, responseMessage, getCategories, deleteCategory} = useViewModel();

  useEffect(() => {
    console.log('CAMBIO EL ESTADO DE LA CATEGORIA');
  }, [categories])
  
  useEffect(() => {
    if (responseMessage !== '') {
      ToastAndroid.show(responseMessage, ToastAndroid.LONG);
    }
  }, [responseMessage])

  return (
    <View style={{ backgroundColor: 'white' }}>
      <FlatList
        data={ categories }
        keyExtractor={ (item) => item.id! }
        renderItem={ ({item}) =>  <AdminPlansListItem category={item} remove={deleteCategory} />}
      />
    </View>
  )
}
