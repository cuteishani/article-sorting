import Adapter from "enzyme-adapter-react-16";
import '@testing-library/jest-dom';
import Enzyme from "enzyme";
Enzyme.configure({ adapter: new Adapter() });