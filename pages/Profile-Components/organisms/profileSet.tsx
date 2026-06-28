import { Logo } from "@/pages/components/atoms/Logo"
import Information from "../atoms/information"
import AccountInfo from "../atoms/accountinfo"
import Setting from "../atoms/setting"
import ReturnBTN from "../atoms/returnBTN"
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTab } from "@/pages/store/features/profile/profileSlice"
import { RootState } from "@/pages/store"
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function ProfileSet() {
  const dispatch = useDispatch();
  const activeTab = useSelector((state: RootState) => state.profile.activeTab);
  const router = useRouter();
  useEffect(() => {
    if (activeTab) {
      localStorage.setItem('lastActiveTab', activeTab);
    }
  }, [activeTab]);

  const handleBack = () => {
    const lastTab = localStorage.getItem('lastActiveTab');
    
    if (lastTab && lastTab !== activeTab) {
      dispatch(setActiveTab(lastTab as any));
      router.push(`/profile/${lastTab}`);
    } else {
      router.push('/profile');
    }
  };

  const handleTabChange = (tab: 'profile2' | 'profile1' | 'profile3', route: string) => {
    dispatch(setActiveTab(tab));
    router.push(route);
  }

  return (
    <div className="flex flex-col border-l-2 pl-4 border-[#AAAAAA] mr-24">
      <Logo />
      <div className="flex flex-col mt-20 ">
        <ReturnBTN onClick={handleBack} />
        <div className=" flex flex-col gap-3">
          <div onClick={() => handleTabChange('profile1', '/profile/profile1')} className={`cursor-pointer p-2 rounded ${activeTab === 'profile1' ? 'bg-[#C2F7FA] text-[17px] font-[700]' : ''}`} >
            <Information />
          </div>
          <div onClick={() => handleTabChange('profile2', '/profile/profile2')} className={`cursor-pointer p-2 rounded ${activeTab === 'profile2' ? 'bg-[#C2F7FA] text-[17px] font-[700]' : ''}`} >
            <AccountInfo />
          </div>
          <div onClick={() => handleTabChange('profile3', '/profile/profile3')} className={`cursor-pointer p-2 rounded ${activeTab === 'profile3' ? 'bg-[#C2F7FA] text-[17px] font-[700]' : ''}`}>
            <Setting />
          </div>
        </div>
      </div>
    </div>
  );
}