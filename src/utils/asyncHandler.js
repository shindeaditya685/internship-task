const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    try {
      Promise.resolve(requestHandler(req, res, next)).catch((err) => {
        console.error("AsyncHandler caught an error:", err);
        next(err);
      });
    } catch (err) {
      console.error("AsyncHandler caught a synchronous error:", err);
      next(err);
    }
  };
};

export { asyncHandler };
