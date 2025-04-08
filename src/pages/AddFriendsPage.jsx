import PageLayout from './PageLayout';
import Navbar from '@/components/Navbar';
import SharesEntryForm from '@/components/AddFriends/SharesEntryForm';

export default function AddFriendsPage() {
  return (
    <PageLayout>
      <Navbar path="/bill" title="Split the Bill" />
      <SharesEntryForm />
    </PageLayout>
  );
}
