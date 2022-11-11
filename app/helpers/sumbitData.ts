import { Alert } from "react-native"

export const submitData = async (
  values: object,
  method: "POST" | "PUT",
  requestApi,
  navigator,
  id?: number,
) => {
  try {

  const form: FormData = new FormData()

  Object.keys(values).forEach((key) => {

    if(key !== 'images' ) {

      if (key === "primaryImage" && values[key] .name)
        return form.append(key, values[key], "image.png")

      form.append(key, values[key])

    }
  })


  if (method === "POST") {

    requestApi.post('products/', form)
    .then(res => {
      console.log(res)
      if(res.status === 201) {
        const imagesForm = new FormData();

        //@ts-ignore
        values.images.map((img, key) => imagesForm.append(`${key}_image`, img, 'images.png'));
        imagesForm.append('productId', res.data.id);

        requestApi.post('/upload_images/', imagesForm)
        .then(imgRes => {

          if(imgRes.status === 201) {
            Alert.alert(`Product ${values['name']} created`);
            return navigator.navigate('Products');
          }

        }).catch(error => console.log(error));
      }
    })
    .catch(error => Alert.alert(error));

  } else {

    requestApi.put(`/products/${id}`, form)
    .then(res => {

      if(res.status === 200) {
        Alert.alert("Product updated", JSON.stringify(values));
        return navigator.navigate('Products')
      }
      
    }).catch(error => Alert.alert(error));

  }

  } catch(error) {
    console.log(error, error.message);
    Alert.alert(error)
  };
}
