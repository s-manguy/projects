// babel.config.js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      /* 
      added targets: to avoid the 
      "ReferenceError: regeneratorRuntime is not definedJest"
      on statefull components
      */
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-react',
  ],
}
