import { getProfile } from '@/lib/content';
import Navbar from './Navbar';

export default async function NavbarWrapper() {
  const profile = await getProfile();
  return <Navbar brandName={profile.brand_name} quote={profile.quote} />;
}
