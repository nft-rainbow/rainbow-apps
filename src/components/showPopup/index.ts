export * from './Toast';

let currentPopup: string | number | null = null;

export const recordCurrentPopup = (popupId: string | number) => (currentPopup = popupId);
export const recordToHidePopup = () => {
  const currentPopupNow = currentPopup;
  return () => {
    if (currentPopup !== currentPopupNow ) return;
    history.back();
  };
};

export const hideAll = () => history.back();
