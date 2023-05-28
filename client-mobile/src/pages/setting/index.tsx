import Header from "../../components/header";
import SettingPageContainer from "../../containers/setting";

const SettingPage = (props: any) => {
  return (
    <div>
      <Header />
      <div className="mt-[50px]">
        <SettingPageContainer {...props} />
      </div>
    </div>
  );
};

export default SettingPage;
