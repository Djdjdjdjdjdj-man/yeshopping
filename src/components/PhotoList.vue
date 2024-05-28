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
            <van-tab v-for="index in photolist" :title="index.title">
                <div v-for="(photo1 ,index) in photolist1" :key="index" >
                    <p>{{ photo1.title }}</p>
                    <div style="text-align: center;">
                         <img :src="photo1.img_url">
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

  </style>
  