/**
 * Photography — licensed, self-hosted, recorded here (as qeet.in keeps its own
 * in config/media.ts). These are qeet.in's own Qeet ID photographs, so the
 * product site and the group site share one picture of the product. Set in
 * monochrome on the page, so the only saturated colour stays Ember.
 */
export type Photo = {
  src: string;
  width: number;
  height: number;
  /** Who made it, and where it is licensed from — provenance, kept here. */
  author: string;
  source: string;
  licence: "Unsplash Licence";
  /** Where it was taken — the only part printed, as a photograph's caption. */
  caption: string;
};

export const MEDIA = {
  /** A stone gateway at the end of a garden path, Delhi — "one way in". qeet.in: HOME_MEDIA.identitySpotlight. */
  gateway: {
    src: "/media/gateway.jpg",
    width: 2200,
    height: 1481,
    author: "Zoshua Colah",
    source: "https://unsplash.com/photos/1hGjwxmaFdc",
    licence: "Unsplash Licence",
    caption: "A stone gateway at the end of a garden path, Delhi",
  },
  /** Through a carved stone archway, New Delhi — arches within arches. qeet.in: HOME_MEDIA.identityTile. */
  archway: {
    src: "/media/archway.jpg",
    width: 1800,
    height: 1026,
    author: "Zoshua Colah",
    source: "https://unsplash.com/photos/DJtu98LSMAc",
    licence: "Unsplash Licence",
    caption: "Through a carved stone archway, New Delhi",
  },
} as const satisfies Record<string, Photo>;
