<template>
  <div class="container">
    <p>{{ postBody }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  watch: {
    postId() {
      this.findPost();
    },
  },

  props: {
    postId: Number,
  },

  data() {
    return {
      postBody: "",
    };
  },

  methods: {
    findPost() {
      axios({
        url: `http://localhost:5001/post/${this.postId}`,
        method: "get",
      })
        .then((res) => {
          this.postBody = res.data.postById[0].body;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
};
</script>