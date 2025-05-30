// loaderController.ts
let showLoaderFn: (() => void) | null = null;
let hideLoaderFn: (() => void) | null = null;

export const registerLoaderCallbacks = (
  show: () => void,
  hide: () => void
) => {
  showLoaderFn = show;
  hideLoaderFn = hide;
};

export const showLoader = () => {
  if (showLoaderFn) showLoaderFn();
};

export const hideLoader = () => {
  if (hideLoaderFn) hideLoaderFn();
};
