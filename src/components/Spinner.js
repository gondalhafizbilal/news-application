const Spinner = () => {
  return (
    <div className="text-center">
      <div
        className="spinner-border text-primary my-3"
        role="status"
        style={{ width: "60px", height: "60px" }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
