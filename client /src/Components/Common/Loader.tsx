const Loader = ({ loading }: { loading: boolean }) => {
  return (
    loading && (
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "fixed",
          background: "rgba(0,0,0,0.7)",
          width: "100vw",
          height: "100vh",
          zIndex: "10",
          display: "grid",
          placeItems: "center",
          pointerEvents: "none",
        }}>
        <div className='loader' />
      </div>
    )
  );
};

export default Loader;
