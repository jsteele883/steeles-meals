<template>
  <div>
    <button class="button" @click="$emit('back')">← More Recipes</button>
    <div class="header">
      <div class="header__image">
        <img :src="firstPhoto(recipe.food_photo)">
      </div>
      <div class="header__description">
        <h2 class="title is-two">{{ recipe.name }}</h2>
        <p>{{ recipe.blurb }}</p>
        <p><strong>Serves:</strong> {{ recipe.serving }} 🧍</p>
      </div>
    </div>
    <div class="message">
      <p>{{ recipe.message }}</p>
      <img :src="firstPhoto(recipe.chef_photo)">
    </div>
    <div class="instructions">
      <div class="instructions__ingredients">
        <h5 class="title is-five">Ingredients</h5>
        <p>{{ recipe.ingredients }}</p>
      </div>
      <div class="instructions__preparation">
        <h5 class="title is-five">Preparation</h5>
        <p>{{ recipe.instructions }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "recipe-details"
})
export default class RecipeDetails extends Vue {
  @Prop({ type: Object }) recipe: any;

  firstPhoto(imageSrc: string) {
    let firstPhoto = imageSrc.split(",")[0];
    return firstPhoto.replace("open", "uc");
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 1em;
  padding-top: 1em;
  .header__image {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .header__description {
    h3 {
      font-size: 2.75em;
      line-height: 100%;
    }
  }
}

img {
  max-width: 100%;
}

.message {
  text-align: center;
  padding: 1em;
  p {
    font-size: 1.5em;
    margin: 1em 0;
  }
}

.instructions {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-column-gap: 1em;
  p {
    white-space: pre-wrap;
  }
}
</style>
