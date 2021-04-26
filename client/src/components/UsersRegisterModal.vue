<template>
  <div class="container">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">Cadastrando: {{ registerUsername }}</p>
      </header>
      <div class="card-content">
        <div class="field">
          <label class="label">Primeiro Nome</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="primeiro nome"
              v-model="registerFirstName"
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
              v-model="registerLastName"
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
              v-model="registerUsername"
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
              v-model="registerEmail"
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
              v-model="registerPassword"
            />
          </div>
        </div>

        <hr />

        <button class="button is-success" v-on:click="registerUser()">
          Cadastrar
        </button>
        <br /><br />
        <div class="notification is-danger" v-if="errorOnRegister != undefined">
          <p>{{ errorOnRegister }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UsersRegisterModal",

  data() {
    return {
      registerFirstName: "",
      registerLastName: "",
      registerUsername: "",
      registerEmail: "",
      registerPassword: "",
      errorOnRegister: undefined,
    };
  },

  methods: {
    registerUser() {
      axios({
        url: "http://localhost:5001/user",
        method: "post",
        data: {
          firstName: this.registerFirstName,
          lastName: this.registerLastName,
          username: this.registerUsername.toLowerCase(),
          email: this.registerEmail.toLowerCase(),
          password: this.registerPassword,
          role: 0,
        },
      })
        .then(() => {
          this.registerFirstName = "";
          this.registerLastName = "";
          this.registerUsername = "";
          this.registerEmail = "";
          this.registerPassword = "";
          this.errorOnRegister = undefined;

          this.$emit("eventToClose");
        })
        .catch((error) => {
          this.errorOnRegister = error.response.data.error;
        });
    },
  },
};
</script>