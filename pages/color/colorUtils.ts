export const COLOR_STORAGE_KEY = 'userSelectedColor';

export const getStoredColor = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(COLOR_STORAGE_KEY) || '#208D8E';
  }
  return '#208D8E';
};

export const saveColor = (color: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(COLOR_STORAGE_KEY, color);
  }
};