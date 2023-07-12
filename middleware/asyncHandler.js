exports.asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch((error) => {
    // Check if the error has a custom message or status code
    const message = error.message || "Server error";
    const status = error.statusCode || 500;

    // Log the error for debugging purposes
    console.error("Error:", error);

    // Send the error response with the appropriate status code and message
    res.status(status).json({ error: message });
  });
