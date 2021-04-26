<template>
  <div class="container">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          Você deseja mesmo deletar esse registro?
        </p>
      </header>
      <div class="content">
        <br />
        <label><strong>Usuário</strong></label>
        <p>{{ usernameToDelete }}</p>
      </div>
      <footer class="card-footer">
        <button
          v-on:click="
            deleteUserById();
            eventToCloseModal();
          "
          class="card-footer-item button is-danger"
        >
          Sim, deletar
        </button>
        <button
          v-on:click="eventToCloseModal()"
          class="card-footer-item button is-success"
        >
          Não, manter
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UsersDeleteModal",

  props: {
    usernameToDelete: String,
    idToDelete: Number,
  },

  methods: {
    eventToCloseModal() {
      this.$emit("eventToClose");
    },

    deleteUserById() {
      const bearerToken = localStorage.getItem("token");
      axios({
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
        url: `http://localhost:5001/user/${this.idToDelete}`,
        method: "delete",
      }).then(() => {
        this.isDeleteModal = !this.isDeleteModal;
        this.catchUserId = undefined;
      });
    },
  },
};
</script>