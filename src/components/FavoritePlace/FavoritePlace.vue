<script setup>
import FavoritePlaceIconButton from './FavoritePlaceIconButton.vue'
import DeleteIcon from './DeleteIcon.vue'
import EditIcon from './EditIcon.vue'
</script>

<template>
  <section class="text-grey mb-6 last:mb-0">
    <div class="flex gap-4">
      <img class="w-[76px] h-[76px] shrink-0" src="../../assets/img/Alexanderplatz.jpg" alt="" />
      <div class="w-full">
        <div class="flex justify-between items-center mb-2">
          <h2 class="font-bold text-border">Alexanderplatz</h2>
          <div class="flex gap-2">
            <FavoritePlaceIconButton><EditIcon /></FavoritePlaceIconButton>
            <FavoritePlaceIconButton><DeleteIcon /></FavoritePlaceIconButton>
          </div>
        </div>
        <p class="text-xs line-clamp-3">
          Alexanderplatz is a square on the north-eastern edge of the historic centre of Berlin. The
          rectangular square in the Mitte district dates back to the square in front of the Königs
          Thor and was given its current name in 1805 after the Russian Tsar Alexander I.
        </p>
      </div>
    </div>
  </section>
</template>
