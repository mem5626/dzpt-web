import {request} from './request'

 const testServer =   {
    getTestData(params){
        return request({
            method: 'Get',
            url:'testApi',
            params:params
        })
    }
}
export default  testServer
