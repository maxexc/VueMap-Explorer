<template>
  <main class="flex h-screen">
    <section
      class="flex-1 flex bg-backgroundMain justify-center items-center relative overflow-hidden"
    >
      <div class="absolute inset-0 z-2 flex sm:flex-none items-center">
        <img
          src="assets/img/BlankMap-World-min.png"
          alt="World Map"
          class="h-full sm:h-3/5 w-full object-cover"
        />
      </div>
      <div class="relative z-10 text-white px-5 max-w-[500px] w-full">
        <slot></slot>
      </div>
    </section>
    <section class="flex-1 hidden sm:block">
      <img class="h-full w-full object-cover" src="assets/img/static-map.png" alt="" />
    </section>
  </main>
</template>
