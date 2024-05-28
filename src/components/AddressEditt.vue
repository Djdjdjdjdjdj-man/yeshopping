<template>
  <div class="address-detail-page">
    <van-nav-bar title="修改地址" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-address-edit
      :area-list="areaList"
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :address-info="address"
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { areaList } from '@vant/area-data';
import shop3 from '@/api/shop3';
import { showNotify } from 'vant';

const route = useRoute();
const router = useRouter();

const address = reactive({
  id: route.query.address || null,
  name: "",
  tel: "",
  area: "",
  detail: ""
});

const searchResult = ref([]);

function onSave(a) {
  address.name = a.name;
  address.tel = a.tel;
  address.area = `${a.province} ${a.city} ${a.county}`;
  address.detail = a.addressDetail;

  shop3.saveAddress(address).then(res => {
    showNotify({ type: 'primary', message: res.msg });
    if (res.code === 1) {
      router.push({ name: 'address' });
    }
  });
}

function onDelete() {
  if (!address.id) {
    showNotify({ type: 'danger', message: '地址ID不存在' });
    return;
  }

  shop3.delAddress({ id: address.id }).then(res => {
    showNotify({ type: res.code === 1 ? 'primary' : 'danger', message: res.msg });
    if (res.code === 1) {
      router.push({ name: 'address' });
    }
  }).catch(error => {
    console.error('Failed to delete address:', error);
    showNotify({ type: 'danger', message: '删除地址失败' });
  });
}

const onClickLeft = () => router.push({ name: 'address' });

const getAddressDetails = async () => {
  if (address.id) {
    try {
      const response = await shop3.getAddressById(address.id);
      if (response.code === 1) {
        Object.assign(address, response.data);
      } else {
        showNotify({ type: 'danger', message: response.msg });
      }
    } catch (error) {
      console.error('Failed to fetch address details:', error);
      showNotify({ type: 'danger', message: '获取地址详情失败' });
    }
  }
};

onMounted(() => {
  getAddressDetails();
});
</script>

<style scoped>
.address-detail-page {
  height: 100%;
  background-color: #f7f8fa;
  padding-bottom: 16px;
}

.van-nav-bar {
  background-color: #ffffff;
}

.actions {
  padding: 16px;
}

.actions .van-button {
  margin-bottom: 12px;
}

.van-address-edit {
  padding: 16px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.van-address-edit .van-field__label {
  color: #333;
}

.van-address-edit .van-field__control {
  color: #555;
}
</style>
