<template>
  <article @click="goToRecipe">
    <img class="thumb" :src="firstPhoto(recipe.food_photo)" />
    <h4 class="title is-4">{{ capitalize(recipe.name) }}</h4>
    <h6 class="subtitle is-6">👨‍🍳 {{ recipe.author }}</h6>
    <p>{{ recipe.message }}</p>
  </article>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class RecipeThumbnail extends Vue {
  @Prop({ type: Object }) recipe: any;

  goToRecipe() {
    this.$emit('recipeSelected', this.recipe)
  }

  capitalize(string: string): string {

    return string.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))).replace('And', '&');
  }

  firstPhoto(imageSrc: string) {
    let firstPhoto = imageSrc.split(",")[0];
    return firstPhoto.replace("open", "uc");
  }
}
</script>

<style scoped lang="scss">
article {
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    opacity: 0.8;
  }
  img {
    height: 300px;
    object-fit: cover;
  }
}
.subtitle {
  margin-bottom: .75em;
}
</style>
