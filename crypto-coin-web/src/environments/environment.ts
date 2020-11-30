// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urlBaseAPI: 'http://localhost:3000',
  urlBaseMockAPI: 'http://localhost:3000',
  firebaseConfig: {
    apiKey: "AIzaSyDKK__jffpXeG_pe3SmOC4R8CohvDuhcrk",
    authDomain: "crypto-coin-72d2e.firebaseapp.com",
    databaseURL: "https://crypto-coin-72d2e.firebaseio.com",
    projectId: "crypto-coin-72d2e",
    storageBucket: "crypto-coin-72d2e.appspot.com",
    messagingSenderId: "835536678924",
    appId: "1:835536678924:web:3a5aea055a5a25a3737e29",
    measurementId: "G-D3W608CV17"
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
