<template>
    <div>
      <h1>Words</h1>
      <div class="ui action input"> 
        <input type="text" placeholder="Search..." v-model="searchTerm" @input="filterWords"> 
        <button class="ui button" @click="clearSearch">Clear</button> 
      </div>
      <table id="words" class="ui celled compact table">
        <thead>
          <tr>
            <th>English</th>
            <th>German</th>
            <th>Spanish</th>
            <th colspan="3"></th>
          </tr>
        </thead>
        <tr v-for="(word, i) in filteredWords" :key="i"> 
          <td>{{ word.english }}</td>
          <td>{{ word.german }}</td>
          <td>{{ word.spanish }}</td>
          <td width="75" class="center aligned">
            <router-link :to="{ name: 'edit', params: { id: word._id }}">Edit</router-link>
          </td>
          <td width="75" class="center aligned">
            <router-link :to="{ name: 'show', params: { id: word._id }}">Show</router-link>
          </td>
          <td width="75" class="center aligned" @click.prevent="onDestroy(word._id)">
            <a :href="`/words/${word._id}`">Destroy</a></td>
        </tr>
      </table>
    </div>
  </template>
  
  <script>
  import { api } from '../helpers/helpers';
  
  export default {
    name: 'words',
    data() {
      return {
        words: [],
        searchTerm: '', 
        filteredWords: [] 
      };
    },
    methods: {
      async onDestroy(id) {
        const sure = window.confirm('Are you sure?');
        if (!sure) return;
        await api.deleteWord(id);
        this.flash('Word deleted successfully!', 'success');
        this.words = this.words.filter(word => word._id !== id);
        this.filterWords(); 
      },
      filterWords() { 
        const searchTermLower = this.searchTerm.toLowerCase();
        this.filteredWords = this.words.filter(word =>
          word.english.toLowerCase().includes(searchTermLower) ||
          word.german.toLowerCase().includes(searchTermLower) ||
          word.spanish.toLowerCase().includes(searchTermLower)
        );
      },
      clearSearch() { 
        this.searchTerm = '';
        this.filterWords();
      }
    },
    async mounted() {
      this.words = await api.getWords();
      this.filterWords(); 
    }
  };
  </script>
  
  <style scoped>
  .actions a {
    display: block;
    text-decoration: underline;
    margin: 20px 10px;
  }
  .ui.action.input {
    margin-bottom: 20px; 
  } 
  </style>
  