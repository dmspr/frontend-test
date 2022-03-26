import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import GetSection from "../components/GetSection/view";

test('renders "react axios get"', () => {
    render(<GetSection />);
    const headerElement = screen.getByText(/react axios get/i);
    expect(headerElement).toBeInTheDocument();
});

test('renders "get all" button', () => {
    render(<GetSection />);

    const buttonElement = screen.getByText(/get all/i);
    expect(buttonElement).toBeInTheDocument();
});

test('renders "clear" button', () => {
    render(<GetSection />);

    const buttonElement = screen.getByText(/clear/i);
    const button = screen.getByTestId("clear-btn");
    userEvent.click(button);
    expect(buttonElement).toBeInTheDocument();
});

jest.mock("axios");

const mockResponse = {
    data: [
        {
            id: 3,
            name: "Kue Kuping Gajah",
            price: 2000,
            stock: 1,
            imageUrl: ""
        },
    ],
};

const mockError = {
    data: null,
    message: "Error Test",
};

test("handle reponse Product", async () => {
    await act(async () => {
        await axios.get.mockImplementationOnce(() => Promise.resolve(mockResponse));
        render(<GetSection />);

        const button = screen.getByTestId("get-btn");
        userEvent.click(button);
    });

    const response = screen.getByTestId("response-product");
    expect(response).toBeInTheDocument();
});

test("handle error", async () => {
    await act(async () => {
        await axios.get.mockImplementationOnce(() => Promise.reject(mockError));
        render(<GetSection />);

        const button = screen.getByTestId("get-btn");
        userEvent.click(button);
    });
});