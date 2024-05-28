// axios
import request from '@/utils/axios'
//1. 获取轮播图片,get请求，无参数
export function getImgs(){
  return request({
    url:"/imglist",
    method:'get'
  });
}

//2. 获取商品分类，get请求，有参数
export function getGoodsList(data){
  return request({
    url:"/goodslist",
    method:'get',
    data:data
  })
}

//3. 用户登录，post请求，有参数
export function login(data) {
    return request({
      url: '/login',
      method: 'post',
      data:data
    })
}

export function register(data) {
  return request({
    url: '/register',
    method: 'post',
    data:data
  })
}

//4.验证用户是否登录
export function isLogin(){
  return request({
    url:'/user',
    method:'get'
  })
}

export function getCategory(){
  return request({
    url:'/category',
    method:'get'
  })
}

export function saveAddress(data) {
  return request({
    url: "/address/save",
    method: 'post',
    data:data
  });
}

export function getAddress(){
  return request({
    url:'/address',
    method:'get',
  })
}

export function delAddress(data) {
  return request({
    url: '/address/del',
    method: 'post',
    data:data
  })
}

export function getAddressById(id) {
  return request({
    url: `/address/${id}`,
    method: 'get',
  });
}

export function CreateOrder(data) {
  return request({
    url: 'order/create',
    method: 'post',
    data:data
  })
}

export function getOrder() {
  return request({
    url: 'order/list',
    method: 'get',
  })
}


export function getNews(){
  return request({
    url:'news/list',
    method:'get'
  })
}

export function getPhoto(){
  return request({
    url:'photo/getimgcategory',
    method:'get'
  })
}

export function getPhoto1(){
  return request({
    url:'photo/getimages',
    method:'get'
  })
}

//输出三个方法
export default {
  getImgs,
  getGoodsList,
  login,
  register,
  isLogin,
  getCategory,
  saveAddress,
  getAddress,
  delAddress,
  getAddressById,
  CreateOrder,
  getOrder,
  getNews,
  getPhoto,
  getPhoto1
}