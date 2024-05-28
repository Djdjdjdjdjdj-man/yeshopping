<template>
    <div class="page-container">
      <van-nav-bar
        title="更多商品"
        class="category-list"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
      <div class="content">
        <van-sidebar v-model="currentIndex" class="menu">
          <van-sidebar-item
            v-for="(goods, index) in category"
            :key="index"
            :title="goods.name"
            :class="{ current: index === currentIndex }"
          />
        </van-sidebar>
        <div class="sub-category">
          <van-swipe-cell
            v-for="(goodss, index2) in currentSubCategory"
            :key="index2"
            right-width="110"
          >
            <van-card 
              :title="goodss.name" 
              :thumb="goodss.image" 
              class="sub-category-card"
            />
          </van-swipe-cell>
        </div>
      </div>
      <van-back-top />
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
  import { ref, computed, onMounted } from 'vue'
  import { useCategoryStore } from '@/stores/category'
  import { useShopcartStore } from '@/stores/shopcart'
  const shopcartStore = useShopcartStore()
  const totalNum = computed(() => shopcartStore.totalNum)
  
  const categoryStore = useCategoryStore()
  
  const category = computed(() => categoryStore.category)
  const currentIndex = ref(0)
  
  const fetchCategory = async () => {
    await categoryStore.initCategory()
  }
  
  onMounted(async () => {
    await fetchCategory()
    console.log(categoryStore.category)
  })
  
  const onClickLeft = () => history.back()

  
  const currentSubCategory = computed(() => {
    return category.value[currentIndex.value]?.sub || []
  })
  </script>
  
  <style lang="scss" scoped>
  .page-container {
    background-color: white;
    min-height: 100vh;
    padding: 0 10px;
  }
  
  .content {
    display: flex;
  }
  
  .menu {
    width: 30%;
    border-right: 1px solid #eee;
  }
  
  .category-card {
    margin-bottom: auto;
  }
  
  .sub-category {
    width: 70%;
    padding-left: 20px;
  }
  
  .sub-category-card {
    margin-bottom: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  
  .sub-category-card .van-card__thumb {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    overflow: hidden;
  }
  
  .delete-button {
    height: 100%;
  }
  
  .swipe-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .current {
    background-color: #f0f0f0;
    font-weight: bold;
  }
  </style>
  