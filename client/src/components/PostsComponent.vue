<template>
  <div class="container">
    <div v-for="post in allPosts" :key="post.id" class="card">
      <div class="card-content">
        <article class="media">
          <div class="media-content">
            <div class="content">
              <p>
                <strong>{{ post.title }}</strong> <br />
                <br />
                <small>{{ post.username }}</small> &nbsp;
                <small>{{ post.createdAt }}</small>
              </p>
            </div>
            <hr />
            <p>
              <button
                v-on:click="
                  activeReadModal(post.title, post.id);
                  this.isPostReadModal = !this.isPostReadModal;
                "
                class="button is-success is-rounded"
              >
                Leia
              </button>
            </p>
          </div>
        </article>
      </div>
      <hr />
    </div>

    <!-- read modal -->
    <div v-show="isPostReadModal != false" class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">{{ readPostTitle }}</p>
          <button
            class="delete"
            aria-label="close"
            v-on:click="this.isPostReadModal = !this.isPostReadModal"
          ></button>
        </header>
        <section class="modal-card-body">
          <PostReadModal :postId="readPostId" />
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import PostReadModal from "../components/PostsReadModal";

import axios from "axios";

export default {
  components: {
    PostReadModal,
  },

  created() {
    axios({
      url: "http://localhost:5001/posts",
      method: "get",
    })
      .then((res) => {
        this.allPosts = res.data.result;
      })
      .catch((err) => {
        console.log(err.response);
      });
  },

  data() {
    return {
      allPosts: [],

      readPostTitle: "",
      isPostReadModal: false,

      readPostId: undefined,
    };
  },

  methods: {
    activeReadModal(readPostTitle, readPostId) {
      // console.log(readPostTitle, readPostId);
      this.readPostTitle = readPostTitle;
      this.readPostId = readPostId;
    },
  },
};
</script>