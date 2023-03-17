<template>
  <div>
    <form @submit.prevent="handleSubmit" action="">
      <input type="text" placeholder="task title" v-model="newTask" />
      <button type="button">Add</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTaskStore } from "../store/TaskStore"
const taskStore = useTaskStore()
const newTask = ref( '' )
const handleSubmit = () => {
  if ( newTask.value.length > 0 ) {
    taskStore.addTask( {
      title: newTask.value,
      isFav: false,
      id: Math.floor( Math.random() * 10000 )
    } )
    newTask.value = ''
  }
}
</script>
<style scope>
form input {
  width: 250px;
  height: 40px;
  border: 1px solid green;
  border-radius: 6px;
  border-width: 2px;
  padding: 0px 8px;
}

form button {
  background-color: rgba(0, 128, 0, 0.852);
  width: 80px;
  height: 40px;
  border: none;
  font-size: 14px;
  font-weight: 500;
  margin-left: 4px;
  border-radius: 4px;
  cursor: pointer;
  color: white;
}
</style>