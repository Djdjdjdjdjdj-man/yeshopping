<template>
  <div class="page-container">
    <van-list>
      <van-nav-bar
        title="购物车"
        class="goods-list"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
      <div v-if="items.length > 0">
        <van-swipe-cell
          v-for="(goods, index) in items"
          :key="index"
          right-width="130"
          class="swipe-cell"
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
              text="增加"
              type="primary"
              class="cart-button"
              @click="add(goods)"
            />
            <van-button
              square
              text="减少"
              type="danger"
              class="cart-button"
              @click="sub(goods)"
            />
          </template>
        </van-swipe-cell>
        <div class="total-price-section">
        <van-cell style="border-radius: 10px;">商品总价为：{{ totalPrice }}</van-cell>
        <van-button type="primary" @click="checkout">结算</van-button>

        </div>
      </div>
      <van-cell v-else>购物车中暂无商品</van-cell>
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
import { computed, onMounted } from 'vue'
import { showNotify } from 'vant'
import { useShopcartStore } from '@/stores/shopcart'
import { useRouter } from 'vue-router'

const router = useRouter()
const shopcartStore = useShopcartStore()

const items = computed(() => shopcartStore.items)

const totalPrice = computed(() => shopcartStore.totalPrice)
const totalNum = computed(() => shopcartStore.totalNum)

onMounted(() => {
  let shopcart = localStorage.getItem('shopcart')
  if (shopcart) {
    shopcart = JSON.parse(shopcart)
    shopcartStore.initShopCart(shopcart)
  }
})

const add = (goods) => {
  shopcartStore.add(goods)
  showNotify({ type: 'success', message: '添加成功' })
}

const sub = (goods) => {
  shopcartStore.sub(goods)
  showNotify({ type: 'danger', message: '删除成功' })
}

const checkout = () => {
  const goods = items.value.map(item => ({
    id: item.id,
    count: item.num,
    name: item.name,
    price: item.price,
    image: item.image,
  }));

  router.push({
    name: 'createorder',
    query: { goods: JSON.stringify(goods) }
  });

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

.swipe-cell {
  margin-bottom: 20px;
}

.goods-card {
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background-color: white;
}

.cart-button {
  height: 100%;
  margin-left: 5px;
  border: none;
  border-radius: 5px;
}

.cart-button:first-child {
  background-color: #4caf50;
}

.cart-button:last-child {
  background-color: #f44336;
}

.total-price-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.total-price-section .van-button {
  margin-left: 10px;
}
</style>
