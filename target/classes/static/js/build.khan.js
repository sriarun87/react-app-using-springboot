/*eslint-disable*/
({
  "appDir": "./",
  "baseUrl": "./",
  "dir": "../js-build",
  "mainConfigFile": "./app/mobile.js",
  "fileExclusionRegExp": /^(?:karma|grunt.*|test|tests|(?:r|build|min)\\.js)$/,
  "modules": [
    {
      "name": "./app/mobile",
      "include": []
    },
    {
      "name": "./app/modules/hello",
      "include": [
        "./app/modules/hello/world"
      ],
      "exclude": [],
      "create": true
    }
  ],
  "optimize": "uglify2",
  "optimizeCss": "none"
})
/*eslint-enable*/
