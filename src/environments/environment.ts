// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
   firebaseConfig : {
    apiKey: 'AIzaSyDO4WN4ugiloTsArr1KktR-nVZyJP8s1G8',
    authDomain: 'modlers-star.firebaseapp.com',
    databaseURL: 'https://modlers-star.firebaseio.com',
    projectId: 'modlers-star',
    storageBucket: 'modlers-star.appspot.com',
    messagingSenderId: '268108510880'
  }
};
