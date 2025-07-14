function Progress({ numQuestion, index, points }) {
  return (
    <div className="progress">
      <progress max={numQuestion} value={index} />
      <p>
        Question <strong>{index}</strong> of {numQuestion}
      </p>
      <p>
        <strong>{points}</strong>/250 points
      </p>
    </div>
  );
}

export default Progress;
