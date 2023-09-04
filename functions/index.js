const cors = require("cors")({ origin: true });
const admin = require("firebase-admin");
const { onRequest } = require("firebase-functions/v2/https");
const fetch = require("node-fetch");

const serviceAccount = require("./climateappfb-firebase-adminsdk-kcd39-8a63bc8cfe.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


exports.zips = onRequest((request, response) => {
  cors(request, response, async () => {
    try {
      const zip = request.query.zip;

      const snapshot = await admin.firestore().doc(`zips/${zip}`).get();

      const data = snapshot.data();

      response.status(200).send(data);
    } catch (error) {
      response.status(500).send(error);
    }
  });
});

