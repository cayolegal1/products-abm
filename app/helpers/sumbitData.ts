import { Alert } from "react-native";

export const submitData =

    async (values : object, method : 'POST' | 'PUT', requestApi, navigator, id?: number) => {
            
    try { 
      
      const form : FormData = new FormData();

      Object.keys(values).forEach(key => {

        if(key === 'primaryImage') return form.append(key, values[key], 'image.png');

        form.append(key, values[key]);
      });
      
      /*En vez de esto
      form.append('code', values.code);
      form.append('name', values.name);
      form.append('description', values.description);
      form.append('currency', values.currency);
      form.append('price', values.price);
      form.append('state', values.state);
      form.append('primaryImage', values.primaryImage, 'image.png');  
      */
      
      let request;

      if(method === 'POST') {

          request = await requestApi.post('/products/', form);
          if(request.status === 201) Alert.alert('Product created', JSON.stringify(values));

    } else { 

        request = await requestApi.put(`/products/${id}/`, form);
        if(request.status === 200) Alert.alert('Product updated', JSON.stringify(values));
    }

    (request.status === 200 || request.status === 201) && navigator.navigate('Products');

    } catch(error) { 
      
      console.log(error.message);

      Alert.alert(`Product code '${values['code']}' already exists. Please provide another one.`)

    };
  }