<template>
    <div>
      <nav>
        <router-link to="/home/goodslist">商品列表</router-link>
        <router-link to="/home/shopcart">购物车</router-link>
        <router-link to="/home/category">分类</router-link>
      </nav>
      <router-view></router-view>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  nav {
    display: flex;
    justify-content: space-around;
    padding: 10px;
    background-color: #f0f0f0;
  }
  
  router-link {
    text-decoration: none;
    color: #007bff;
  }
  
  router-link:hover {
    color: #0056b3;
  }
  </style>
  