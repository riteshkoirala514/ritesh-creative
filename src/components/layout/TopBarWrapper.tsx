import { getProfile } from '@/lib/content';
import TopBar from './TopBar';

export default async function TopBarWrapper() {
  const profile = await getProfile();
  return <TopBar profile={profile} />;
}
