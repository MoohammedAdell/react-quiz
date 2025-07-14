function StartQuiz({ numQuestion }) {
  return (
    <div className="start">
      <h2>Welcom to React Quiz!</h2>
      <h3>{numQuestion} question to test your React mastery </h3>
      <button className="btn btn-ui">Start Quiz</button>
    </div>
  );
}

export default StartQuiz;
