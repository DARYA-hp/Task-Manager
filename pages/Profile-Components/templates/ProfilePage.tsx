import ProfileSet from '../organisms/profileSet';
import { useSelector } from 'react-redux';
import { RootState } from '@/pages/store';
import InformationPart from '../organisms/informationPart';
export default function ProfilePage() {
  const activeTab = useSelector((state: RootState) => state.profile.activeTab);

  return (
    <div className="flex flex-row">
      <ProfileSet />
      <InformationPart/>
      <div className="flex-1">
        {activeTab === 'profile2' && (
          <div className="p-4">
            
          </div>
        )}
        
        {activeTab === 'profile1' && (
          <div className="p-4">
            
          </div>
        )}
        
        {activeTab === 'profile3' && (
          <div className="p-4">
            
          </div>
        )}
      </div>
    </div>
  )
}