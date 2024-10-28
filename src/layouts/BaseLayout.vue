<template>
  <main class="flex h-screen">
    <section class="flex-1 flex bg-primary justify-center items-center">
      <div class="text-white px-5 max-w-[508px] w-full">
        <slot></slot>
      </div>
    </section>
    <section class="flex-1">
      <img class="h-full w-full object-cover" src="../assets/img/static-map.png" alt="" />
    </section>
  </main>
</template>
