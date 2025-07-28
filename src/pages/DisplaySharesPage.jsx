import PageLayout from "./PageLayout";
import Navbar from "@/components/Navbar";
import DisplaySharesInfo from "@/components/DisplayShares/DisplaySharesInfo";

export default function DisplaySharesPage() {
  return (
    <PageLayout>
      <Navbar path="/bill/friends" title="Share Details" />
      <DisplaySharesInfo />
    </PageLayout>
  );
}
