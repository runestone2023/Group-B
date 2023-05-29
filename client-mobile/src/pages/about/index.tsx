import Header from "../../components/header";
import AboutPageContainer from "../../containers/about";

const HomePage = () => {
  return (
    <div>
      <Header />
      <div className="mt-[50px]">
        <AboutPageContainer />
      </div>
    </div>
  );
};

export default HomePage;
