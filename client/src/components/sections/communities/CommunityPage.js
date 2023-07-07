import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

const CommunityPage = () => {
  const { communityId } = useParams();
  return (
    <div>
      <Sidebar communityId={communityId} />
      <MainContent communityId={communityId} />
    </div>
  );
};
export default CommunityPage;
