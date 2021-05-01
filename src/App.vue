<template>
  <div id="app" class="wrapper">
    <div class="intro" v-if="!selectedRecipe">
      <div class="photo">
        <img src="https://drive.google.com/uc?id=1XErPC-MRXPO66kahA63HEsFruANR_JlG" alt="baby photo" />
      </div>
      <div class="intro__logo">
        <img src="https://drive.google.com/uc?id=1oz4Vx1YbIFkGh07idbr9yN79XF9pSxpw" alt="Claire turns 30">
      </div>
      <div class="photo">
        <img src="https://drive.google.com/uc?id=1KsLDDmUXZNRXCNmCLKcvEJgIaLBbbgiZ" alt="baby photo" />
      </div>
    </div>
    <div v-if="!selectedRecipe" class="tabs is-centered">
      <ul>
        <li v-for="category in categories" @click="selectedCategory = category.id" :class="{ 'is-active': category.id === selectedCategory }"><a>{{ category.name }}</a></li>
      </ul>
    </div>
    <div class="body">
      <recipe-details @back="selectedRecipe = null" v-if="selectedRecipe" :recipe="selectedRecipe"></recipe-details>
      <div class="recipe-box" v-if="!selectedRecipe">
        <recipe-thumbnail v-for="recipe in filteredRecipes" :recipe="recipe" @recipeSelected="selectRecipe($event)" />
      </div>
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
  recipes: Array<Object> = [];
  errors: [] = [];
  selectedRecipe: Object | null = null;
  selectedCategory: string | null = null;

  categories: Array<Object> = [
    {
      id: '',
      name: 'All',
    },
    {
      id: 'Breakfast/Brunch',
      name: 'Breakfast',
    },
    {
      id: 'Main Course',
      name: 'Main Course',
    },
    {
      id: 'Small Plate',
      name: 'Small Plate',
    },
    {
      id: 'Drink',
      name: 'Drink',
    },
    {
      id: 'Pudding',
      name: 'Pudding',
    },
  ];

  mounted() {
    axios
      .get(
        `https://jsteele883.api.stdlib.com/claire-recipes@dev/all_recipes/`
      )
      .then(response => {
        this.recipes = response.data;
      })
  }

  get filteredRecipes(): Array<Object> {
    if (this.selectedCategory) {
      // @ts-ignore
      const categoryRecipes = this.recipes.filter(recipe => recipe.category === this.selectedCategory);
      return this.shuffle(categoryRecipes);
    }
    return this.shuffle(this.recipes);
  }

  selectRecipe(recipe: Object) {
    this.selectedRecipe = recipe;
    window.scrollTo(0,0);
  }

  shuffle(array: Array<Object>) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
}
</script>

<style lang="scss">
.wrapper {
  font-family: Karla, Georgia, Times, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.body {
  margin: 1em;
}
.intro {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #feefd9;
  .intro__logo img {
    width: 400px;
    padding: 10px;
  }
  .intro__text {
    padding: 1em;
    text-align: center;
  }
  img {
    width: 600px;
    max-width: 100%;
  }
  .photo img {
    height: 350px;
    object-fit: cover;
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
    .bottom-image {
      display: none;
    }
  }
}
.recipe-box {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 1em;
  padding-top: 1em;
  margin-left: 2em;
  margin-right: 3em
}
.thumb {
  width: 100%;
}
</style>
