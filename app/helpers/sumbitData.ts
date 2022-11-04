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

    if(key !== 'images') {

      if (key === "primaryImage" && values[key] .name)
        return form.append(key, values[key], "image.png")
      
      form.append(key, values[key])

    }
  })

  /*En vez de esto

      form.append('code', values.code);
      form.append('name', values.name);
      form.append('description', values.description);
      form.append('currency', values.currency);
      form.append('price', values.price);
      form.append('state', values.state);
      form.append('primaryImage', values.primaryImage, 'image.png');  
      */

  //@ts-ignore
 
  let productRequest

  if (method === "POST") {

    productRequest = await requestApi.post("/products/", form)

    if (productRequest.status === 201) {

        let imagesForm =  new FormData()

        //@ts-ignore
        values.images.map((img, key) => imagesForm.append(`${key}_image`, img, 'images.png'))

        imagesForm.append(`productId`, productRequest.data.id)
        
        const imagesRequest = await requestApi.post("test/", imagesForm)

        if(imagesRequest.status === 201) {
  
          Alert.alert('Product created', `Product ${values['name']} was successfully created`)
        }
    } 

  } else {

    productRequest = await requestApi.put(`/products/${id}/`, form)
    if (productRequest.status === 200) Alert.alert("Product updated", JSON.stringify(values))
  }
  (productRequest.status === 200 || productRequest.status === 201) && navigator.navigate("Products")

  } catch(error) {

    console.log(error, error.message);

    //Alert.alert(`Product code '${values['code']}' already exists. Please provide another one.`)
    Alert.alert(error)

  };
}
