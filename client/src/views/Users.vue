<template>
  <div class="container">
    <h1>Painel Administrativo</h1>

    <UsersComponent />
  </div>
</template>

<script>
import UsersComponent from "../components/UsersComponent";

export default {
  components: {
    UsersComponent,
  },
};
</script>

<style scoped>
</style>