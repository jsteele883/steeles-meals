<template>
  <div id="app">
    <h1>Bug's Birthday Recipes</h1>
    <ul class="recipe-box">
      <li v-for="recipe in recipes">
        <img class="thumb" :src="firstPhoto(recipe.food_photo)">
        <h3>{{ recipe.name }}</h3>
        <p>{{ recipe.creator }}</p>
        <p>{{ recipe.category }}</p>
        <p>{{ recipe.blurb }}</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios, {AxiosResponse} from 'axios';

@Component({})
export default class App extends Vue {
  recipes: AxiosResponse[] = [];
  errors: [] = [];

  firstPhoto(imageSrc: string) {
    let firstPhoto = imageSrc.split(",")[0];
    return firstPhoto.replace('open', 'uc');
  }

  mounted() {
    axios.get(`https://jsteele883.api.stdlib.com/gsheets-database-example@dev/all_recipes/`)
    .then(response => {
      this.recipes = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.recipe-box {
  list-style: none;
  display : grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 1em;
}
.thumb {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
</style>
