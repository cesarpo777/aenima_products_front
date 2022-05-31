

export const fetchApi = ( endpoint, data ,method ='GET' ) =>{
    
    let baseurl = process.env.REACT_APP_API_URL;
    let url = `${baseurl}/${endpoint}`

    if( method === 'GET'){
        return fetch(url)
    }else{
        return fetch(url,{
            method,
            headers:{
              'Content-Type': 'application/json'
            },
            body: JSON.stringify( data )
        })
    }

}
