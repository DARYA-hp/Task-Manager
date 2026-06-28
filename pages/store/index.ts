import { configureStore } from '@reduxjs/toolkit';
import profileReducer from "./features/profile/profileSlice";
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('userProfile');
    if (serializedState === null) {
      return undefined; 
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const defaultState = {
  activeTab: 'profile1' as const,
  user: {
    name: 'نیلوفر موجودی',
    email: 'niloofar@example.com',
    avatar: '/girl.jpg',
  }
};

const preloadedState = loadState() || defaultState;

export const store = configureStore({
  reducer: {
    profile: profileReducer,
  },
  preloadedState: {
    profile: preloadedState
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;