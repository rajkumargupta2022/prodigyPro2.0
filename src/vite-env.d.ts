/// <reference types="vite/client" />

declare module "*.mpeg" {
  const src: string;
  export default src;
}

declare module "*.mp3.mpeg" {
  const src: string;
  export default src;
}

