import PageLayout from "./PageLayout";
import SharesNavbar from "@/components/DisplayShares/SharesNavbar";
import DisplaySharesInfo from "@/components/DisplayShares/DisplaySharesInfo";
import DisplaySharesContextProvider from "@/contexts/DisplaySharesContextProvider";

export default function DisplaySharesPage() {
  return (
    <PageLayout>
      <DisplaySharesContextProvider>
        <SharesNavbar path="/bill/friends" title="Share Details" />
        <DisplaySharesInfo />
      </DisplaySharesContextProvider>
    </PageLayout>
  );
}
