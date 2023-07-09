import React, { useEffect, useState } from 'react'
import styles from './Styles';
import { 
    ActivityIndicator, 
    Image, 
    SafeAreaView, 
    ScrollView, 
    ToastAndroid,
    Platform,
    Text, 
    TouchableOpacity,
    View 
} from 'react-native'
import { CustomTextInput } from '../../../../Components/CustomTextInput';
import useViewModel from './ViewModel';
import { RoundedButton } from '../../../../Components/RoundedButton';
import { MyColor, MyStyle } from '../../../../theme/AppTheme';
import { StackScreenProps } from '@react-navigation/stack';
import { UserStackParamList } from '../../../../Navigator/UserStackNavigator';

interface Props extends StackScreenProps<UserStackParamList, 'ClientAddressCreateScreen'>{};

export const ClientAddressCreateScreen = ({navigation, route}: Props) => {
    const [modalVisible, setModalVisible] = useState(false);
    
    const {
        address, 
        neighborhood, 
        referencePoint, 
        responseMessage, 
        loading,
        onChange,
        onChangeRefPoint,
        createAddress,
    } = useViewModel()

    useEffect(() => {
        if (route.params?.refPoint) {
          onChangeRefPoint(route.params?.refPoint, route.params?.latitude, route.params?.longitude);
        }
    }, [route.params?.refPoint])

    useEffect(() => {
        if(Platform.OS == 'android' && responseMessage){
            ToastAndroid.show(responseMessage, ToastAndroid.LONG)
        }else{
            
        }
    }, [responseMessage])

    return (
        <SafeAreaView style={styles.container}>
            <View style= { styles.logoContainer }>
                <TouchableOpacity onPress={ () => setModalVisible(true) }>
                    <Image 
                        source={ require('../../../../../../assets/image/map.png') }
                        style={ styles.logoImage }
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.form}>
                <ScrollView>
                    <Text style={ styles.formText }>NUEVA DIRECCIÓN</Text>

                    <CustomTextInput 
                        placeholder='Dirección'
                        image={ require('../../../../../../assets/image/location.png')}
                        keyboardType='default'
                        value={address}
                        onChangeText={ onChange }
                        property='address'
                    />

                    <CustomTextInput 
                        placeholder='Barrio'
                        image={ require('../../../../../../assets/image/neighborhood.png')}
                        keyboardType='default'
                        value={neighborhood}
                        onChangeText={ onChange }
                        property='neighborhood'
                    />
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ClientAddressMapScreen')}
                    >
                        <CustomTextInput 
                            placeholder='Punto de Referencia'
                            image={ require('../../../../../../assets/image/map.png')}
                            keyboardType='default'
                            value={referencePoint}
                            onChangeText={ onChange }
                            property='referencePoint'
                            editable={ false }
                        />
                    </TouchableOpacity>

                    <View style={{ marginTop: 30 }}>
                        <RoundedButton 
                            text='CREAR DIRECCIÓN'
                            onPress={ () => createAddress() }
                        />
                    </View>
                </ScrollView>
            </View>
            
            {
                loading ?
                    <ActivityIndicator 
                        style={MyStyle.loading} 
                        size="large" 
                        color={MyColor.primary} 
                    />
                :
                    <View></View>
            }
        </SafeAreaView>
    )
}
