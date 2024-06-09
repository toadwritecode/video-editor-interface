<template>
  <h3 class="modal__title">Регистрация</h3>

  <form class="modal__form" @submit.prevent="signUp">
    <input
        class="form__input"
        id="username"
        name="username"
        type="text"
        v-model="username"
        placeholder="Логин"
        required
    />
    <div class="password-wrapper">
      <Icon
          v-show="passwordVisible"
          @click="showPassword"
          class="eye"
          icon="fa:eye"
      />
      <Icon
          v-show="!passwordVisible"
          @click="showPassword"
          class="eye"
          icon="fa-solid:eye-slash"
      />

      <input
          class="form__input form__input--password"
          id="password"
          name="password"
          :type="type"
          v-model="password"
          placeholder="Пароль"
          required
      />
    </div>
    <input
        class="btn btn--primary btn--login"
        type="submit"
        value="Зарегистрироваться"
    />
  </form>
</template>

<script>
import {Icon} from "@iconify/vue";
import authenticationService from "@/services/AuthenticationService.js";

export default {
  name: "Signup",
  components: {Icon},
  data() {
    return {
      username: "",
      password: "",
      type: "password",
      passwordVisible: false,
    };
  },
  methods: {
    signUp() {
      console.log("signUp");
      authenticationService.signUp({username: this.username, password: this.password})
          .then(response =>
              this.$vueAlert.alert("Пользователь успешно зарегестрирован", "Регистрация", "success"))
          .catch(error => this.$vueAlert.alert("Пользователь с таким именем уже существует", "Ошибка регистрации", "error"))
    },
    showPassword() {
      if (this.type === "password") {
        this.type = "text";
        this.passwordVisible = true;
      } else {
        this.type = "password";
        this.passwordVisible = false;
      }
    },
  },
};
</script>

<style scoped>
.modal__form {
  width: 50%;
  margin: 35px auto 0;
  display: flex;
  flex-direction: column;
}

.form__input {
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 35px;
  min-height: 25px;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form__input:focus {
  color: #495057;
  background-color: #fff;
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgb(0 123 255 / 25%);
}

.form__input--password {
  width: 100%;
}

.btn {
  cursor: pointer;
  width: 45%;
  margin-top: 50px;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
  border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.btn--primary {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}

.btn--primary:hover {
  color: #fff;
  background-color: #0069d9;
  border-color: #0062cc;
}

.password-wrapper {
  position: relative;
}

.eye {
  opacity: 0.6;
  position: absolute;
  top: 12px;
  right: -12px;
  transition: 0.3s;
}

.eye:hover {
  cursor: pointer;
  color: #ff6163;
}

.btn--login {
  margin: 0 auto;
}

.modal__title {
  color: #999999;
}
</style>
