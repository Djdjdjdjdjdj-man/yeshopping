<template>
    <div class="address-container">
      <van-nav-bar
        title="图片分享列表"
        class="title"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
      <van-tabs v-model:active="active" scrollspy sticky>
        <van-tab v-for="(tab, index) in photolist" :title="tab.title" :key="index">
          <div class="photo-list">
            <div v-for="(photo, idx) in photolist1" :key="idx" class="photo-item">
              <p class="photo-title">{{ photo.title }}</p>
              <div class="photo-image">
                <img :src="photo.img_url" alt="photo image">
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import shop3 from '@/api/shop3';
  
  const router = useRouter();
  const route = useRoute();
  const active = ref(0);
  const photolist = ref([]);
  const photolist1 = ref([]);
  
  const fetchPhoto = async () => {
    const res = await shop3.getPhoto();
    photolist.value = res.message;
  };
  
  const fetchPhoto1 = async () => {
    const res = await shop3.getPhoto1();
    photolist1.value = res.message;
  };
  
  onMounted(() => {
    fetchPhoto();
    fetchPhoto1();
  });
  
  const onClickLeft = () => router.push({ name: 'user' });
  </script>
  
  <style lang="scss" scoped>
  .address-container {
    background-color: #f9f9f9;
    min-height: 100vh;
  }
  
  .title {
    font-size: 20px;
    font-weight: bold;
    color: #333;
  }
  
  .van-tabs {
    margin-top: 10px;
  }
  
  .photo-list {
    padding: 10px;
  }
  
  .photo-item {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    padding: 10px;
    text-align: center;
  }
  
  .photo-title {
    font-size: 16px;
    color: #555;
    margin-bottom: 10px;
  }
  
  .photo-image img {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
  }
  </style>
  