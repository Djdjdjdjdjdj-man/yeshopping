<template>
    <div class="confirm-order">
      <van-nav-bar
        title="确认订单"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
      <van-cell-group>
        <van-field 
          v-model="selectedAddress" 
          label="收货地址" 
          readonly 
          is-link 
          placeholder="请选择收货地址" 
          @click="selectAddress"
        />
        <van-field v-model="note" label="备注" placeholder="请输入备注信息" />
      </van-cell-group>
      <van-cell-group title="商品信息">
        <div v-for="(item, index) in goods" :key="index" class="goods-item">
          <img :src="item.image" class="goods-thumb" />
          <div class="goods-info">
            <div style="color: black;">{{ item.name }}</div>
            <div style="color: black;">{{ item.price }} x {{ item.count }}</div>
          </div>
        </div>
      </van-cell-group>
      <van-button type="primary" @click="createOrder">提交订单</van-button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { showNotify } from 'vant';
  import { CreateOrder } from '@/api/shop3';
  import { useShopcartStore } from '@/stores/shopcart'
  
  const shopcartStore = useShopcartStore()
  const router = useRouter();
  const route = useRoute();
  
  const selectedAddress = ref('');
  const addressId = ref(null);
  const note = ref('');
  const goods = ref([]);
  
  onMounted(() => {
    if (route.query.goods) {
      goods.value = JSON.parse(route.query.goods);
    }
    if (route.query.address) {
      const address = JSON.parse(route.query.address);
      selectedAddress.value = `${address.name} ${address.tel} ${address.area} ${address.detail}`;
      addressId.value = address.id;
    }
  });
  
  const selectAddress = () => {
    router.push({ name: 'address', query: { redirect: 'createorder', goods: JSON.stringify(goods.value) } });
  };
  
  const createOrder = async () => {
    router.push({ name: 'shopcart' });
    if (!addressId.value) {
      showNotify({ type: 'danger', message: '请选择收货地址' });
      return;
    }
    try {
      const data = {
        address: addressId.value,
        note: note.value,
        goods: goods.value.map(item => ({
          id: item.id,
          count: item.count,
          selected: true,
        })),
      };
  
      const response = await CreateOrder(data);
  
      if (response.code === 1) {
        showNotify({ type: 'success', message: '订单创建成功' });
      } else {
        showNotify({ type: 'danger', message: response.msg });
      }
    } catch (error) {
      showNotify({ type: 'danger', message: '订单创建失败，请重试' });
    }

    shopcartStore.checkout()
  };
  
  const onClickLeft = () => {
    router.push({ name: 'shopcart' });
  };
  </script>
  
  <style scoped>
  .confirm-order {
    padding: 10px;
  }
  
  .goods-item {
    display: flex;
    margin-bottom: 10px;
  }
  
  .goods-thumb {
    width: 60px;
    height: 60px;
    margin-right: 10px;
  }
  
  .goods-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  </style>
  