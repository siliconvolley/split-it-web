import PageLayout from './PageLayout';
import Navbar from '@/components/Navbar';
import UploadImageComponent from '@/components/OCRPage/UploadImageComponent';

export default function UploadImagePage() {
  return (
    <PageLayout>
      <Navbar path="/" title="Upload Bill" />
      <UploadImageComponent />
    </PageLayout>
  );
}
