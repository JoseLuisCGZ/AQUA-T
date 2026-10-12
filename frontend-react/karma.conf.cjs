module.exports = function (config) {
  config.set({

    frameworks: [
      'jasmine',
      'webpack'
    ],

  files: [
    'src/test/**/*.spec.jsx',
    {
    pattern: 'public/assetsimg/**/*',
    watched: false,
    included: false,
    served: true
    }
  ],


    preprocessors: {
      'src/test/**/*.spec.jsx': [
        'webpack'
      ]
    },

    proxies: {
  '/assetsimg/': '/base/public/assetsimg/'
  },

    webpack: {
      mode: 'development',
      devtool:'inline-source-map',

      resolve: {
        extensions: [
          '.js',
          '.jsx'
        ]
      },

      module: {

        rules: [

        {
          test: /\.jsx?$/,
          exclude: /node_modules/,

          use: {
            loader: 'babel-loader',
            options: {
              plugins: [
                [
                'babel-plugin-istanbul',
                {
                  exclude: [
                    'src/test/**'
                  
                  ]
               }
              ]
            ]
            } 
          }
        },

        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },

        {
          test: /\.m?js$/,
          resolve: {
            fullySpecified: false

          }
        }


      ]

    }
  },

  browsers: [
    'ChromeHeadless'
  ],

  reporters: [
    'progress',
    'coverage'
  ],

  coverageReporter: {

    dir: 'coverage',

    reporters: [
      {

    type: 'html',
    subdir: 'html'
  },
  {
    type: 'text-summary'
  }
  ]
  },

  singleRun: true

})
}