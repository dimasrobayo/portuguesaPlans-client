import { StackScreenProps } from '@react-navigation/stack';
import React from 'react'
import { Dimensions, FlatList, Text, View } from 'react-native'
import { RootStackParamList } from '../../Navigator/MainStackNavigator';
import { RolesItem } from './Item';
import useViewModel from './ViewModel'

interface Props extends StackScreenProps<RootStackParamList, 'Roles'>{};

export const  Roles = ({navigation, route}: Props) => {
    const { user } = useViewModel();
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;

    return (
        <View style={{flex: 1}}>
            <FlatList 
                data={user?.roles}
                renderItem={ ({item}) => <RolesItem rol={item} height= {420} width={width}  navigation={navigation} /> }
                keyExtractor={ (item) => item.id}
                horizontal={true}
            />
        </View>
    )
}

export default Roles
