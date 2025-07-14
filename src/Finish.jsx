function Finish({ points, maxPoints, dispatch }) {
  const percentage = Math.round((points / maxPoints) * 100);
  let imoji;
  if (percentage === 90) {
    imoji = "🏆";
  }
  if (percentage > 50) {
    imoji = "🏅";
  }
  if (percentage <= 50) {
    imoji = "😐";
  }

  return (
    <>
      <div className="result">
        <span>
          You scored <strong>{points}</strong> out of {maxPoints} ({percentage}%
          ){imoji}
        </span>
      </div>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Try Again
      </button>
    </>
  );
}

export default Finish;
