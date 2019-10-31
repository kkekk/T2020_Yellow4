var axios = require('axios')
var baseURL = "http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com"

export const httpClient = axios.create({
    baseURL: baseURL,
    timeout: 20000,
    headers: {
        common:{
            identity: "Group18",
            token: "806ba7f9-963a-4761-badd-3242f56552a3"
        }
        
    }
})

export const httpClientServer = axios.create({
    baseURL: "http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com",
    timeout: 20000,
})