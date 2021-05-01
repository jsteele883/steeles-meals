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
      <div class="instructions__column instructions__ingredients">
        <h5 class="title is-five">Ingredients</h5>
        <p>{{ recipe.ingredients }}</p>
      </div>
      <div class="instructions__column instructions__preparation">
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
    return firstPhoto.replace("open", "uc").replace("/view?usp=sharing", "").replace("/file/d/", "/uc?id=");
  }
}
</script>

<style lang="scss" scoped>
.header {
  @media screen and (min-width: 768px) {
    display: grid;
    grid-column-gap: 1em;
    grid-template-columns: 1fr 3fr;
  }
  padding-top: 1em;
  .header__image {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    img {
      max-height: 600px;
      width: auto;
    }
  }
  .header__description {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    padding: 2em;
    @media screen and (min-width: 768px) {
      h2 {
        font-size: 2.75em;
        line-height: 100%;
      }
    }
  }
}

img {
  width: 600px;
  max-width: 100%;
}

.message {
  text-align: center;
  padding: 1em;
  background-color: #F6EEEB;
  border-radius: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  p {
    font-size: 1.5em;
    margin: 1em 0;
    max-width: 800px;
  }
  image {
    max-width: 600px;
    height: auto;
  }
}

.instructions {
  @media screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-column-gap: 1em;
  }
  .instructions__column {
    padding: 1em 0;
  }
  p {
    white-space: pre-wrap;
  }
}
</style>
