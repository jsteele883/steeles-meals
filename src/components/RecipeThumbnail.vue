<template>
  <article @click="goToRecipe">
    <img class="thumb" :src="firstPhoto(recipe.food_photo)" />
    <h4 class="title is-4">{{ recipe.name }} by 👨‍🍳 {{ recipe.author }}</h4>
    <p>{{ recipe.message }}</p>
  </article>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class RecipeThumbnail extends Vue {
  @Prop({ type: Object }) recipe: any;

  goToRecipe() {
    console.log('go');
    this.$emit('recipeSelected', this.recipe)
  }

  firstPhoto(imageSrc: string) {
    let firstPhoto = imageSrc.split(",")[0];
    return firstPhoto.replace("open", "uc");
  }
}
</script>

<style scoped>
article {
  cursor: pointer;
}
</style>
