// module.exports = {
//     src_folders: [],

//     webdriver: {
//       keep_alive: true,
//       timeout_options: {
//         timeout: 60000,
//         retry_attempts: 3
//       }
//     },
  
//     test_settings: {
//       default: {
//         launch_url: 'https://nightwatchjs.org'
//       },
  
//       browserstack: {
//         selenium: {
//           host: 'hub-cloud.browserstack.com',
//           port: 443
//         },
  
//         // More info on configuring capabilities can be found on:
//         // https://www.browserstack.com/automate/capabilities?tag=selenium-4
//         desiredCapabilities: {
//           'bstack:options' : {
//             local: 'false',
//             userName: '${BROWSERSTACK_USER}',
//             accessKey: '${BROWSERSTACK_KEY}',
//           }
//         }
//       },
  
//       'browserstack.chrome': {
//         extends: 'browserstack',
//         desiredCapabilities: {
//           browserName: 'chrome',
//           chromeOptions : {
//             w3c: false
//           }
//         }
//       },
  
//       'browserstack.firefox': {
//         extends: 'browserstack',
//         desiredCapabilities: {
//           browserName: 'firefox'
//         }
//       },
  
//       'browserstack.ie': {
//         extends: 'browserstack',
//         desiredCapabilities: {
//           browserName: 'IE',
//           browserVersion: '11.0',
//           'bstack:options' : {
//             os: 'Windows',
//             osVersion: '10',
//             local: 'false',
//             seleniumVersion: '3.5.2',
//             resolution: '1366x768'
//           }
//         }
//       }
//     }
//   }

  module.exports = {
    // An array of folders (excluding subfolders) where your tests are located;
    // if this is not specified, the test source must be passed as the second argument to the test runner.
    src_folders: ['e2e_nightwatch'],
  
    webdriver: {
      start_process: true,
      port: 4444,
      server_path: require('geckodriver').path,
      cli_args: [
        // very verbose geckodriver logs
        // '-vv'
      ],
    },
  
    test_settings: {
      default: {
        launch_url: 'https://nightwatchjs.org',
        desiredCapabilities: {
          browserName: 'firefox',
        },
      },
    },
  }