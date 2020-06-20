import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Game from "../components/game.jsx";
import { shallow } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Game />, div);
});

it("contains 50 row divs", () => {
  const { getByTestId } = render(<Game />);
  expect(getByTestId("game").firstChild.children.length).toEqual(50);
  for (let i = 0; i < 50; i++) {
    expect(getByTestId("game").firstChild.children[i].className).toEqual("row");
  }
});

describe("updateGrid", () => {
  it("updates grid", () => {
    const wrapper = shallow(<Game />);
    const instance = wrapper.instance();
    instance.updateGrid(5, 10, true);
    instance.updateGrid(15, 25, true);
    expect(wrapper.state("grid")[5][10]).toBe(true);
    expect(wrapper.state("grid")[15][25]).toBe(true);
  });
});

describe("clear", () => {
  it("clears grid", () => {
    let initialState = [];
    const row = new Array(50).fill(false);
    for (let i = 0; i < 50; i++) {
      initialState.push(row);
    }
    const wrapper = shallow(<Game />);
    const instance = wrapper.instance();
    instance.updateGrid(1, 1, true);
    instance.updateGrid(10, 10, true);
    instance.updateGrid(20, 20, true);
    instance.updateGrid(21, 21, true);
    instance.clear();
    expect(wrapper.state("grid")).toEqual(initialState);
  });
});

describe("numberOfLiveNeighbours", () => {
  it("returns correct number of neighbours", () => {
    const wrapper = shallow(<Game />);
    const instance = wrapper.instance();
    instance.updateGrid(0, 0, true);
    instance.updateGrid(0, 1, true);
    instance.updateGrid(0, 2, true);
    instance.updateGrid(1, 0, true);
    instance.updateGrid(1, 2, true);
    instance.updateGrid(2, 0, true);
    instance.updateGrid(2, 1, true);
    instance.updateGrid(2, 2, true);
    expect(instance.numberOfLiveNeighbours(1, 1)).toEqual(8);
    expect(instance.numberOfLiveNeighbours(1, 3)).toEqual(3);
    expect(instance.numberOfLiveNeighbours(3, 0)).toEqual(2);
    expect(instance.numberOfLiveNeighbours(3, 3)).toEqual(1);
    expect(instance.numberOfLiveNeighbours(0, 0)).toEqual(2);
    expect(instance.numberOfLiveNeighbours(5, 5)).toEqual(0);
    expect(instance.numberOfLiveNeighbours(10, 10)).toEqual(0);
  });
});

describe("tick", () => {
  it("updates grid correctly", () => {
    const wrapper = shallow(<Game />);
    const instance = wrapper.instance();
    instance.updateGrid(2, 1, true);
    instance.updateGrid(3, 2, true);
    instance.updateGrid(3, 3, true);
    instance.updateGrid(2, 3, true);
    instance.updateGrid(1, 3, true);
    instance.tick();
    expect(wrapper.state("grid")[0][0]).toEqual(false);
    expect(wrapper.state("grid")[0][1]).toEqual(false);
    expect(wrapper.state("grid")[0][2]).toEqual(false);
    expect(wrapper.state("grid")[0][3]).toEqual(false);
    expect(wrapper.state("grid")[0][4]).toEqual(false);
    expect(wrapper.state("grid")[1][0]).toEqual(false);
    expect(wrapper.state("grid")[1][1]).toEqual(false);
    expect(wrapper.state("grid")[1][2]).toEqual(true);
    expect(wrapper.state("grid")[1][3]).toEqual(false);
    expect(wrapper.state("grid")[1][4]).toEqual(false);
    expect(wrapper.state("grid")[2][0]).toEqual(false);
    expect(wrapper.state("grid")[2][1]).toEqual(false);
    expect(wrapper.state("grid")[2][2]).toEqual(false);
    expect(wrapper.state("grid")[2][3]).toEqual(true);
    expect(wrapper.state("grid")[2][4]).toEqual(true);
    expect(wrapper.state("grid")[3][0]).toEqual(false);
    expect(wrapper.state("grid")[3][1]).toEqual(false);
    expect(wrapper.state("grid")[3][2]).toEqual(true);
    expect(wrapper.state("grid")[3][3]).toEqual(true);
    expect(wrapper.state("grid")[3][4]).toEqual(false);
    expect(wrapper.state("grid")[4][0]).toEqual(false);
    expect(wrapper.state("grid")[4][1]).toEqual(false);
    expect(wrapper.state("grid")[4][2]).toEqual(false);
    expect(wrapper.state("grid")[4][3]).toEqual(false);
    expect(wrapper.state("grid")[4][4]).toEqual(false);
  });
});

describe("play or pause", () => {
  it("returns correctly", () => {
    const wrapper = shallow(<Game />);
    const instance = wrapper.instance();
    expect(instance.playOrPause()).toEqual("PLAY");
    wrapper.setState({
      gamePlaying: true,
    });
    expect(instance.playOrPause()).toEqual("STOP");
  });
});
