import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Cell from "../components/cell.jsx";
import { shallow } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Cell />, div);
});

it("renders in dead state", () => {
  const { getByTestId } = render(<Cell />);
  expect(getByTestId("cell")).toHaveClass("dead");
});

it("calls updateGrid with correct arguments when clicked", () => {
  const fn = jest.fn();
  const { getByTestId } = render(
    <Cell updateGrid={fn} cellState={false} rowNumber={5} cellNumber={6} />
  );
  fireEvent.click(getByTestId("cell"));
  expect(fn.mock.calls.length).toEqual(1);
  expect(fn.mock.calls[0][0]).toEqual(5);
  expect(fn.mock.calls[0][1]).toEqual(6);
  expect(fn.mock.calls[0][2]).toEqual(true);
});

it("changes to live div class when state changes", () => {
  const fn = jest.fn();
  const wrapper = shallow(
    <Cell updateGrid={fn} cellState={false} rowNumber={5} cellNumber={6} />
  );

  wrapper.setProps({
    cellState: true,
  });
  expect(wrapper.render()[0].attribs.class).toEqual("live");
});
