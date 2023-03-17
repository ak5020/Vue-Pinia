<script setup>
import { storeToRefs } from "pinia"
import { ref } from "vue"
import TaskDetail from "./components/TaskDetail.vue"
import TaskForm from "./components/TaskForm.vue"
import { useTaskStore } from "./store/TaskStore"
// Store
const taskStore = useTaskStore()
// storeToRef for persist values
const { tasks, isLoading, favsCount, totalCount, favs } = storeToRefs( taskStore )
// Fetch Tasks
taskStore.getTasks()
// Ref
const filter = ref( 'all' )

</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
    <h1>{{ taskStore.name }}</h1>
    <!-- Task Lists -->
  </header>
  <section>
    <!-- New Task Form -->
    <div class="task-form">
      <TaskForm />
    </div>
    <!-- Filter Nav -->
    <div class="filter">
      <button type="button" class="btn-secondary" @click="filter = 'all'">All</button>
      <button type="button" class="btn-secondary" @click="filter = 'favorite'">Favorite</button>
    </div>
    <!-- Loading -->
    <div class="loading" v-if="taskStore.isLoading">
      Loading tasks...
    </div>
    <!-- Tasks List -->
    <div class="task-lists" v-if="filter === 'all'">
      <h3>You have {{ taskStore.totalCount }} tasks left to do:</h3>
      <div v-for="task in tasks">
        <TaskDetail :task="task" />
      </div>
    </div>
    <div class="task-lists" v-if="filter === 'favorite'">
      <h3>You have {{ taskStore.favsCount }} favorite task left to do:</h3>
      <div v-for="task in taskStore.favs">
        <TaskDetail :task="task" />
      </div>
    </div>
  </section>
  <div>
    <button type="button" class="btn-danger" @click="taskStore.$reset">Reset</button>
  </div>
</template>

<style scope>
.task-lists {
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h3 {
  margin-bottom: 8px;
}

.filter {
  display: flex;
  justify-content: center;
  margin-right: 30rem;
  margin-top: 3rem;
}

.btn-secondary {
  background-color: orange;
  width: 80px;
  height: 30px;
  border: none;
  font-weight: 500;
  margin-right: 4px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-danger {
  background-color: rgb(228, 68, 23);
  width: 80px;
  height: 30px;
  border: none;
  font-weight: 500;
  margin-bottom: 4px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-secondary:hover {
  background-color: rgba(255, 166, 0, 0.901);
}

.task-form {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.loading {
  display: flex;
  justify-content: center;
  font-size: 16px;
  color: green;
}
</style>