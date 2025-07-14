function Question({ question, dispatch, answer, isLastQuestion }) {
  return (
    <>
      <div className="options">
        <h4>{question.question}</h4>

        {question.options.map((option, index) => {
          let className = "btn btn-option";

          if (answer !== null) {
            if (index === question.correctOption) {
              className += " correct";
            } else if (index === answer) {
              className += " wrong";
            }
          }

          return (
            <button
              className={className}
              key={index}
              onClick={() => dispatch({ type: "newAnswer", payload: index })}
              disabled={answer !== null}
            >
              {option}
            </button>
          );
        })}
      </div>
      <button
        className="btn-ui btn"
        onClick={() => dispatch({ type: "next" })}
        disabled={answer === null}
      >
        {isLastQuestion ? "Finish" : "Next"}
      </button>
    </>
  );
}

export default Question;
