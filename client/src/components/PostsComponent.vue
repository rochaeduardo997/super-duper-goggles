<template>
  <div class="container">
    <div v-show="isAuthenticate">
      <button
        v-on:click="this.isPostCreateModal = !this.isPostCreateModal"
        class="button is-success"
      >
        Nova postagem
      </button>
      <hr />
    </div>
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

    <!-- create new post modal -->
    <div v-show="isPostCreateModal != false" class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Criando novo post</p>
          <button
            class="delete"
            aria-label="close"
            v-on:click="this.isPostCreateModal = !this.isPostCreateModal"
          ></button>
        </header>
        <section class="modal-card-body">
          <PostCreateModal
            :userId="userId"
            :closeModal="isPostCreateModal === false"
            v-on:eventToClose="isPostCreateModal = !isPostCreateModal"
          />
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import PostReadModal from "../components/PostsReadModal";
import PostCreateModal from "../components/PostCreateModal";

import axios from "axios";

export default {
  components: {
    PostReadModal,
    PostCreateModal,
  },

  watch: {
    isPostCreateModal() {
      this.findPosts();
    },
  },

  created() {
    const bearerToken = localStorage.getItem("token");

    this.findPosts();

    if (bearerToken != undefined) {
      axios({
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
        url: "http://localhost:5001/validate",
        method: "post",
      })
        .then((res) => {
          this.isAuthenticate = true;

          this.userId = res.data.id;
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  },

  data() {
    return {
      allPosts: [],
      userId: undefined,

      readPostTitle: "",
      isPostReadModal: false,
      isPostCreateModal: false,

      readPostId: undefined,

      isAuthenticate: false,
    };
  },

  methods: {
    findPosts() {
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
    activeReadModal(readPostTitle, readPostId) {
      // console.log(readPostTitle, readPostId);
      this.readPostTitle = readPostTitle;
      this.readPostId = readPostId;
    },
  },
};
</script>