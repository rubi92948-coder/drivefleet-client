const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="relative">
        
        <div className="w-12 h-12 rounded-full absolute border-4 border-dashed border-orange-500 animate-spin"></div>
       
        <div className="w-12 h-12 rounded-full border-4 border-orange-200"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;