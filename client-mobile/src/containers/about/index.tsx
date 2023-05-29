import robot from "../../assets/robot.jpg";
import { Collapse, Space, theme } from "antd";
import {CaretRightOutlined} from '@ant-design/icons'
function AboutPageContainer() {
  const { Panel } = Collapse;

  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
  const panelStyle = {
    marginBottom: 10,
    background: '#efefef',
    borderRadius: '0.5rem',
    border: "none",
    maxWidth: "1024px",
    marginLeft: "auto",
    marginRight: "auto"
  };
  return (
    <div className="pt-[20px] px-[15px] pb-[30px]">
      <div
        className="h-[270px] w-[270px] max-w-full rounded-xl drop-shadow-lg mx-auto mb-[20px]"
        style={{
          background: `url(${robot}) center/cover`,
        }}
      ></div>
      <div className="text-center text-[1.5rem] mb-[20px]" style={{ fontFamily: "'Ubuntu', sans-serif" }}>HelperBot</div>
      <div>
        <Collapse
          bordered={false}
          defaultActiveKey={["1"]}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          style={{
            background: 'transparent',
          }}
        >
          <Panel header={<span className="font-semibold text-[#1a1a1a]">Introduction</span>} key="1" style={panelStyle}>
            <p>{"Our project aimed to develop a practical and functional robot for item clean-up in households, catering to the needs of individuals with limited mobility, visual impairments, and the elderly."}</p>
          </Panel>
          <Panel header={<span className="font-semibold text-[#1a1a1a]">Technical</span>} key="2" style={panelStyle}>
            <p>
              <div><span className="font-semibold text-[#666]">Front-end: </span><span>React</span></div>
              <div><span className="font-semibold text-[#666]">Back-end: </span><span>Node & Express</span></div>
              <div><span className="font-semibold text-[#666]">Robot: </span><span>MicroPython</span></div>
            </p>
          </Panel>
          <Panel header={<span className="font-semibold text-[#1a1a1a]">Group member</span>} key="3" style={panelStyle}>
            <ul>
              <li>Ebba Löwgren</li>
              <li>Dante Grenholm</li>
              <li>Fong-Chun Tsai</li>
              <li>Duong Dao-Quang</li>
              <li>Faizan Mian</li>
              <li>Gustav Pettersson</li>
              <li>Nam Can Hoai</li>
              <li>Hung Ha Ngoc</li>
            </ul>
          </Panel>
        </Collapse>
      </div>
    </div>
  );
}
export default AboutPageContainer;
