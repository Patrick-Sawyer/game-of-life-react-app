import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Row from "../components/row.jsx";
import "enzyme";

it("renders without crashing", () => {
  const fn = jest.fn();
  const rowData = new Array(50).fill(false);
  const div = document.createElement("div");
  ReactDOM.render(<Row rowNumber={5} rowData={rowData} updateGrid={fn} />, div);
});

it("contains 50 dead cell divs", () => {
  const fn = jest.fn();
  const rowData = new Array(50).fill(false);
  const { getByTestId } = render(
    <Row rowNumber={5} rowData={rowData} updateGrid={fn} />
  );
  expect(getByTestId("row").children.length).toEqual(50);
  for (let i = 0; i < 50; i++) {
    expect(getByTestId("row").children[i].className).toEqual("dead");
  }
});
