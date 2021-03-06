// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {

  baseUrl: 'https://us-east1-grand-lamp-280803.cloudfunctions.net/',
  token: 'c2lkZTIwMjA=',
  production: false,
  api: {
    getDevices: '',
    deviceData: 'side-dispositivo-function',
    clienteData: 'side-cliente-function',
    userData: 'side-usuario-function',
    login: 'side-login-function',
    sensorData: 'side-dispositivo-function',
    deviceDetail: 'side-historico-function',
    typeSensor: 'side-tipoSensor-function'

  },
  firebase: {
    apiKey: 'AIzaSyA-Ph5XHtWdYHBRtD5vDrhAOThJMty6SPw',
    authDomain: 'grand-lamp-280803.firebaseapp.com',
    databaseURL: 'https://grand-lamp-280803.firebaseio.com',
    projectId: 'grand-lamp-280803',
    storageBucket: 'grand-lamp-280803.appspot.com',
    messagingSenderId: '542339525207',
    appId: '1:542339525207:web:52d622df147376218d5112'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
