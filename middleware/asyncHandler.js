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
      // Log the error for debugging purposes
      console.error("Error:", error);

      // Set default status code and message
      let statusCode = 500;
      let message = "Server error";

      // Specific error handling
      if (error.statusCode) {
        statusCode = error.statusCode;
      }

      if (error.message) {
        message = error.message;
      }

      if (error.name === "ValidationError") {
        // It's a Mongoose validation error
        statusCode = 400;
        message = Object.values(error.errors)
          .map((e) => e.message)
          .join(", ");
      } else if (error.name === "CastError") {
        // It's an invalid ID error
        statusCode = 400;
        message = "Invalid ID";
      }

      // Send the error response with the appropriate status code and message
      res.status(statusCode).json({ error: message });
    });
};
