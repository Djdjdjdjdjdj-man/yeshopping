<template>
  <div class="container">
    <div class="blur-effect"></div>
    <div class="login">
      <h2>注册</h2>
      <form @submit.prevent="registerr">
        <label for="username">用户名：</label>
        <input type="text" id="text" v-model="username" required /><br />
        <label for="password">用户密码：</label>
        <input type="password" id="password" v-model="password" required /><br />
        <label for="confirmPassword">密码确认：</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" required /><br />
        <label for="email">用户邮箱：</label>
        <input type="email" id="email" v-model="email" required /><br />
        <div class="button-group">
          <input type="submit" value="确定" class="btn btn-primary" />
          <input type="button" value="返回登录" class="btn btn-secondary" @click="goToLogin"/>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '@/api/shop3';

const username = ref('')
const password = ref('')
const email = ref('')
const confirmPassword = ref('')
const router = useRouter()
import { showNotify } from 'vant';




const registerr = async () => {
  const data = { username: username.value, password: password.value,email:email.value };
  const res = await register(data);
  console.log(res);
  if(res.code==0){
            showNotify({ type: 'success', message: res.msg  });
          }
  if (password.value !== confirmPassword.value) {
    alert('密码和确认密码不一致')
    return
  }
  console.log('注册信息:', { username: username.value, password: password.value,email:email.value })
  router.push({ name: 'login' })
}

const goToLogin = () => {
  router.push({ name: 'login' })
}
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
input[type="email"],
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
  color: #fff;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: #fff;
}

.btn-secondary:hover {
  background-color: #5a6268;
}
</style>
