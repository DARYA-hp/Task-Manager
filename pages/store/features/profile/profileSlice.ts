import { createSlice, PayloadAction } from '@reduxjs/toolkit';
type ProfileTab = 'profile2' | 'profile1' | 'profile3';
interface UserProfile {
  name: string;
  email: string;
  avatar: string;
}

interface ProfileState {
  activeTab: ProfileTab;
  user: UserProfile | null;
}
const defaultUser: UserProfile = {
  name: 'کاربر مهمان', 
  email: 'guest@example.com',
  avatar: '/girl.jpg',
};

const initialState: ProfileState = {
  activeTab: 'profile1',
  user: defaultUser,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<ProfileTab>) => {
      state.activeTab = action.payload;
    },
    setUser: (state, action: PayloadAction<UserProfile>) => {
      state.user = action.payload;
      try {
        localStorage.setItem('userProfile', JSON.stringify({
          activeTab: state.activeTab,
          user: state.user
        }));
      } catch (error) {
        console.error("Error saving to localStorage", error);
      }
    },
    loadUserFromStorage: (state) => {
      try {
        const storedUser = localStorage.getItem('userProfile');
        if (storedUser) {
          const parsed = JSON.parse(storedUser);
          state.activeTab = parsed.activeTab;
          state.user = parsed.user;
        }
      } catch (error) {
        console.error("Error loading from localStorage", error);
      }
    },
  },
});

export const { setActiveTab, setUser, loadUserFromStorage } = profileSlice.actions;
export default profileSlice.reducer;