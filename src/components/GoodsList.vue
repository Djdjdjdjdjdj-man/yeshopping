<template>
  
  <div class="page-container">
    <van-list>
      <van-nav-bar
        title="商品列表"
        class="goods-list"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />

      <van-swipe class="my-swipe" autoplay="3000">
        <van-swipe-item v-for="item in imgArr" :key="item">
          <img :src="item.img" class="swipe-image" />
        </van-swipe-item>
      </van-swipe>

      <van-swipe-cell
        v-for="(goods, index) in goodsList"
        :key="index"
        right-width="110"
      >
        <van-card
          :num="goods.num"
          tag="new"
          :price="goods.price"
          :desc="goods.sell_point"
          :title="goods.name"
          :thumb="goods.image"
          class="goods-card"
        />
        <template #right>
          <van-button
            square
            text="加入购物车"
            type="primary"
            class="add-to-cart-button"
            @click="addToCart(goods)"
          />
        </template>
      </van-swipe-cell>
      <van-back-top />
    </van-list>
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
import { onMounted, computed } from 'vue'
import { showNotify } from 'vant'
import { useGoodsListStore } from '@/stores/goodslist'
import { useShopcartStore } from '@/stores/shopcart'
import { useGetImgs } from '@/stores/getImgs'

const totalNum = computed(() => shopcartStore.totalNum)

const getImgsStore = useGetImgs()
const imgArr = computed(() => getImgsStore.imgArr)
const fetchGetImgs = async () => {
  await getImgsStore.initgetImgs()
}
onMounted(async () => {
  await fetchGetImgs()
  console.log(getImgsStore.imgArr)
})

const goodsListStore = useGoodsListStore()
const shopcartStore = useShopcartStore()

const goodsList = computed(() => goodsListStore.goodslist)

const fetchGoodsList = async () => {
  await goodsListStore.initGoodslist()
}

onMounted(async () => {
  await fetchGoodsList()
  console.log(goodsListStore.goodslist)
  const shopcart = JSON.parse(localStorage.getItem("shopcart"))
  if (shopcart) {
    shopcartStore.initShopCart(shopcart)
  }
})

const addToCart = (goods) => {
  shopcartStore.add(goods)
  showNotify({ type: 'success', message: '添加成功'})
}

const onClickLeft = () => history.back()
</script>

<style lang="scss" scoped>
.page-container {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 10px;
}

.goods-list {
  background-color: #fff;
  padding: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin-bottom: 20px;
}

.my-swipe {
  margin-bottom: 20px;
}

.goods-card {
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.add-to-cart-button {
  height: 100%;
  background-color: #ff7043;
  border: none;
  border-radius: 10px;
  margin-left: 5px;
}

.swipe-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}
</style>
