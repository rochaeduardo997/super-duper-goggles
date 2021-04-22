<template>
  <div class="container">
    <h2 class="title">Cadastrar</h2>
    <div class="columns is-mobile is-centered">
      <div class="card">
        <div class="card-content">
          <div class="field">
            <label class="label">Primeiro Nome</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="primeiro nome"
                v-model="firstName"
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Último Nome</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="último nome"
                v-model="lastName"
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Usuário</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="usuario"
                v-model="username"
              />
            </div>
          </div>

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

          <button class="button is-success" v-on:click="registerUser()">
            Cadastrar
          </button>

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
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",

      error: undefined,
    };
  },

  methods: {
    registerUser() {
      console.log(this.firstName);
      axios({
        url: "http://localhost:5001/user",
        method: "post",
        data: {
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username.toLowerCase(),
          email: this.email.toLowerCase(),
          password: this.password,
          role: 0,
        },
      })
        .then(() => {
          this.$router.push({ name: "Home" });
        })
        .catch((error) => {
          this.error = error.response.data.error;

          console.log(this.error);
        });
    },
  },
};
</script>

<style scoped>
</style>