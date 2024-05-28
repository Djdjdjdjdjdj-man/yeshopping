<template>
  <div class="member">
    <div class="header-con">
      <router-link :to="{ name: 'login' }" class="mui-navigate-right">
        <div class="user-info">
          <div class="avatar-con">
            <div>
              <img src="/public/1.jpg" alt="Avatar" class="avatar">
            </div>
          </div>
          <div class="user-name">
            <span>用户登录</span>
          </div>
        </div>
      </router-link>
    </div>

    <div class="menu-items">
      <router-link :to="{ name: 'address' }" class="menu-item mui-navigate-right">
        <div class="mui-media-body">收货地址</div>
      </router-link>
      <router-link :to="{ name: 'orderlist' }" class="menu-item mui-navigate-right">
        <div class="mui-media-body">订单查询</div>
      </router-link>
      <router-link :to="{ name: 'news_show' }" class="menu-item mui-navigate-right">
        <div class="mui-media-body">新闻资讯</div>
      </router-link>
      <router-link :to="{ name: 'photolist' }" class="menu-item mui-navigate-right">
        <div class="mui-media-body">图片分享</div>
      </router-link>
      <div @click="logout" class="menu-item logout-btn mui-navigate-right">
        <div class="mui-media-body">退出登录</div>
      </div>
    </div>

    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" name="goodslist">
        <router-link to="/goodslist">商品列表</router-link>
      </van-tabbar-item>
      <van-tabbar-item icon="more-o" name="category">
        <router-link to="/category">商品分类</router-link>
      </van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" name="shopcart" :badge="totalNum">
        <router-link to="/shopcart">购物车</router-link>
      </van-tabbar-item>
      <van-tabbar-item icon="user-o" name="user">
        <router-link to="/user">我的</router-link>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';
import { useShopcartStore } from '@/stores/shopcart';

const shopcartStore = useShopcartStore();
const totalNum = computed(() => shopcartStore.totalNum);

const router = useRouter();
const active = ref('user');

function logout() {
  Cookies.remove('token');
  alert("成功退出");
}
</script>

<style lang="scss" scoped>
.member {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f9f9f9;
}

.header-con {
  background-color: #ffffff;
  padding: 16px;
  border-bottom: 1px solid #ebebeb;
}

.user-info {
  display: flex;
  align-items: center;
}

.avatar-con {
  margin-right: 12px;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #d8d8d8;
}

.user-name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.menu-items {
  flex: 1;
  background-color: #ffffff;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #ebebeb;
  color: #333;
  text-decoration: none;
}

.menu-item:hover {
  background-color: #f0f0f0;
}

.logout-btn {
  cursor: pointer;
  color: #e74c3c;
}

.van-tabbar {
  border-top: 1px solid #ebebeb;
}
</style>
