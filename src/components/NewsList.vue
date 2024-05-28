<template>
    <div class="news-list-container">
      <van-nav-bar
        title="新闻列表"
        class="section-title"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
      <div>
        <ul class="mui-table-view">
          <li class="mui-table-view-cell mui-media" v-for="(item, index) in newslist" :key="index">
            <router-link :to="{ name: 'news_show', params: { id: item.id } }" class="news-link">
              <div class="news-thumbnail">
                <img class="mui-media-object mui-pull-left" :src="item.img_url" alt="News Thumbnail">
              </div>
              <div class="mui-media-body">
                <h3 class="news-title">{{ item.title }}</h3>
                <p class="news-meta">
                  <span>发表时间：{{ item.add_time | dateFormat }}</span>
                  <span>点击：{{ item.click }}次</span>
                </p>
                <p class="news-summary">{{ item.zhaiyao }}</p>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { getNews } from '@/api/shop3';
  import { useRouter } from 'vue-router';
  
  const newslist = ref([]);
  const router = useRouter();
  
  async function fetchNews() {
    try {
      const res = await getNews();
      newslist.value = res.message;
      console.log(res);
    } catch (error) {
      console.error('加载失败:', error);
      // 使用 vue-toastification 或者其他方式显示错误信息
    }
  }
  
  onMounted(async () => {
    await fetchNews();
  });
  const onClickLeft = () => router.push({ name: 'user' });
  </script>
  
  <style scoped>
  .news-list-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .section-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .mui-table-view {
    list-style: none;
    padding: 0;
  }
  
  .mui-table-view-cell {
    margin-bottom: 20px;
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
  }
  
  .mui-table-view-cell:hover {
    transform: translateY(-5px);
  }
  
  .news-link {
    text-decoration: none;
    color: inherit;
    display: flex;
    align-items: flex-start;
    padding: 10px;
  }
  
  .news-thumbnail img {
    width: 120px;
    height: 90px;
    object-fit: cover;
    border-radius: 5px;
  }
  
  .mui-media-body {
    padding: 10px;
    flex: 1;
  }
  
  .news-title {
    font-size: 18px;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  .news-meta {
    color: #666;
    font-size: 14px;
    margin-bottom: 5px;
  }
  
  .news-summary {
    font-size: 16px;
    color: #333;
  }
  
  @media screen and (max-width: 768px) {
    .news-link {
      flex-direction: column;
    }
  
    .news-thumbnail img {
      width: 100%;
      height: auto;
      margin-bottom: 10px;
    }
  
    .mui-media-body {
      padding: 0;
    }
  
    .news-title {
      font-size: 16px;
      margin-bottom: 5px;
    }
  
    .news-meta {
      font-size: 12px;
    }
  
    .news-summary {
      font-size: 14px;
    }
  }
  </style>
  