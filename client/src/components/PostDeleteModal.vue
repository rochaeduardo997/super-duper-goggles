<template>
  <div class="is-centered">
    <p>Você deseja mesmo deletar este post?</p>
    <br />
    <button v-on:click="deletePost()" class="button is-danger">Sim</button
    >&nbsp;
    <button v-on:click="closeDeleteModal()" class="button is-success">
      Nao
    </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    postId: Number,
  },

  methods: {
    closeDeleteModal() {
      this.$emit("eventToClose");
    },
    deletePost() {
      const bearerToken = localStorage.token;

      axios({
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
        url: `http://localhost:5001/post/${this.postId}`,
        method: "delete",
      })
        .then(() => {
          this.$emit("eventToClose");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>