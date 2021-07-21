import React from "react";
import { Provider } from 'react-redux';
import { render, fireEvent } from "@testing-library/react";
import SearchFilters from "./SearchFilters";
import store from "../../store";
import { setFilter, setPage, setSearchInput, setSortType, setUserCreatedFilter } from "../../actions";

describe("Search filters", () => {

  store.dispatch = jest.fn();

  it("renders correctly", () => {
    const { queryByTestId } = render(<Provider store={store}><SearchFilters /></Provider>);
    
    expect(queryByTestId("filters-query")).toBeTruthy();
    expect(queryByTestId("filters-sort")).toBeTruthy();
    expect(queryByTestId("filters-filter")).toBeTruthy();
    expect(queryByTestId("filters-checkbox")).toBeTruthy();
    expect(queryByTestId("filters-submit")).toBeTruthy();
  });

  describe("Search bar", () => {
    it('should change the value of the search when it changes', () => {
      const { queryByTestId } = render(<Provider store={store}><SearchFilters /></Provider>);
      const searchInput = queryByTestId("filters-query");
      expect(searchInput.value).toBe("");
      fireEvent.change(searchInput, {target: {value: "test"}});
      expect(store.dispatch).toHaveBeenCalledWith(setSearchInput("test"));
    });
  });

  describe("Sort selector", () => {
    it('should dispatch the sort type when it changes', () => {
      const { queryByTestId } = render(<Provider store={store}><SearchFilters /></Provider>);
      const sortInput = queryByTestId("filters-sort");
      fireEvent.change(sortInput, {target: {value: "WD"}});
      expect(store.dispatch).toHaveBeenCalledWith(setSortType("WD"));
    });
  });

  describe("Filter selector", () => {
    it('should dispatch the filter when it changes', () => {
      const { queryByTestId } = render(<Provider store={store}><SearchFilters /></Provider>);
      const filterInput = queryByTestId("filters-filter");
      fireEvent.change(filterInput, {target: {value: "Happy"}});
      expect(store.dispatch).toBeCalledWith(setPage(1));
      expect(store.dispatch).toBeCalledWith(setFilter(filterInput.value));
    });
  });

  describe("User created filter checkbox", () => {
    it('should dispatch the user created filter when it is checked', () => {
      const { queryByTestId } = render(<Provider store={store}><SearchFilters /></Provider>);
      const userCreatedInput = queryByTestId("filters-checkbox");
      expect(userCreatedInput.checked).toBe(false);
      fireEvent.click(userCreatedInput);
      expect(store.dispatch).toBeCalledWith(setPage(1));
      expect(store.dispatch).toBeCalledWith(setUserCreatedFilter(true));
    });
  });
});