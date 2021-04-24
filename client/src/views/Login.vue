<template>
  <div class="container">
    <h2 class="title">Login</h2>
    <div class="columns is-mobile is-centered">
      <div class="card">
        <div class="card-content">
          <div class="field">
            <label class="label">E-mail</label>
            <div class="control">
              <input
                class="input"
                type="email"
                placeholder="meuemail@dominio.com"
                v-model="email"
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Senha</label>
            <div class="control">
              <input
                class="input"
                type="password"
                placeholder="********"
                v-model="password"
              />
            </div>
          </div>

          <hr />

          <button class="button is-success" v-on:click="login()">Login</button>

          <br />
          <br />

          <div class="notification is-danger" v-if="error != undefined">
            <p>{{ error }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      password: "",

      error: undefined,
    };
  },

  methods: {
    login() {
      axios({
        url: "http://localhost:5001/login",
        method: "post",
        data: {
          email: this.email,
          password: this.password,
        },
      })
        .then((res) => {
          const token = res.data.token;
          localStorage.setItem('token', token)
          this.$router.push({ name: "Home" });
        })
        .catch((error) => {
          this.error = error.response.data.error;

          // console.log(this.error);
        });
    },
  },
};
</script>

<style scoped>
</style>