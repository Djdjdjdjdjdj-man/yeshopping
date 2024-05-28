import { createRouter,createWebHistory } from "vue-router"
import GoodsList from "@/components/GoodsList.vue"
import ShopCart from "@/components/ShopCart.vue"
import Login from "@/components/login.vue"
import Category from "@/components/Category.vue"
import Register from "@/components/register.vue"
import User from "@/components/User.vue"
import Address from "@/components/Address.vue"
import AddressEdit from "@/components/AddressEdit.vue"
import AddressEditt from "@/components/AddressEditt.vue"
import CreateOrder from "@/components/CreateOrder.vue"
import OrderList from "@/components/OrderList.vue"
import NewsList from "@/components/NewsList.vue"
import PhotoList from "@/components/PhotoList.vue" 

const routes=[
    {
        path:'',
        component:Login
    },
    {
        path:'/login',
        component:Login,
        name:'login'
    },
    {
        path:'/register',
        component:Register,
        name:'register'
    },
    {
        path:'/user',
        component:User,
        name:'user'
    },
    {
        path:'/NewsList',
        component:NewsList,
        name:'news_show'
    },
    {
        path:'/photolist',
        component:PhotoList,
        name:'photolist'
    },
    {
        parh:'/address',
        component:Address,
        name:'address'
    },
    {
        parh:'/addressedit',
        component:AddressEdit,
        name:'address_add'
    },
    {
        parh:'/addresseditt',
        component:AddressEditt,
        name:'address_edit'
    },
    {
        path:'/createorder',
        component:CreateOrder,
        name:'createorder'
    },
    {
        path:'/orderlist',
        component:OrderList,
        name:"orderlist"
    },
    {
        path:'/goodslist',
        component:GoodsList,
        name:'goodslist'
    },
    {
        path:'/shopcart',
        component:ShopCart,
        name:'shopcart'
    },
    {
        path:'/category',
        component:Category,
        name:'category'
    }
]

const router = createRouter({
    history:createWebHistory(),
    routes
})

export default router