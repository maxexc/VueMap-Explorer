<template>
  <button v-button-animation title="Toggle Route Layer">
    <div
      class="w-[42px] h-[42px] sm:w-[32px] sm:h-[32px] md:w-[32px] md:h-[32px] lg:w-[42px] lg:h-[42px]"
    >
      <svg version="1.0" viewBox="0 0 64 64">
        <g fill="#000">
          <path
            d="M50.69 62.30 c-3.83 -0.56 -6.80 -2.41 -8.79 -5.45 -2.10 -3.24 -2.50 -7.47 -1.02 -11.04 0.81 -1.95 2.58 -4.11 4.30 -5.30 0.96 -0.66 2.81 -1.49 4.03 -1.77 1.56 -0.39 3.91 -0.39 5.47 0 4.29 1.05 7.68 4.38 8.85 8.66 0.41 1.51 0.41 4.45 0 5.96 -0.75 2.74 -2.56 5.32 -4.82 6.88 -0.95 0.65 -2.81 1.49 -3.95 1.76 -1.02 0.25 -3.29 0.41 -4.06 0.30z m3.56 -2.67 c3.42 -0.98 6.14 -3.78 7.01 -7.25 0.86 -3.41 -0.75 -7.50 -3.81 -9.68 -3.54 -2.51 -7.47 -2.53 -11.02 -0.01 -3.08 2.19 -4.69 6.26 -3.81 9.69 0.65 2.58 2.11 4.60 4.38 6.06 2.25 1.45 4.81 1.88 7.26 1.19z"
          />
          <path
            d="M47.75 50.74 l0 -6.89 3.35 0.05 c4.01 0.08 4.63 0.21 5.65 1.20 0.71 0.70 0.88 1.17 0.88 2.63 0 1.23 -0.19 1.76 -0.82 2.34 l-0.45 0.41 0.35 0.19 c0.93 0.47 1.30 1.29 1.30 2.75 0 1.83 -0.60 2.88 -2.04 3.59 -1.02 0.50 -2.03 0.61 -5.43 0.63 l-2.79 0 0 -6.89z m6.24 3.88 c0.89 -0.50 1.11 -1.49 0.47 -2.09 -0.44 -0.41 -0.94 -0.55 -2.30 -0.61 l-1.29 -0.08 0 1.60 0 1.60 1.30 -0.06 c1.04 -0.06 1.40 -0.13 1.81 -0.36z m-0.80 -5.25 c1.02 -0.28 1.51 -1.10 1.13 -1.91 -0.29 -0.61 -0.88 -0.85 -2.28 -0.93 l-1.16 -0.06 0 1.52 0 1.51 0.91 0 c0.49 0 1.13 -0.06 1.40 -0.14z"
          />
          <path
            d="M10.25 25.55 c-4.45 -0.89 -7.78 -3.56 -9.36 -7.55 -0.99 -2.50 -1.05 -5.69 -0.16 -8.25 0.57 -1.66 1.39 -2.96 2.70 -4.35 1.58 -1.65 3.47 -2.78 5.66 -3.36 1.67 -0.44 4.07 -0.46 5.70 -0.06 2.19 0.55 3.96 1.52 5.57 3.08 2.42 2.35 3.67 5.29 3.66 8.64 -0.03 5.39 -3.46 9.94 -8.71 11.51 -0.95 0.28 -1.40 0.34 -2.94 0.36 -1 0.03 -1.95 0.01 -2.13 -0.01z m4.10 -2.67 c3.97 -1.10 6.97 -4.74 7.24 -8.75 0.22 -3.50 -2.03 -7.25 -5.36 -8.93 -2.13 -1.06 -4.15 -1.34 -6.18 -0.82 -5.25 1.31 -8.66 6.88 -7.18 11.68 1.17 3.75 4.13 6.38 7.97 7.07 0.85 0.16 2.45 0.04 3.50 -0.25z"
          />
          <path
            d="M5.63 19.29 c0.01 -0.31 0.88 -2.67 2.50 -6.79 l2.47 -6.31 1.58 -0.04 c1.46 -0.03 1.58 -0.01 1.70 0.22 0.41 0.79 5 12.70 5 13.01 l0 0.36 -1.46 0 c-0.81 0 -1.55 -0.05 -1.64 -0.11 -0.10 -0.05 -0.41 -0.74 -0.71 -1.52 l-0.52 -1.42 -2.31 -0.04 -2.31 -0.03 -0.46 1.29 c-0.69 1.94 -0.56 1.84 -2.34 1.84 l-1.49 0 0 -0.46z m7.61 -6.19 c-0.21 -0.57 -0.49 -1.31 -0.61 -1.66 -0.13 -0.34 -0.26 -0.73 -0.31 -0.86 -0.08 -0.16 -0.26 0.21 -0.71 1.44 -0.32 0.93 -0.64 1.77 -0.68 1.89 -0.06 0.20 0.05 0.22 1.31 0.22 l1.38 0 -0.38 -1.02z"
          />
        </g>
        <g fill="#000">
          <path
            d="M18.44 51.67 c-0.47 -0.11 -1 -0.28 -1.16 -0.38 -0.61 -0.40 -0.60 -1.21 0.04 -1.63 0.29 -0.19 0.40 -0.20 0.98 -0.05 0.36 0.09 1.42 0.19 2.36 0.24 1.51 0.06 1.75 0.11 1.98 0.34 0.36 0.36 0.36 0.98 0 1.36 -0.29 0.30 -0.35 0.31 -1.80 0.30 -0.84 0 -1.90 -0.09 -2.39 -0.19z"
          />
          <path
            d="M25.50 51.56 c-0.36 -0.39 -0.36 -1 0 -1.36 0.24 -0.25 0.41 -0.26 2.69 -0.30 l2.44 -0.04 0.38 0.38 c0.46 0.45 0.49 0.91 0.06 1.33 -0.30 0.31 -0.31 0.31 -2.79 0.31 -2.47 0 -2.49 0 -2.78 -0.31z"
          />
          <path
            d="M33.94 51.56 c-0.41 -0.41 -0.40 -0.88 0.05 -1.33 0.36 -0.35 0.40 -0.36 1.60 -0.36 1.36 0 1.76 0.14 2.01 0.66 0.19 0.40 0.11 0.75 -0.26 1.09 -0.22 0.21 -0.44 0.25 -1.67 0.25 -1.35 0 -1.44 -0.01 -1.73 -0.31z"
          />
          <path
            d="M13.75 49.20 c-0.88 -0.50 -2.75 -3.53 -2.75 -4.45 0 -0.36 0.55 -0.88 0.94 -0.88 0.57 0 0.79 0.22 1.35 1.41 0.30 0.63 0.82 1.46 1.15 1.83 0.32 0.38 0.64 0.81 0.70 0.98 0.29 0.77 -0.65 1.52 -1.39 1.11z"
          />
          <path
            d="M10.88 41.31 c-0.25 -0.28 -0.30 -0.44 -0.28 -1.02 0.08 -1.64 0.91 -4.05 1.58 -4.47 0.38 -0.25 0.84 -0.17 1.20 0.19 0.35 0.35 0.31 0.71 -0.14 1.67 -0.25 0.54 -0.47 1.31 -0.61 2.16 -0.17 1.06 -0.28 1.39 -0.50 1.56 -0.40 0.32 -0.90 0.29 -1.25 -0.09z"
          />
          <path
            d="M14.77 34.21 c-0.39 -0.41 -0.35 -0.96 0.08 -1.36 0.85 -0.82 3.94 -1.90 4.80 -1.69 0.34 0.09 0.73 0.63 0.73 1.01 0 0.45 -0.55 0.81 -1.50 1 -0.56 0.11 -1.39 0.41 -2.06 0.76 -1.27 0.64 -1.65 0.69 -2.04 0.28z"
          />
          <path
            d="M22.95 32.74 c-0.40 -0.31 -0.44 -0.94 -0.09 -1.38 0.24 -0.29 0.30 -0.30 2.53 -0.34 1.25 -0.03 2.41 -0.01 2.56 0.03 0.76 0.20 1.04 1.10 0.49 1.64 -0.30 0.31 -0.31 0.31 -2.72 0.31 -2.26 0 -2.45 -0.01 -2.76 -0.26z"
          />
          <path
            d="M31.31 32.69 c-0.55 -0.54 -0.28 -1.44 0.49 -1.64 0.15 -0.04 1.31 -0.05 2.56 -0.03 2.22 0.04 2.29 0.05 2.53 0.34 0.35 0.44 0.31 1.06 -0.09 1.38 -0.31 0.25 -0.50 0.26 -2.76 0.26 -2.41 0 -2.42 0 -2.72 -0.31z"
          />
          <path
            d="M39.72 32.63 c-0.44 -0.45 -0.41 -0.89 0.10 -1.34 0.30 -0.28 0.40 -0.29 2.69 -0.29 l2.39 0 0.36 0.36 c0.39 0.40 0.44 0.63 0.21 1.05 -0.29 0.55 -0.43 0.57 -2.95 0.59 l-2.42 0 -0.38 -0.38z"
          />
          <path
            d="M48.19 32.69 c-0.38 -0.36 -0.40 -0.93 -0.08 -1.33 0.24 -0.29 0.30 -0.30 2.53 -0.34 1.25 -0.03 2.41 -0.01 2.58 0.04 0.77 0.19 1.04 1.08 0.47 1.63 -0.30 0.31 -0.31 0.31 -2.75 0.31 -2.44 0 -2.45 0 -2.75 -0.31z"
          />
          <path
            d="M56.50 32.13 c-0.30 -0.30 -0.34 -1.02 -0.06 -1.30 0.10 -0.10 0.60 -0.38 1.10 -0.63 0.54 -0.25 1.27 -0.76 1.81 -1.25 0.96 -0.88 1.34 -1 1.86 -0.64 0.36 0.25 0.49 0.86 0.25 1.23 -0.75 1.15 -3.30 2.84 -4.30 2.84 -0.25 0 -0.51 -0.10 -0.66 -0.25z"
          />
          <path
            d="M61.88 26.04 c-0.20 -0.26 -0.25 -0.45 -0.19 -0.73 0.28 -1.41 0.34 -2.22 0.20 -3.21 -0.13 -0.94 -0.13 -1.06 0.09 -1.34 0.35 -0.47 0.85 -0.60 1.26 -0.30 0.49 0.36 0.65 1.04 0.65 2.60 -0.01 1.50 -0.22 2.69 -0.57 3.06 -0.35 0.39 -1.10 0.34 -1.44 -0.09z"
          />

          <path
            d="M59.78 17.64 c-0.49 -0.47 -1.29 -1.10 -1.80 -1.40 -1.08 -0.63 -1.23 -0.79 -1.23 -1.30 0 -0.49 0.45 -0.94 0.94 -0.94 0.85 0 3.39 1.85 4.09 2.97 0.29 0.47 0.24 0.89 -0.17 1.27 -0.50 0.46 -0.88 0.34 -1.83 -0.61z"
          />
          <path
            d="M25.51 14.80 c-0.15 -0.19 -0.26 -0.46 -0.26 -0.61 0 -0.15 0.11 -0.43 0.26 -0.61 0.25 -0.31 0.29 -0.32 1.67 -0.32 0.77 0 1.51 0.04 1.63 0.08 0.56 0.22 0.60 1.39 0.06 1.67 -0.13 0.08 -0.88 0.13 -1.67 0.13 -1.40 0 -1.44 -0.01 -1.69 -0.32z"
          />
          <path
            d="M31.96 14.98 c-0.36 -0.29 -0.49 -0.82 -0.28 -1.21 0.10 -0.20 0.28 -0.39 0.38 -0.44 0.11 -0.04 1.33 -0.08 2.69 -0.08 l2.49 0 0.25 0.32 c0.35 0.44 0.32 0.86 -0.05 1.24 -0.30 0.31 -0.31 0.31 -2.79 0.31 -1.79 0 -2.54 -0.04 -2.69 -0.15z"
          />
          <path
            d="M40.28 14.84 c-0.36 -0.39 -0.36 -0.96 0.01 -1.31 0.28 -0.26 0.40 -0.28 2.79 -0.28 2.46 0 2.51 0 2.78 0.29 0.36 0.39 0.36 0.96 -0.01 1.31 -0.28 0.26 -0.40 0.28 -2.79 0.28 -2.46 0 -2.51 0 -2.78 -0.29z"
          />
          <path
            d="M48.69 14.81 c-0.38 -0.38 -0.40 -0.80 -0.05 -1.24 l0.25 -0.32 2.49 0 c1.36 0 2.58 0.04 2.69 0.08 0.10 0.05 0.29 0.25 0.39 0.45 0.16 0.31 0.16 0.44 0.04 0.74 -0.08 0.21 -0.25 0.43 -0.38 0.49 -0.13 0.08 -1.33 0.13 -2.67 0.13 -2.44 0 -2.45 0 -2.75 -0.31z"
          />
        </g>
        <g fill="#fbad4a">
          <path
            d="M10.48 23.50 c-2.54 -0.46 -4.84 -1.85 -6.31 -3.81 -1.27 -1.69 -1.90 -3.41 -2 -5.51 -0.15 -3.09 0.90 -5.66 3.17 -7.81 1.19 -1.11 2.78 -1.98 4.34 -2.36 1.35 -0.34 3.42 -0.34 4.78 0 2.86 0.71 5.39 2.81 6.68 5.53 0.99 2.09 1.15 4.95 0.40 7.18 -1.10 3.25 -3.58 5.64 -6.80 6.55 -1.02 0.30 -3.30 0.43 -4.25 0.25z m-2.05 -4.39 c0.10 -0.15 0.39 -0.85 0.65 -1.58 l0.46 -1.29 2.69 0.03 2.69 0.04 0.52 1.42 c0.30 0.79 0.61 1.48 0.71 1.52 0.09 0.06 0.65 0.11 1.25 0.11 1.09 0 1.09 0 0.99 -0.28 -1.05 -2.70 -4.79 -12.16 -4.89 -12.35 -0.13 -0.24 -0.24 -0.25 -1.33 -0.22 l-1.20 0.04 -2.41 6.16 c-1.34 3.39 -2.46 6.28 -2.50 6.40 -0.08 0.24 -0.01 0.25 1.05 0.25 1 0 1.14 -0.03 1.31 -0.26z"
          />
          <path
            d="M10.25 14.40 c0 -0.05 0.26 -0.80 0.57 -1.66 0.32 -0.85 0.76 -2.08 0.99 -2.71 l0.40 -1.17 0.51 1.42 c0.28 0.77 0.74 2.05 1.01 2.83 l0.51 1.40 -2 0 c-1.10 0 -2 -0.05 -2 -0.10z"
          />
        </g>
        <g fill="#85d839">
          <path
            d="M50 60.20 c-3.63 -0.76 -6.55 -3.41 -7.61 -6.89 -1.65 -5.36 1.48 -11.02 6.95 -12.59 1.39 -0.40 3.81 -0.40 5.20 0 3.26 0.94 5.76 3.29 6.88 6.50 0.32 0.95 0.39 1.30 0.44 2.78 0.05 1.45 0.01 1.85 -0.21 2.75 -0.88 3.47 -3.58 6.26 -7.01 7.25 -1.20 0.35 -3.46 0.44 -4.63 0.20z m3.88 -3.08 c2.33 -0.30 3.75 -1.73 3.75 -3.74 -0.01 -1.27 -0.56 -2.06 -1.81 -2.58 l-0.73 -0.29 0.43 -0.22 c1.21 -0.61 1.74 -1.40 1.74 -2.56 0 -1.08 -0.21 -1.61 -0.88 -2.26 -1 -0.96 -1.67 -1.11 -5.28 -1.19 l-2.97 -0.08 0 6.53 0 6.51 2.41 0 c1.31 0 2.83 -0.06 3.34 -0.13z"
          />
          <path
            d="M50.50 53.44 l0 -1.98 1.66 0.06 c2.38 0.09 2.96 0.40 3.06 1.65 0.08 0.89 -0.20 1.44 -0.88 1.83 -0.46 0.26 -0.74 0.30 -2.19 0.35 l-1.66 0.06 0 -1.98z"
          />
          <path
            d="M50.50 47.99 l0 -1.89 1.54 0.05 c1.11 0.04 1.65 0.11 1.99 0.28 0.61 0.30 0.90 0.90 0.82 1.79 -0.11 1.26 -0.85 1.66 -3.09 1.66 l-1.26 0 0 -1.89z"
          />
        </g>
      </svg>
    </div>
  </button>
</template>
