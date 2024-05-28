<template>
  <div class="container">
    <div class="blur-effect"></div>
    <div class="login">
      <h2>登录</h2>
      <form @submit.prevent="checklogin">
        <label for="email">用户：</label>
        <input type="text" id="email" v-model="username" required /><br />
        <label for="password">密码：</label>
        <input type="password" id="password" v-model="password" required /><br />
        <div class="button-group">
          <input type="submit" value="确定" class="btn btn-primary" />
          <input type="button" value="注册" class="btn btn-secondary" @click="goToRegister"/>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '@/api/shop3';
import Cookies from 'js-cookie';

const username = ref('');
const password = ref('');
const router = useRouter();

const checklogin = async () => {
  const data = { username: username.value, password: password.value };
  const res = await login(data);
  console.log(res);
  if (res.code === 1) {
    Cookies.set("token", res.data.session_id);
    console.log(Cookies.get('token'))
    router.push({ name: 'user' });
  } else {
    alert(res.msg);
  }
};

const goToRegister = () => {
  router.push({ name: 'register' });
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right, #4772e8, #c58fe1);
  position: relative;
}

.blur-effect {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(10px);
}

.login {
  position: relative;
  background: rgba(255, 255, 255, 0.8);
  padding: 20px 40px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 16px;
  color: black;
}

.button-group {
  display: flex;
  justify-content: space-between;
}

.btn {
  width: 48%;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary:hover {
  background-color: #5a6268;
}
</style>
