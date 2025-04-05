<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper-bundle.css'
import { ref, watch, computed, onMounted, onBeforeUnmount } from 'vue'
import { EffectCoverflow, Keyboard, Mousewheel, Navigation } from 'swiper/modules'
import { useRouteStore } from '../../stores/routeStore'
import { storeToRefs } from 'pinia'

const routeStore = useRouteStore()
const { isIOS } = storeToRefs(routeStore)

const props = defineProps({
  markers: {
    type: Array,
    required: true
  },
  activeMarkerId: {
    type: [String, Number],
    default: null
  },
  isMobile: {
    type: Boolean,
    required: true
  },
  cardComponent: {
    type: [String, Object],
    required: true
  }
})

const emit = defineEmits(['marker-selected', 'edit', 'delete'])
let swiperInstance = null

const findSlideIndexById = (id) => {
  return props.markers.findIndex((marker) => marker.id === id)
}

const onCardClick = (markerId) => {
  emit('marker-selected', markerId)
}

const windowWidth = ref(window.innerWidth)
const windowHeight = ref(window.innerHeight)

function updateDimensions() {
  windowWidth.value = window.innerWidth
  windowHeight.value = window.innerHeight
}

onMounted(() => {
  window.addEventListener('resize', updateDimensions)
  updateDimensions()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateDimensions)
})

watch(
  () => props.activeMarkerId,
  (newId) => {
    if (swiperInstance) {
      const index = findSlideIndexById(newId)
      if (index !== -1 && index !== swiperInstance.realIndex) {
        swiperInstance.slideToLoop(index)
      }
    }
  }
)

const swiperDynamicSettings = computed(() => {
  let slidesPerView = 3
  let spaceBetween = 20
  let depth = props.isMobile ? 150 : 30
  let modifier = 2.5
  let effect = 'coverflow'

  if (!props.isMobile) {
    if (windowHeight.value <= 380) {
      slidesPerView = 2.78
    } else if (windowHeight.value > 380 && windowHeight.value < 450) {
      slidesPerView = 3.1
    } else if (windowHeight.value >= 450 && windowHeight.value < 640) {
      slidesPerView = 3.7
    } else if (windowHeight.value >= 640 && windowHeight.value < 810) {
      slidesPerView = 5.3
      depth = 7
      modifier = 3.5
    } else if (windowHeight.value >= 810 && windowHeight.value < 1025) {
      slidesPerView = 6.5
      depth = 7
      modifier = 3.5
      effect = 'slide'
    } else {
      slidesPerView = 9
      depth = 7
      modifier = 2
      spaceBetween = 10
      effect = 'slide'
    }
  }

  return {
    slidesPerView,
    spaceBetween,
    depth,
    modifier,
    effect
  }
})

const swiperSettings = computed(() => ({
  effect: !props.isMobile && isIOS.value ? 'slide' : swiperDynamicSettings.value.effect,
  slidesPerView: swiperDynamicSettings.value.slidesPerView,
  grabCursor: true,
  centeredSlides: true,
  spaceBetween: isIOS.value ? 10 : swiperDynamicSettings.value.spaceBetween,
  loop: true,
  direction: props.isMobile ? 'horizontal' : 'vertical',
  class: props.isMobile ? 'slider-vertical' : 'slider-horisontal',
  preventClicks: false,
  preventClicksPropagation: false,
  touchStartPreventDefault: false,
  touchMoveStopPropagation: false,
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: isIOS.value ? 0 : swiperDynamicSettings.value.depth,
    modifier: swiperDynamicSettings.value.modifier,
    slideShadows: false
  }
}))
</script>

<template>
  <Swiper
    v-bind="swiperSettings"
    :modules="[Mousewheel, Navigation, EffectCoverflow, Keyboard]"
    class="marker-slider"
    :mousewheel="{
      forceToAxis: true,
      sensitivity: 1,
      eventsTarget: '.marker-slider'
    }"
    @swiper="
      (swiper) => {
        swiperInstance = swiper
      }
    "
  >
    <SwiperSlide
      v-for="marker in markers"
      :key="marker.id"
      @click="onCardClick(marker.id)"
      :class="{ 'px-[2px]': !isMobile }"
    >
      <component
        :is="cardComponent"
        :id="marker.id"
        :title="marker.title"
        :description="marker.description"
        :coordinates="marker.coordinates"
        :img="marker.img"
        :isActive="marker.id === activeMarkerId"
        @edit="$emit('edit', marker.id)"
        @delete="$emit('delete', marker.id)"
      />
    </SwiperSlide>
  </Swiper>
</template>

<style scoped>
.marker-slider {
  z-index: 1;
  background: transparent;

  touch-action: pan-y;
}
.slider-horisontal {
  height: calc(100vh - 74px);
}
@media (min-width: 869px) and (max-width: 1023px) {
  .slider-horisontal {
    height: calc(100vh - 58px);
  }
}
.slider-vertical {
  padding: 2px 0;
  height: unset;
}
.marker-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.marker-card::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  right: 0;
  height: 20px;
  background: linear-gradient(rgba(0, 0, 0, 0.1), transparent);
  border-radius: 12px;
  opacity: 0.5;
  transform: scaleY(-1);
}
</style>
