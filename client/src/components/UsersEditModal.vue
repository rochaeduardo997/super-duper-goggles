<template>
  <div class="container">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">Editando: {{ usersToEdit.username }}</p>
      </header>
      <div class="card-content">
        <br />
        <label>Primeiro nome</label>
        <input
          class="input"
          type="text"
          placeholder="primeiro nome"
          v-model="usersToEdit.firstName"
        />

        <br /><br />
        <label>Último nome</label>
        <input
          class="input"
          type="text"
          placeholder="ultimo nome"
          v-model="usersToEdit.lastName"
        />

        <!-- <br /><br />
        <label>Usuário</label>
        <input
          class="input"
          type="text"
          placeholder="usuario"
          v-model="usersToEdit.username"
        /> -->

        <!-- <br /><br />
        <label>E-mail</label>
        <input
          class="input"
          type="text"
          placeholder="email"
          v-model="usersToEdit.email"
        /> -->

        <br /><br />
        <label>Admin</label>
        <div class="control">
          <div class="select">
            <select v-model="usersToEdit.role">
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
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UsersEditModal",

  watch: {
    idToEdit() {
      this.findUsers();
    },
  },

  props: {
    idToEdit: Number,
  },

  data() {
    return {
      usersToEdit: [
        { firstName: "", lastName: "", username: "", email: "", role: "" },
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
        url: `http://localhost:5001/user/${this.idToEdit}`,
        methods: "get",
      })
        .then((res) => {
          const mapArray = res.data.userById.filter((mapArray) => mapArray);
          console.log(mapArray[0]);
          this.usersToEdit.firstName = mapArray[0].firstName;
          this.usersToEdit.lastName = mapArray[0].lastName;
          this.usersToEdit.username = mapArray[0].username;
          this.usersToEdit.email = mapArray[0].email;
          this.usersToEdit.role = mapArray[0].role;
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },

    editUserById() {
      console.log(
        this.usersToEdit.firstName,
        this.usersToEdit.lastName,
        this.usersToEdit.role
      );
      const bearerToken = localStorage.getItem("token");
      axios({
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
        url: `http://localhost:5001/user/${this.idToEdit}`,
        method: "put",
        data: {
          firstName: this.usersToEdit.firstName,
          lastName: this.usersToEdit.lastName,
          role: this.usersToEdit.role,
        },
      })
        .then(() => {
          this.$emit("eventToClose");
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
  },
};
</script>