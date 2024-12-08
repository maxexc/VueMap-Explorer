<script setup>
defineProps({
  is3DEnabled: Boolean
})

const emit = defineEmits(['toggle3D'])

const toggle3D = () => {
  emit('toggle3D')
}
</script>

<template>
  <button
    v-button-animation
    @click="toggle3D"
    class="z-10 top-[90px] right-[10px] bg-transparent rounded border-none cursor-pointer flex flex-col items-center gap-2 hover:bg-white"
  >
    <div
      class="icon"
      :class="[
        'w-[40px] h-[40px] justify-center p-[2.5px] rounded border shadow-md',
        is3DEnabled ? 'border-orange-300' : 'border-gray-200'
      ]"
      style="backdrop-filter: blur(10px); background-color: rgba(255, 255, 255, 0.88)"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="pl-[0.4px]" viewBox="0 0 512 512">
        <defs>
          <linearGradient id="grad3dOn" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color: #ffa279; stop-opacity: 1" />
            <stop offset="100%" style="stop-color: #f3743d; stop-opacity: 1" />
          </linearGradient>
        </defs>
        <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
          <path
            :fill="is3DEnabled ? 'url(#grad3dOn)' : '#5e5e5e'"
            d="M1280 4646 l-1275 -473 0 -1613 0 -1612 845 -314 c465 -172 848 -313
            853 -314 4 0 6 96 5 212 l-3 213 -650 241 -650 240 -3 1258 -2 1258 22 -6 c13
            -3 453 -165 978 -359 l955 -354 3 -402 2 -401 200 0 200 0 2 401 3 401 955
            354 c525 195 965 357 978 360 l22 6 0 -785 0 -784 63 -23 c92 -33 172 -76 260
            -136 l77 -55 -2 1108 -3 1107 -1275 473 c-701 260 -1277 472 -1280 472 -3 0
            -579 -213 -1280 -473z m2184 -287 c839 -310 875 -325 846 -337 -101 -42 -1734
            -642 -1748 -642 -9 0 -415 147 -901 327 -708 262 -879 329 -860 335 13 5 411
            152 884 328 473 176 870 318 882 316 12 -2 416 -149 897 -327z"
          />
          <path
            :fill="is3DEnabled ? 'url(#grad3dOn)' : '#5e5e5e'"
            d="M2120 1620 l0 -200 288 -1 287 0 -132 -127 -133 -128 0 -117 c0 -71
          4 -117 10 -117 18 0 254 -113 350 -168 111 -63 235 -153 250 -182 22 -42 -34
          -128 -105 -161 -37 -17 -72 -19 -427 -19 l-388 0 0 -200 0 -200 403 0 c371 0
          410 2 482 20 211 54 372 217 426 431 29 112 23 193 -20 284 -52 112 -209 252
          -426 380 -15 9 11 38 189 210 l206 199 0 148 0 148 -630 0 -630 0 0 -200z"
          />
          <path
            :fill="is3DEnabled ? 'url(#grad3dOn)' : '#5e5e5e'"
            d="M3780 910 l0 -911 378 3 377 4 80 27 c115 38 199 91 290 182 91 91
          143 174 183 290 l27 80 0 325 0 325 -27 80 c-40 116 -92 199 -183 290 -91 91
          -175 144 -290 182 l-80 27 -377 4 -378 3 0 -911z m768 471 c70 -38 100 -69
          140 -145 l27 -51 0 -275 0 -275 -27 -51 c-40 -76 -70 -107 -140 -145 -62 -33
          -64 -34 -215 -37 l-153 -4 0 512 0 512 153 -4 c151 -3 153 -4 215 -37z"
          />
        </g>
      </svg>
      <span
        :class="is3DEnabled ? 'text-orange-600' : 'text-gray-600'"
        class="text-xs font-bold tracking-wider"
        >{{ is3DEnabled ? '3D On' : '3D Off' }}</span
      >
    </div>
  </button>
</template>

<style scoped>
.button-on .icon {
  fill: url(#grad3dOn);
}

.button-off .icon {
  fill: #5e5e5e;
}

span {
  display: block;
  margin-left: -5px;
  margin-right: -5px;
  padding-top: 10px;
  text-align: center;
  text-shadow: 0.5px 0.2px 1px #eeeeeef1;
}

.button-on span {
  color: #f3743d;
}
</style>
