const LoadingScreen = () => {
  return (
    <div className="fixed left-0 top-0 w-screen h-screen bg-slate-300">
      <div className="absolute top-[50%] left-[50%] transform-[translate(-50%, -50%)]">
        <div className="w-[75px] h-[75px] inline-block rounded-full animate-spin border-2 border-slate-800 border-t-slate-300"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
