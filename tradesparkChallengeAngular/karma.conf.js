// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function(config) {
  config.set({
    basePath: '',
    
    frameworks: ['jasmine', 'karma-typescript'],

    files: [
      'src/**/*.ts',
      'src/**/*.spec.ts'
    ],


    preprocessors: {
      '**/*.ts': ['karma-typescript']
    },

    karmaTypescriptConfig: {
      tsconfig: './tsconfig.json'  
    },

    reporters: ['progress', 'karma-typescript'], 

  
    coverageReporter: {
      type: 'html', 
      dir: 'coverage/' 
    },

  
    plugins: [
      require('karma-jasmine'),               
      require('karma-chrome-launcher'),      
      require('karma-typescript'),           
      require('karma-coverage'),      
    ],

    browsers: ['Chrome'],           
    singleRun: false,              
    concurrency: Infinity,          
    port: 9876,                     
    colors: true,                   
    logLevel: config.LOG_INFO,      
    autoWatch: true                 
  });
};

