const fetchApi = async (url) => {
    
    try{
       let responce = await fetch(url)
       let responceJson =  await responce.json()
        // console.log('RESPONCE ->',responceJson);
        return responceJson;
    }
    catch(error){
       console.error(error);
      return error;

    }
}

export default fetchApi;