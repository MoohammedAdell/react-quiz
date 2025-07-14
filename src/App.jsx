/* eslint-disable no-unused-vars */
import { useEffect, useReducer } from "react";
import Header from "./Header";
import Section from "./Section";
import Loader from "./Loader";
import Error from "./Error";
import StartQuiz from "./StartQuiz";

const initialstate = {
  questions: [],
  status: "loading",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceiver":
      return { ...state, questions: action.payload, status: "success" };
    case "dataFailed":
      return { ...state, status: "error" };
    default:
      throw new Error("Invalid action");
  }
};

function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialstate);

  useEffect(() => {
    fetch("http://localhost:9000/questions")
      .then((response) => response.json())
      .then((data) => dispatch({ type: "dataReceiver", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  const numQuestion = questions.length;

  return (
    <div className="app">
      <Header />
      <Section>
        <div>
          {status === "loading" && <Loader />}
          {status === "error" && <Error />}
          {status === "success" && <StartQuiz numQuestion={numQuestion} />}
        </div>
      </Section>
    </div>
  );
}

export default App;
