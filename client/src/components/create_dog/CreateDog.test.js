import React from "react";
import { Provider } from 'react-redux';
import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CreateDog from "./CreateDog";
import store from "../../store";

describe("Create Dog", () => {

  it("renders correctly", () => {
    
    const { queryByTestId } = render(<BrowserRouter><Provider store={store}><CreateDog /></Provider></BrowserRouter>);

    expect(queryByTestId("create-name")).toBeTruthy();
    expect(queryByTestId("create-radio-metric")).toBeTruthy();
    expect(queryByTestId("create-radio-imperial")).toBeTruthy();
    expect(queryByTestId("create-min-w")).toBeTruthy();
    expect(queryByTestId("create-max-w")).toBeTruthy();
    expect(queryByTestId("create-min-h")).toBeTruthy();
    expect(queryByTestId("create-max-h")).toBeTruthy();
    expect(queryByTestId("create-life-span")).toBeTruthy();
    expect(queryByTestId("create-image-url")).toBeTruthy();
    expect(queryByTestId("create-description")).toBeTruthy();
  });

  describe("Dog name input", () => {
    it("should change the value of the name when it changes", () => {
      const { queryByTestId } = render(
        <BrowserRouter>
          <Provider store={store}>
            <CreateDog />
          </Provider>
        </BrowserRouter>
      );
      
      const nameInput = queryByTestId("create-name");
      expect(nameInput.value).toBe("");
      fireEvent.change(nameInput, {target: {value: "test"}});
      expect(nameInput.value).toBe("test");
    });
  });

  describe("Radio measurement system change", () => {
    it("the one clicked should be true while the other is not", () => {
      const { queryByTestId } = render(
        <BrowserRouter>
          <Provider store={store}>
            <CreateDog />
          </Provider>
        </BrowserRouter>
      );
      
      const radioMetricInput = queryByTestId("create-radio-metric");
      const radioImperialInput = queryByTestId("create-radio-imperial");
      expect(radioMetricInput.checked).toBe(true);
      expect(radioImperialInput.checked).toBe(false);
      fireEvent.click(radioImperialInput);
      expect(radioImperialInput.checked).toBe(true);
      expect(radioMetricInput.checked).toBe(false);
      fireEvent.click(radioMetricInput);
      expect(radioMetricInput.checked).toBe(true);
      expect(radioImperialInput.checked).toBe(false);
    });
  });

  describe("Min weight field", () => {
    it("should change the value of the field when it changes", () => {
      const { queryByTestId } = render(
        <BrowserRouter>
          <Provider store={store}>
            <CreateDog />
          </Provider>
        </BrowserRouter>
      );
      
      const minWeightInput = queryByTestId("create-min-w");
      expect(minWeightInput.value).toBe("");
      fireEvent.change(minWeightInput, {target: {value: "3"}});
      expect(minWeightInput.value).toBe("3");
    });
  });

  describe("Max weight field", () => {
    it("should change the value of the field when it changes", () => {
      const { queryByTestId } = render(
        <BrowserRouter>
          <Provider store={store}>
            <CreateDog />
          </Provider>
        </BrowserRouter>
      );
      
      const maxWeightInput = queryByTestId("create-max-w");
      expect(maxWeightInput.value).toBe("");
      fireEvent.change(maxWeightInput, {target: {value: "6"}});
      expect(maxWeightInput.value).toBe("6");
    });
  });

  describe("Min height field", () => {
    it("should change the value of the field when it changes", () => {
      const { queryByTestId } = render(
        <BrowserRouter>
          <Provider store={store}>
            <CreateDog />
          </Provider>
        </BrowserRouter>
      );
      
      const minHeightInput = queryByTestId("create-min-h");
      expect(minHeightInput.value).toBe("");
      fireEvent.change(minHeightInput, {target: {value: "3"}});
      expect(minHeightInput.value).toBe("3");
    });
  });

  describe("Max height field", () => {
    it("should change the value of the field when it changes", () => {
      const { queryByTestId } = render(
        <BrowserRouter>
          <Provider store={store}>
            <CreateDog />
          </Provider>
        </BrowserRouter>
      );
      
      const maxHeightInput = queryByTestId("create-max-h");
      expect(maxHeightInput.value).toBe("");
      fireEvent.change(maxHeightInput, {target: {value: "6"}});
      expect(maxHeightInput.value).toBe("6");
    });
  });

  describe("Life span field", () => {
    it("should change the value of the life span when it changes", () => {
      const { queryByTestId } = render(
        <BrowserRouter>
          <Provider store={store}>
            <CreateDog />
          </Provider>
        </BrowserRouter>
      );
      
      const lifeSpanInput = queryByTestId("create-life-span");
      expect(lifeSpanInput.value).toBe("");
      fireEvent.change(lifeSpanInput, {target: {value: "14"}});
      expect(lifeSpanInput.value).toBe("14");
    });
  });

  describe("Image url field", () => {
    it("should change the value of the image url when it changes", () => {
      const { queryByTestId } = render(
        <BrowserRouter>
          <Provider store={store}>
            <CreateDog />
          </Provider>
        </BrowserRouter>
      );
      
      const imageUrlInput = queryByTestId("create-image-url");
      expect(imageUrlInput.value).toBe("");
      fireEvent.change(imageUrlInput, {target: {value: "https://site.com"}});
      expect(imageUrlInput.value).toBe("https://site.com");
    });
  });

  describe("description text area", () => {
    it("should change the value of the description when it changes", () => {
      const { queryByTestId } = render(
        <BrowserRouter>
          <Provider store={store}>
            <CreateDog />
          </Provider>
        </BrowserRouter>
      );
      
      const descriptionInput = queryByTestId("create-description");
      expect(descriptionInput.value).toBe("");
      fireEvent.change(descriptionInput, {target: {value: "Little annoying grumpy dog"}});
      expect(descriptionInput.value).toBe("Little annoying grumpy dog");
    });
  });
});