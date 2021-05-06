<template>
  <div>
    <div class="field">
      <label class="label">Título</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="titulo do post"
          v-model="postTitle"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">Categoria</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="categoria"
          maxlength="10"
          v-model="postSlug"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">Conteúdo</label>
      <div class="control">
        <textarea
          class="textarea"
          placeholder="conteúdo da postagem"
          rows="9"
          v-model="postBody"
        ></textarea>
      </div>
    </div>
    <button class="button is-success" v-on:click="createPost()">
      Nova postagem
    </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    userId: Number,
  },

  data() {
    return {
      postTitle: "",
      postSlug: "",
      postBody: "",
    };
  },

  methods: {
    createPost() {
      const bearerToken = localStorage.getItem("token");

      axios({
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
        url: "http://localhost:5001/post",
        method: "post",
        data: {
          title: this.postTitle,
          slug: this.postSlug,
          body: this.postBody,
          user_id: this.userId,
        },
      })
        .then((res) => {
          console.log(res);
          
          this.$emit("eventToClose");
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
};
</script>