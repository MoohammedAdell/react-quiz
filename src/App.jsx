/* eslint-disable no-unused-vars */
import { useEffect, useReducer } from "react";
import Header from "./Header";
import Section from "./Section";
import Loader from "./Loader";
import Error from "./Error";
import StartQuiz from "./StartQuiz";
import Question from "./Question";
import Progress from "./Progress";
import Finish from "./Finish";
import Timer from "./Timer";

const SECS_PER_QUESTION = 30; // مثلًا 30 ثانية لكل سؤال

const initialstate = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  secondsRemaining: null, // ⏱️
};

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceiver":
      return { ...state, questions: action.payload, status: "success" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };

    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 1 ? "finish" : state.status,
      };

    case "next": {
      const isLastQuestion = state.index === state.questions.length - 1;
      return {
        ...state,
        index: isLastQuestion ? state.index : state.index + 1,
        status: isLastQuestion ? "finish" : state.status,
        answer: null,
      };
    }
    case "restart":
      return { ...initialstate, status: "success", questions: state.questions };

    case "newAnswer": {
      const question = state.questions[state.index];
      const isCorrect = action.payload === question.correctOption;

      return {
        ...state,
        answer: action.payload,
        points: isCorrect ? state.points + question.points : state.points,
      };
    }
    case "finish":
      return { ...state, status: "finish" };

    default:
      throw new Error("Invalid action");
  }
};

function App() {
  const [
    { questions, status, index, answer, points, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialstate);

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
          {status === "success" && (
            <StartQuiz numQuestion={numQuestion} dispatch={dispatch} />
          )}
          {status === "active" && (
            <>
              <Progress
                numQuestion={numQuestion}
                index={index}
                points={points}
              />
              <Question
                question={questions[index]}
                dispatch={dispatch}
                answer={answer}
                isLastQuestion={index === questions.length - 1}
              />
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
            </>
          )}
          {status === "finish" && (
            <Finish
              dispatch={dispatch}
              points={points}
              maxPoints={questions.reduce((acc, q) => acc + q.points, 0)}
            />
          )}
        </div>
      </Section>
    </div>
  );
}

export default App;
