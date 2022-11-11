import { Alert, PermissionsAndroid } from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

export const openPhoneAssets = async (mode, formik, attribute?) => {
    

    let options: any = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };


    if(mode.includes('camera')) {

      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "App Camera Permission",
          message:"App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      )

      return granted === PermissionsAndroid.RESULTS.GRANTED && 

          await launchCamera(options, (res) => {


            if(res.didCancel) return console.log('Asset cancel')
            if(res.errorCode) return Alert.alert(res.errorCode)
            if(res.errorMessage) return Alert.alert(res.errorMessage)

            const imageInfo = {
              uri: res.assets[0].uri,
              type: res.assets[0].type,
              name: res.assets[0].fileName
            };
    
            return attribute === 'primary' 
            ? formik.setFieldValue('primaryImage', imageInfo)
            : formik.setFieldValue('images', [imageInfo, ...formik.values.images])
          }
        );
    }

     return await launchImageLibrary(options, (res) => {

        if(res.didCancel) return console.log('Asset cancel')
        if(res.errorCode) return Alert.alert(res.errorCode)
        if(res.errorMessage) return Alert.alert(res.errorMessage)

        const imageInfo  = {
          uri: res.assets[0].uri,
          type: res.assets[0].type,
          name: res.assets[0].fileName
        }; 

        return attribute === 'primary' 
        ? formik.setFieldValue('primaryImage', imageInfo)
        : formik.setFieldValue('images', [imageInfo, ...formik.values.images])
      }

    )
  }