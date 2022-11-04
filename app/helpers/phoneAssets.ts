import { PermissionsAndroid } from "react-native";
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

            const imageInfo = {
              uri: res.assets[0].uri,
              type: res.assets[0].type,
              name: res.assets[0].fileName
            };
    
            attribute === 'primary' 
            ? formik.setFieldValue('primaryImage', imageInfo)
            : formik.setFieldValue('images', [imageInfo, ...formik.values.images])
          }
        );
    }

     return await launchImageLibrary(options, (res) => {

        const imageInfo = {
          uri: res.assets[0].uri,
          type: res.assets[0].type,
          name: res.assets[0].fileName
        };

        attribute === 'primary' 
        ? formik.setFieldValue('primaryImage', imageInfo)
        : formik.setFieldValue('images', [imageInfo, ...formik.values.images])
        console.log(formik.values.images)
      }

    )
  }