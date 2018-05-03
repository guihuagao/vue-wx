
import axios from 'axios'

/*axios配置*/
axios.defaults.timeout=5000;

axios.defaults.headers={'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'};

axios.defaults.withCredentials=true;

axios.defaults.baseURL = '';


/*http拦截器*/
axios.interceptors.request.use(function (config) {

  /*除了上传图片接口，其他接口加上随机数*/
  if(config.url.indexOf('fileUpload')==-1){
    config.url=config.url+'?'+new Date().getTime();
  }

  return config
}, function(err) {
  return Promise.reject(err)
})

axios.interceptors.response.use(
  response=>{
    if(response.data){
     /* console.log(response.data)*/
    }
    return response;
  },
  error => {
    return Promise.reject(error.response.data);
  }
);

export  default {



}
