import { useNavigate } from "react-router";
import Loading from "./Loading";

const Home = (props: any) => {
  const { user } = props;

  return (
    <>
      {user?.loading ? (
        <Loading />
      ) : (
        user?.issuer && <div>You're logged in!</div>
      )}
    </>
  );
};

export default Home;
