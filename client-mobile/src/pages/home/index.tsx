import Header from "../../components/header";
import HomePageContainer from "../../containers/home-page/HomePageContainer";

const HomePage = () => {
  return (
    <div>
      <Header />
      <div className="mt-[50px]">
        <HomePageContainer/>
      </div>
    </div>
  );
};

export default HomePage;
