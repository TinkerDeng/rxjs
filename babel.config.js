module.exports = function (api) {
  api.cache(true);
  const presets = [
      [
          "@babel/env",
          {
              targets:{
                  node:"current",
                  edge:"17",
                  firefox:"60",
                  chrome:"67",
                  safari:"11.1"
              }
          }
      ]
  ];
  return {
      presets
  };
}