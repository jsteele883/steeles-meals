<template>
  <div id="app" class="wrapper">
    <div class="intro" v-if="!selectedRecipe">
      <h1 class="title">Bug's Birthday Recipes</h1>
      <p>Happy Birthday Amelia!</p>
      <p>We have put together this collection of recipe's from your friend's and family for you to enjoy</p>
    </div>
    <div class="search">
      <input class="input" type="text" placeholder="Search">
      <div class="select">
        <select>
          <option v-for="recipeCategories">Select dropdown</option>
        </select>
      </div>
    </div>
    <recipe-details @back="selectedRecipe = null" v-if="selectedRecipe" :recipe="selectedRecipe"></recipe-details>
    <div class="recipe-box" v-if="!selectedRecipe">
      <recipe-thumbnail v-for="recipe in recipes" :recipe="recipe" @recipeSelected="selectRecipe($event)" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios, { AxiosResponse } from "axios";
import RecipeThumbnail from "@/components/RecipeThumbnail.vue";
import RecipeDetails from '@/components/RecipeDetails.vue';

@Component({
  components: {RecipeDetails, RecipeThumbnail }
})
export default class App extends Vue {
  recipes: AxiosResponse[] = [];
  errors: [] = [];
  selectedRecipe: Object | null = null;

  mounted() {
    axios
      .get(
        `https://jsteele883.api.stdlib.com/gsheets-database-example@dev/all_recipes/`
      )
      .then(response => {
        this.recipes = response.data;
      })
      .catch(e => {
        this.errors.push(e);
      });
  }

  get recipeCategories(): array {
    this.recipes
  }

  selectRecipe(recipe: Object) {
    this.selectedRecipe = recipe;
  }
}
</script>

<style lang="scss">
.wrapper {
  font-family: Karla, Georgia, Times, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  margin-left: 2em;
  margin-right: 3em;
}
.intro {
  h1, p {
    text-align: center;
  }
}
.recipe-box {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 1em;
  padding-top: 1em;
}
.thumb {
  width: 100%;
}
</style>
