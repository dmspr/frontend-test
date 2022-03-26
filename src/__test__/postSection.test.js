import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import PostSection from "../components/PostSection/view";

test('renders "react axios post"', () => {
    render(<PostSection />);
    const headerElement = screen.getByText(/react axios post/i);
    expect(headerElement).toBeInTheDocument();
});

test("renders title input", () => {
    const testText = "furniture";

    render(<PostSection />);

    const input = screen.getByTestId("title-text");
    userEvent.type(input, testText);
    const textElement = screen.getByText(`Title: ${testText}`);
    expect(textElement).toBeInTheDocument();
});

test("renders description input", () => {
    const testText = "this is a description";

    render(<PostSection />);

    const input = screen.getByTestId("desc-text");
    userEvent.type(input, testText);
    const textElement = screen.getByText(`Description: ${testText}`);
    expect(textElement).toBeInTheDocument();
});

test('renders "post" button', () => {
    render(<PostSection />);

    const button = screen.getByText(/post data/i);
    expect(button).toBeInTheDocument();
});

test('renders "clear" button', () => {
    render(<PostSection />);

    const buttonElement = screen.getByText(/clear/i);
    const button = screen.getByTestId("clear-btn");
    userEvent.click(button);
    expect(buttonElement).toBeInTheDocument();
});

jest.mock("axios");

const mockResponse = {
    data: {
        status: "good",
    },
};

const mockError = {
    data: null,
    message: "Error Text",
};

test("post product", async () => {
    await act(async () => {
        await axios.post.mockImplementationOnce(() =>
            Promise.resolve(mockResponse)
        );
        render(<PostSection />);

        const button = screen.getByTestId("post-btn");
        userEvent.click(button);
    });

    const response = screen.getByTestId("response-product");
    expect(response).toBeInTheDocument();
});

test("error", async () => {
    await act(async () => {
        await axios.post.mockImplementationOnce(() => Promise.reject(mockError));
        render(<PostSection />);

        const button = screen.getByTestId("post-btn");
        userEvent.click(button);
    });
});