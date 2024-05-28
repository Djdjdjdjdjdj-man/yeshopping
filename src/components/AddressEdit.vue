<template>
  <van-nav-bar title="添加地址" left-text="返回" left-arrow @click-left="onClickLeft" class="title"/>
  <form class="form-container" @submit.prevent="save">
    <div class="form-group">
      <label class="form-label">收件人</label>
      <input v-model="name" type="text" class="form-input" placeholder="请输入收件人姓名" />
    </div>
    <div class="form-group">
      <label class="form-label">联系方式</label>
      <input v-model="tel" type="text" class="form-input" placeholder="请输入手机号" />
    </div>
    <div class="form-group">
      <label class="form-label">所在地区</label>
      <input v-model="area" type="text" class="form-input" placeholder="所在地区" />
    </div>
    <div class="form-group">
      <label class="form-label">详细地址</label>
      <input v-model="detail" type="text" class="form-input" placeholder="请输入详细地址" />
    </div>
    <div class="button-group">
      <button type="submit" class="btn btn-primary">确认</button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { saveAddress } from '@/api/shop3';
import { areaList } from '@vant/area-data';
import Cookies from 'js-cookie';

const router = useRouter();
const name = ref('');
const tel = ref('');
const area = ref('');
const detail = ref('');

const save = async () => {
  const data = { name: name.value, tel: tel.value, area: area.value, detail: detail.value };
  try {
    const token = Cookies.get('token');
    if (!token) {
      router.push({ name: 'login' });
      return;
    }
    const res = await saveAddress(data);
    console.log(res);
    if (res.code === 0) {
      alert(res.msg);
    } else if (res.code === 1) {
      alert(res.msg);
      router.go(-1);
    } else if (res.code === 2) {
      router.push({ name: 'login' });
    }
  } catch (error) {
    console.error(error);
    alert('提交失败');
  }
};
const onClickLeft = () => router.push({ name: 'address' });
</script>

<style lang="scss" scoped>
.title {
  background-color: #fff;
  padding: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin-bottom: 20px;
}

.form-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.form-group {
  margin-bottom: 15px;
}
.form-label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
}
.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
  transition: border-color 0.3s;
  color: black;
}
.form-input:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
}
.button-group {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.btn {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.btn-primary {
  background-color: #007bff;
  color: #fff;
}
.btn-primary:hover {
  background-color: #0056b3;
}
</style>
