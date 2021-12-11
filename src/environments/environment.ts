// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyC_J8myK6jIJL0EGcgMajRcwTFNM7FNuUk",
    authDomain: "imageshoes-e0cdf.firebaseapp.com",
    projectId: "imageshoes-e0cdf",
    storageBucket: "imageshoes-e0cdf.appspot.com",
    messagingSenderId: "984191346251",
    appId: "1:984191346251:web:081f103911929f81b64fce",
    measurementId: "${config.measurementId}"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
