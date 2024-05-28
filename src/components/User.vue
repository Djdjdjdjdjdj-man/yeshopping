<template>
  <div class="member">
    <div class="header-con">
      <router-link :to="{ name: 'login' }" class="mui-navigate-right">
        <div class="user-info">
          <div class="avatar-con">
            <div class="avatar">
            </div>
          </div>
          <div>
            <span>用户登录</span>
          </div>
        </div>
      </router-link>
    </div>
    <router-link :to="{ name: 'address' }" class="mui-navigate-right">
      <div class="mui-media-body">收货地址</div>
    </router-link>
    <router-link :to="{ name: 'orderlist' }" class="mui-navigate-right">
      <div class="mui-media-body">订单查询</div>
    </router-link>
    <div @click="logout" class="logout-btn" >
      <img class="mui-media-object mui-pull-left">
      <div class="mui-media-body">退出登录</div>
    </div>
    <router-link :to="{ name: 'news_show' }" class="title">
      <div class="mui-media-body">新闻资讯</div>
    </router-link>
    <router-link :to="{ name: 'photolist' }" class="title">
      <div class="mui-media-body">图片分享</div>
    </router-link>
  </div>
  <van-tabbar>
      <van-tabbar-item icon="home-o" name="goodslist">
          <router-link to="/goodslist">商品列表</router-link>
      </van-tabbar-item>
      <van-tabbar-item icon="more-o" name="category">
          <router-link to="/category">商品分类</router-link>
      </van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" name="shopcart" :badge=" totalNum ">
          <router-link to="/shopcart">购物车</router-link>
      </van-tabbar-item>
      <van-tabbar-item icon="user-o" name="user">
          <router-link to="/user">我的</router-link>
      </van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';
import { useShopcartStore } from '@/stores/shopcart'
const shopcartStore = useShopcartStore()
const totalNum = computed(() => shopcartStore.totalNum)

const router = useRouter();

function logout() {
  Cookies.remove('token');
  alert("成功退出")
}
</script>

<style lang="scss" scoped>
.logout-btn {
  cursor: pointer;
  color: lightgreen;
}
</style>
