function StartQuiz({ numQuestion, dispatch }) {
  return (
    <div className="start">
      <h2>Welcom to React Quiz!</h2>
      <h3>{numQuestion} question to test your React mastery </h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Start Quiz
      </button>
    </div>
  );
}

export default StartQuiz;
