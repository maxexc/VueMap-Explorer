<script setup>
import HomepageView from './views/HomepageView.vue'
</script>

<script>
export default {
  data() {
    return {
      likes: 0
    }
  },
  methods: {
    plusClick() {
      this.likes++
    }
  }
}
</script>

<template>
  <HomepageView />

  <footer class="fixed bottom-1 left-0 right-0 text-center mt-12">
    <p class="text-sm">&copy; Created by maxexc</p>
  </footer>
</template>
