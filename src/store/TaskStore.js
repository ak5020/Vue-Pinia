import { defineStore } from "pinia"

export const useTaskStore = defineStore( 'taskStore', {
  state: () => ( {
    tasks: [],
    isLoading: false,
    name: 'Pinia'
  } ),
  getters: {
    favs () {
      return this.tasks.filter( t => t.isFav )
    },
    favsCount () {
      return this.tasks.reduce( ( prev, current ) => {
        return current.isFav ? prev + 1 : prev
      }, 0 )
    },
    totalCount () {
      return this.tasks.length
    }
  },
  actions: {
    async getTasks () {
      this.isLoading = true
      const response = await fetch( 'http://localhost:3000/tasks' )
      const data = await response.json()

      this.tasks = data
      this.isLoading = false
    },
    async addTask ( task ) {
      this.tasks.push( task )
      const response = await fetch( 'http://localhost:3000/tasks', {
        method: 'POST',
        body: JSON.stringify( this.tasks ),
        headers: { 'Content-Type': 'application/json' }
      } )
      if ( response.error ) {
        console.log( 'error', error )
      }
    },
    async deleteTask ( id ) {
      this.tasks = this.tasks.filter( task => {
        return task.id !== id
      } )
      const response = await fetch( 'http://localhost:3000/tasks/' + id, {
        method: 'DELETE',
      } )
      if ( response.error ) {
        console.log( 'error', error )
      }
    },
    async toggleFav ( id ) {
      const task = this.tasks.find( t => t.id === id )
      task.isFav = !task.isFav
      const response = await fetch( 'http://localhost:3000/tasks/' + id, {
        method: 'PATCH',
        body: JSON.stringify( { isFav: task.isFav } ),
      } )
      if ( response.error ) {
        console.log( 'error', error )
      }
    }
  }
} )