import { Alert, Button, Text, View } from 'react-native'
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker'

// компонент для вибору або зйомки фото
const ImagePicker = () => {

    const [cameraPermissionInformation, requestPermission] = useCameraPermissions()

    // перевірка дозволів на камеру
    const verifyPermissions = async () => {
        // дозвіл для камери не запитується, якщо він вже є
        if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission()
            return permissionResponse.granted
        }

        // якщо дозвіл відхилений, виводимо повідомлення
        if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert(
                'Insufficient permissions!',
                'You need to grant camera permissions to use this app.'
            )
            return false
        }

        return true
    }

    // функція для зйомки фото
    const takeImageHandler = async () => {
        const hasPermission = await verifyPermissions()

        if (!hasPermission) {
            return
        }

        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        })
        console.log('image', image)
    }

    return (
        <View>
            <Text>ImagePicker</Text>
            <View>

            </View>
            <Button title="Take Image" onPress={takeImageHandler}/>
        </View>
    )
}

export default ImagePicker