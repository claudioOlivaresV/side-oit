export const environment = {
  baseUrl: 'https://us-east1-grand-lamp-280803.cloudfunctions.net/',
  production: true,
  api: {
    getDevices: '',
    deviceData: 'side-dispositivo-function',
    clienteData: 'side-cliente-function',
    userData: 'side-usuario-function',
    login: 'side-login-function',
    sensorData: 'side-dispositivo-function',
    deviceDetail: 'side-historico-function',
    typeSensor: 'side-tipoSensor-function',
    onOff: 'side-exec-function',

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
