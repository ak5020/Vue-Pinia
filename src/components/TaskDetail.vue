<template>
  <div class="task">
    <h3>{{ task.title }}</h3>
    <div>
      <i class="material-icons" style="color: gray;" @click="taskStore.deleteTask(task.id)">delete</i>
      <i class="material-icons" :class="{ active: task.isFav }" style="color: gray;"
        @click="taskStore.toggleFav(task.id)">favorite</i>
    </div>
  </div>
</template>
<script setup>
import { useTaskStore } from "../store/TaskStore"

defineProps( {
  task: Object
} )
const taskStore = useTaskStore()
</script>
<style scope>
.task {
  border: 1px solid rgb(185, 182, 182);
  border: none;
  border-radius: 6px;
  width: 650px;
  background-color: rgb(230 236 230);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  margin-bottom: 20px;
  cursor: pointer;
}

.task:hover {
  background: rgba(230, 236, 230, 0.482);
}

.task i.active {
  color: #cd0c0c !important;
}
</style>