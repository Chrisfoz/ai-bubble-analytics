/**
 * Error Logger Utility
 * Logs errors to console and optionally sends to backend API
 */

class ErrorLogger {
  constructor() {
    this.errors = [];
    this.maxErrors = 100; // Keep last 100 errors in memory
  }

  /**
   * Log an error with context
   * @param {Error} error - The error object
   * @param {string} context - Where the error occurred
   * @param {object} metadata - Additional metadata
   */
  logError(error, context = 'Unknown', metadata = {}) {
    const errorEntry = {
      timestamp: new Date().toISOString(),
      message: error.message || 'Unknown error',
      stack: error.stack || '',
      context,
      metadata,
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    // Add to memory (keep last 100)
    this.errors.push(errorEntry);
    if (this.errors.length > this.maxErrors) {
      this.errors.shift();
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error(`[ERROR] ${context}:`, error);
      console.error('Metadata:', metadata);
    }

    // Send to backend API (implement when backend is ready)
    this.sendToBackend(errorEntry);

    return errorEntry;
  }

  /**
   * Log a warning
   * @param {string} message - Warning message
   * @param {object} metadata - Additional metadata
   */
  logWarning(message, metadata = {}) {
    const warningEntry = {
      timestamp: new Date().toISOString(),
      level: 'warning',
      message,
      metadata,
      url: window.location.href,
    };

    if (process.env.NODE_ENV === 'development') {
      console.warn(`[WARNING]:`, message);
    }

    return warningEntry;
  }

  /**
   * Log info message
   * @param {string} message - Info message
   * @param {object} metadata - Additional metadata
   */
  logInfo(message, metadata = {}) {
    const infoEntry = {
      timestamp: new Date().toISOString(),
      level: 'info',
      message,
      metadata,
    };

    if (process.env.NODE_ENV === 'development') {
      console.info(`[INFO]:`, message);
    }

    return infoEntry;
  }

  /**
   * Send error to backend API
   * @param {object} errorEntry - Error entry object
   */
  async sendToBackend(errorEntry) {
    // Skip in development or if no API endpoint configured
    if (process.env.NODE_ENV === 'development' || !process.env.REACT_APP_API_BASE_URL) {
      return;
    }

    try {
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/logs/error`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(errorEntry),
      });
    } catch (err) {
      // Silent fail - don't want error logging to crash the app
      console.error('Failed to send error to backend:', err);
    }
  }

  /**
   * Get all errors from memory
   * @returns {Array} Array of error entries
   */
  getErrors() {
    return [...this.errors];
  }

  /**
   * Clear all errors from memory
   */
  clearErrors() {
    this.errors = [];
  }

  /**
   * Export errors as JSON file
   */
  exportErrors() {
    const dataStr = JSON.stringify(this.errors, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `errors_${new Date().toISOString()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }
}

// Create singleton instance
const errorLogger = new ErrorLogger();

// Global error handler
window.addEventListener('error', (event) => {
  errorLogger.logError(
    new Error(event.message),
    'Global Error Handler',
    {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    }
  );
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  errorLogger.logError(
    new Error(event.reason),
    'Unhandled Promise Rejection',
    {
      promise: event.promise,
    }
  );
});

export default errorLogger;
