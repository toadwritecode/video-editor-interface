<template>
  <div class="wrapper">
    <div class="header">
      <div class="header__nav">
        <nav>
          <router-link class="nav__link" active-class="nav__link--active" to="/">
            Загрузка
          </router-link>

          <router-link class="nav__link" active-class="nav__link--active" to="/files">
            Файлы
          </router-link>
        </nav>
      </div>

      <div class="header__service">
        <a
          v-show="!$store.getters.loggedIn"
          @click="showModalLogin = true"
          class="nav__link nav__link--service">
          Вход и регистрация
        </a>
      </div>
      <div v-show="$store.getters.loggedIn" class="header__creation">
        <a @click="logout" class="creation__link creation__link--exit">Выход</a>
      </div>
    </div>
  </div>

  <modal v-show="showModalLogin" @close="showModalLogin = false">
    <template v-slot:header>
      <h3 class="modal__title">Вход</h3>
    </template>
    <template v-slot:body>
      <form class="modal__form" @submit.prevent="loginUser">
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
            value="Войти"
        />
      </form>
    </template>
  </modal>
</template>

<script>
import modal from "../components/Modal.vue";
import { Icon } from "@iconify/vue";

export default {
  name: "Header",
  components: {
    modal,
    Icon,
  },
  data() {
    return {
      showModal: false,
      showModalLogin: false,
      newAdvert: {
        title: "",
        description: "",
        price: "",
        address: "",
        photo: "",
      },
      username: "",
      password: "",
      wrongCred: false,
      type: "password",
      passwordVisible: false,
    };
  },
  methods: {
    loginUser() {
      this.$store
          .dispatch("loginUser", {
            username: this.username,
            password: this.password,
          })
          .then(() => {
            this.wrongCred = false;
            this.$router.push({ name: "Adverts" });
          })
          .catch((err) => {
            console.log(err);
            this.wrongCred = true; // if the credentials were wrong set wrongCred to true
          });
      this.showModalLogin = false;
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
    logout() {
      this.$store.dispatch("logoutUser")
          .then(() => {
            this.$router.push({ name: "Adverts" });
          });
    },
  },
};
</script>

<style scoped>
.wrapper {
  background-color: #292929;
}

.header {
  max-width: 1320px;
  margin: 0 auto;
  padding: 20px 0;
  display: flex;
  align-items: center;
}

.header__nav {
  flex-grow: 1;
  display: flex;
}

.nav__link {
  color: #fff;
  text-decoration: none;
  transition: 0.3s;
}

.nav__link:not(:last-child) {
  margin-right: 40px;
}

.nav__link:hover {
  color: #ff6163;
}

.nav__link--service:hover {
  cursor: pointer;
  color: #d9d9d9;
}

.header__creation {
  margin-left: 30px;
  cursor: pointer;
}

.creation__link {
  padding: 5px 14px;
  background-color: #00aaff;
  border-radius: 3px;
  color: #fff;
  text-decoration: none;
  transition: 0.3s;
}

.creation__link--exit {
  background-color: #dc3545;
  border-color: #dc3545;
}

.creation__link:hover {
  background-color: #009cf0;
}

.creation__link--exit:hover {
  background-color: #c82333;
  border-color: #bd2130;
}

.modal__title {
  color: #999999;
}

textarea {
  resize: vertical;
}

.modal__form {
  width: 90%;
  margin: 35px auto 0;
  display: flex;
  flex-direction: column;
}

.form__input {
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
  width: 94%;
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
  right: 15px;
  transition: 0.3s;
}

.eye:hover {
  cursor: pointer;
  color: #ff6163;
}

.btn--login {
  margin: 0 auto;
}

.nav__link--active {
  color: #ff6163
}
</style>
