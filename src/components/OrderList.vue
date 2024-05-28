<template>
    <div class="address-container">
      <van-nav-bar
          title="订单查询列表"
          class="title"
          left-text="返回"
          left-arrow
          @click-left="onClickLeft"
        />

      <van-cell v-for="(ord, index) in orderlist" :key="index" class="swipe-cell">
        <div class="address-content">
          <p class="name">编号: {{ ord.id }}</p>
          <p class="name">用户编号: {{ ord.user_user_id}}</p>
          <p class="name">价格: {{ ord.price }}</p>
          <p class="name">收货人: {{ ord.address_name }}</p>
          <p class="tel">电话: {{ ord.address_tel}}</p>
          <p class="area">地址: {{ ord.address_area }}</p>
          <p class="detail">详细地址: {{ ord.address_detail }}</p>
          <p class="name">备注: {{ ord.note }}</p>
          <p class="create-time">保存时间: {{ ord.create_time }}</p>
        </div>
      </van-cell>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import shop3 from '@/api/shop3';
  
  const router = useRouter();
  const route = useRoute();
  const orderlist = ref([]);
  
  const fetchOrder = async () => {
    try {
      const res = await shop3.getOrder();
      if (res.code === 1) {
        orderlist.value = res.data;
      } else {
        alert(res.msg);
      }
    } catch (error) {
      console.error('Failed to fetch order data:', error);
      alert('获取地址数据失败');
    }
  };
  
  onMounted(() => {
    fetchOrder();
  });
  
  const onClickLeft = () => router.push({ name: 'user' });
  </script>
  
  <style lang="scss" scoped>
  .address-container {
    padding: 20px;
    background-color: #f9f9f9;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .title {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
    text-align: center;
    border-radius: 10px;
  }
  
  .swipe-cell {
    margin-bottom: 10px;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .address-content {
    font-size: 16px;
    line-height: 1.5;
    color: #555;
    text-align: left;
  
    p {
      margin: 5px 0;
      text-align: left;
    }
  
    .name {
      font-weight: bold;
    }
  
    .create-time {
      font-size: 14px;
      color: #999;
    }
  
    .edit-btn {
      margin-left: 10px;
    }
  }
  
  .mod_btns {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    
    .mod_btn {
      display: inline-block;
      padding: 10px 20px;
      font-size: 16px;
      color: #fff;
      background-color: #007bff;
      border-radius: 4px;
      text-align: center;
      text-decoration: none;
      transition: background-color 0.3s;
      
      &:hover {
        background-color: #0056b3;
      }
    }
  }
  
  .fixed {
    position: sticky;
    bottom: 0; 
    background-color: #f9f9f9;
  }
  </style>
  