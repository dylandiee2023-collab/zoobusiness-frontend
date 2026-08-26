import type {
  ContainerMap,
} from "./types";

export const containers: ContainerMap = {
  mobile: {
    maxWidth: 480,
    padding: 16,
  },

  mobileLg: {
    maxWidth: 640,
    padding: 20,
  },

  tablet: {
    maxWidth: 768,
    padding: 24,
  },

  laptop: {
    maxWidth: 1024,
    padding: 32,
  },

  desktop: {
    maxWidth: 1280,
    padding: 40,
  },

  wide: {
    maxWidth: 1536,
    padding: 48,
  },
};