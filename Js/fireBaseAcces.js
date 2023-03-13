const admin = require('firebase-admin');
const serviceAccount = require('../data/neruproject-a28a8-firebase-adminsdk-amgk6-7a369be2f6.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
});
