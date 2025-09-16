module.exports = {
  presets: [
    ['@babel/preset-env', { 
      targets: { 
        node: 'current' 
      },
      modules: 'commonjs'
    }],
    ['@babel/preset-react', {
      runtime: 'automatic'
    }],
    ['@babel/preset-typescript', {
      isTSX: true,
      allExtensions: true
    }]
  ],
  plugins: [
    '@babel/plugin-transform-class-properties',
    '@babel/plugin-transform-runtime'
  ],
  env: {
    test: {
      presets: [
        ['@babel/preset-env', { 
          targets: { 
            node: 'current' 
          },
          modules: 'commonjs'
        }],
        ['@babel/preset-react', {
          runtime: 'automatic'
        }],
        ['@babel/preset-typescript', {
          isTSX: true,
          allExtensions: true
        }]
      ]
    }
  }
};
