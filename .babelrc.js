/**
 * Babel Configuration
 */
module.exports = (api) => {
  return {
    presets: [
      "@babel/preset-env",
      {
        modules: false,
        useBuiltIns: "usage",
        corejs: 3,
      },
    ],
  };
};
