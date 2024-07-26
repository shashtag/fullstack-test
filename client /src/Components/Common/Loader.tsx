// Loader component that takes a loading prop and displays a loader when loading is true
const Loader = ({ loading }: { loading: boolean }) => {
  return (
    loading && (
      <div
        role='loading'
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "fixed",
          background: "rgba(0,0,0,0.7)",
          width: "100vw",
          height: "100vh",

          // Ensure the loader is on top of other elements
          zIndex: "10",

          // Center the loader within the viewport
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
