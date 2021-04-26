<template>
  <div class="container">
    <div class="card">
      <div class="card-content">
        <button
          v-on:click="isRegisterModal = !isRegisterModal"
          class="button is-vcentered is-success is-small is-rounded"
        >
          Cadastrar
        </button>
        <div class="content">
          <table class="table">
            <thead>
              <th>id</th>
              <th>Primeiro nome</th>
              <th>Último nome</th>
              <th>Usuário</th>
              <th>E-mail</th>
              <th>Admin</th>
              <th>Criado em</th>
              <th></th>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.firstName }}</td>
                <td>{{ user.lastName }}</td>
                <td>{{ user.username }}</td>
                <td>{{ user.email }}</td>
                <td v-if="user.role == 0">Não</td>
                <td v-else-if="user.role == 1">Sim</td>
                <td>{{ user.createdAt }}</td>
                <td>
                  <button
                    v-on:click="
                      activeEditModal(user.id);
                      isEditModal = !isEditModal;
                    "
                    class="button is-warning is-small is-rounded"
                  >
                    <strong>Editar</strong>
                  </button>
                  <button
                    v-on:click="
                      activeDeleteModal(user.id);
                      isDeleteModal = !isDeleteModal;
                      catchUsernameToDelete(user.username);
                    "
                    class="button is-danger is-small is-rounded"
                  >
                    <strong>Deletar</strong>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- register modal -->
    <div v-show="isRegisterModal" class="modal is-active">
      <div class="modal-background"></div>
      <div class="columns is-mobile is-centered">
        <UsersRegisterModal
          v-on:eventToClose="isRegisterModal = !isRegisterModal"
        />
      </div>

      <button
        v-on:click="isRegisterModal = !isRegisterModal"
        class="modal-close is-large"
        aria-label="close"
      ></button>
    </div>

    <!-- edit modal -->
    <div v-show="isEditModal" class="modal is-active">
      <div class="modal-background"></div>
      <div class="columns is-mobile is-centered">
        <UsersEditModal
          :idToEdit="catchUserId"
          v-on:eventToClose="isEditModal = !isEditModal"
        />
      </div>
      <button
        v-on:click="isEditModal = !isEditModal"
        class="modal-close is-large"
        aria-label="close"
      ></button>
    </div>

    <!-- delete modal -->
    <div v-show="isDeleteModal" class="modal is-active">
      <div class="modal-background"></div>
      <div class="columns is-mobile is-centered">
        <UsersDeleteModal
          :idToDelete="this.catchUserId"
          :usernameToDelete="this.usernameToDelete"
          v-on:eventToClose="isDeleteModal = !isDeleteModal"
        />
      </div>
      <button
        v-on:click="isDeleteModal = !isDeleteModal"
        class="modal-close is-large"
        aria-label="close"
      ></button>
    </div>
  </div>
</template>
<script>
import axios from "axios";

import UsersRegisterModal from "./UsersRegisterModal";
import UsersDeleteModal from "./UsersDeleteModal";
import UsersEditModal from "./UsersEditModal";

export default {
  name: "UsersComponent",

  components: {
    UsersRegisterModal,
    UsersDeleteModal,
    UsersEditModal,
  },

  watch: {
    isDeleteModal() {
      this.findUsers();
    },
    isEditModal() {
      this.findUsers();
    },
    isRegisterModal() {
      this.findUsers();
    },
  },

  created() {
    this.findUsers();
  },

  data() {
    return {
      users: [
        {
          firstName: undefined,
          lastName: undefined,
          username: undefined,
          email: undefined,
          role: undefined,
          createdAt: undefined,
          updatedAt: undefined,
        },
      ],

      catchUserId: undefined,

      isDeleteModal: false,
      isEditModal: false,
      isRegisterModal: false,

      usernameToDelete: "",

      userToEdit: [
        { firstName: "", lastName: "", username: "", email: "", role: 0 },
      ],
    };
  },

  methods: {
    findUsers() {
      const bearerToken = localStorage.getItem("token");

      axios({
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
        url: "http://localhost:5001/users",
        methods: "get",
      })
        .then((res) => {
          this.users = res.data.users;
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },

    activeDeleteModal(userId) {
      this.catchUserId = userId;
    },
    activeEditModal(userId) {
      this.catchUserId = userId;
    },

    catchUsernameToDelete(username) {
      this.usernameToDelete = username;
    },

    catchUserToEdit(firstName, lastName, username, email, role) {
      this.userToEdit.firstName = firstName;
      this.userToEdit.lastName = lastName;
      this.userToEdit.username = username;
      this.userToEdit.email = email;
      this.userToEdit.role = role;
    },
  },
};
</script>