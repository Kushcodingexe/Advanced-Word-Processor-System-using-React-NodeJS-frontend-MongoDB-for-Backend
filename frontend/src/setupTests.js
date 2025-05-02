// src/setupTests.js
global.crypto = {
  getRandomValues: (arr) => require('crypto').randomFillSync(arr),
};
