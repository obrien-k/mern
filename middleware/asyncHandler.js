exports.asyncHandler = (fn) => (req, res, next) => {
  const timeout = 10000; // 10 seconds

  const timeoutPromise = new Promise((resolve) => {
    setTimeout(() => {
      const error = new Error("Request timeout");
      error.statusCode = 408; // Request Timeout
      resolve(error);
    }, timeout);
  });

  Promise.race([fn(req, res, next), timeoutPromise])
    .then((result) => {
      if (result instanceof Error) {
        throw result; // Re-throw the timeout error
      }
    })
    .catch((error) => {
      // Check if the error has a custom message or status code
      const message = error.message || "Server error";
      const status = error.statusCode || 500;

      // Log the error for debugging purposes
      console.error("Error:", error);

      // Send the error response with the appropriate status code and message
      res.status(status).json({ error: message });
    });
};
