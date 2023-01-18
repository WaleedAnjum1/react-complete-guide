import { Route } from "react-router-dom";
import QuoteList from "../components/quotes/QuoteList";

const DUMMY_QUOTES = [
  { id: "q1", author: "Max", text: "A simple static quote here" },
  { id: "q2", author: "Sam", text: "Another static quote here" },
];

const AllQuotes = () => {
  return <QuoteList quotes={DUMMY_QUOTES} />;
};

export default AllQuotes;
