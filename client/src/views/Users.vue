<template>
  <div class="container">
    <h1>Painel Administrativo</h1>
    <div class="card">
      <div class="card-content">
        <button
          v-on:click="activeRegisterModal"
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
                      catchUserToEdit(
                        user.firstName,
                        user.lastName,
                        user.username,
                        user.email,
                        user.role
                      );
                    "
                    class="button is-warning is-small is-rounded"
                  >
                    <strong>Editar</strong>
                  </button>
                  <button
                    v-on:click="
                      activeDeleteModal(user.id);
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

    <!-- delete modal -->
    <div v-show="isDeleteModal" class="modal is-active">
      <div class="modal-background"></div>
      <div>
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
              v-on:click="deleteUserById"
              class="card-footer-item button is-danger"
            >
              Sim, deletar
            </button>
            <button
              v-on:click="activeDeleteModal"
              class="card-footer-item button is-success"
            >
              Não, manter
            </button>
          </footer>
        </div>
      </div>
      <button
        v-on:click="activeDeleteModal"
        class="modal-close is-large"
        aria-label="close"
      ></button>
    </div>

    <!-- edit modal -->
    <div v-show="isEditModal" class="modal is-active">
      <div class="modal-background"></div>
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">Editando: {{ userToEdit.username }}</p>
        </header>
        <div class="card-content">
          <br />
          <label>Primeiro nome</label>
          <input
            class="input"
            type="text"
            placeholder="primeiro nome"
            v-model="userToEdit.firstName"
          />

          <br /><br />
          <label>Último nome</label>
          <input
            class="input"
            type="text"
            placeholder="ultimo nome"
            v-model="userToEdit.lastName"
          />

          <br /><br />
          <label>Usuário</label>
          <input
            class="input"
            type="text"
            placeholder="usuario"
            v-model="userToEdit.username"
          />

          <br /><br />
          <label>E-mail</label>
          <input
            class="input"
            type="text"
            placeholder="email"
            v-model="userToEdit.email"
          />

          <br /><br />
          <label>Admin</label>
          <div class="control">
            <div class="select">
              <select v-model="userToEdit.role">
                <option value="1">Sim</option>
                <option value="0">Não</option>
              </select>
            </div>
          </div>
        </div>
        <footer class="card-footer">
          <button
            class="card-footer-item button is-warning"
            v-on:click="editUserById"
          >
            Sim, editar
          </button>
          <button
            v-on:click="activeEditModal"
            class="card-footer-item button is-success"
          >
            Não, cancelar
          </button>
        </footer>
      </div>
      <button
        v-on:click="activeEditModal"
        class="modal-close is-large"
        aria-label="close"
      ></button>
    </div>

    <!-- register modal -->
    <div v-show="isRegisterModal" class="modal is-active">
      <div class="modal-background">
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
              <div
                class="notification is-danger"
                v-if="errorOnRegister != undefined"
              >
                <p>{{ errorOnRegister }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        v-on:click="activeRegisterModal"
        class="modal-close is-large"
        aria-label="close"
      ></button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
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
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          role: "",
          createdAt: "",
          updatedAt: "",
        },
      ],

      isDeleteModal: false,
      isEditModal: false,
      isRegisterModal: false,

      catchUserId: undefined,

      usernameToDelete: undefined,
      userToEdit: [
        { firstName: "", lastName: "", username: "", email: "", role: 0 },
      ],

      registerFirstName: "",
      registerLastName: "",
      registerUsername: "",
      registerEmail: "",
      registerPassword: "",
      errorOnRegister: undefined,
    };
  },
  methods: {
    catchUsernameToDelete(username) {
      this.usernameToDelete = username;
    },

    activeDeleteModal(userId) {
      this.catchUserId = userId;
      this.isDeleteModal = !this.isDeleteModal;
    },
    activeEditModal(userId) {
      this.catchUserId = userId;
      this.isEditModal = !this.isEditModal;
    },
    activeRegisterModal() {
      this.isRegisterModal = !this.isRegisterModal;
    },

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

    deleteUserById() {
      const bearerToken = localStorage.getItem("token");
      axios({
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
        url: `http://localhost:5001/user/${this.catchUserId}`,
        method: "delete",
      }).then(() => {
        this.isDeleteModal = !this.isDeleteModal;
        this.catchUserId = undefined;
      });
    },

    catchUserToEdit(firstName, lastName, username, email, role) {
      this.userToEdit.firstName = firstName;
      this.userToEdit.lastName = lastName;
      this.userToEdit.username = username;
      this.userToEdit.email = email;
      this.userToEdit.role = role;
    },

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
          this.registerFirstNam = "";
          this.registerLastName = "";
          this.registerUsername = "";
          this.registerEmail = "";
          this.registerPassword = "";
          this.errorOnRegister = undefined;
          this.isRegisterModal = !this.isRegisterModal;
        })
        .catch((error) => {
          this.errorOnRegister = error.response.data.error;
        });
    },

    editUserById() {
      console.log(
        this.userToEdit.firstName,
        this.userToEdit.lastName,
        this.userToEdit.username,
        this.userToEdit.email,
        this.userToEdit.role
      );
      const bearerToken = localStorage.getItem("token");
      axios({
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
        url: `http://localhost:5001/user/${this.catchUserId}`,
        method: "put",
        data: {
          firstName: this.userToEdit.firstName,
          lastName: this.userToEdit.lastName,
          username: this.userToEdit.username,
          email: this.userToEdit.email,
          role: this.userToEdit.role,
        },
      })
        .then((res) => {
          console.log(res.data);
          this.isEditModal = !this.isEditModal;
          this.catchUserId = undefined;
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
  },
};
</script>

<style scoped>
</style>