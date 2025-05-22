// setAdmin.js
const admin = require("firebase-admin");

// Load your service account key
const serviceAccount = require("./serviceAccountKey.json");

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Replace this with the UID of your user (find in Firebase Console > Auth > Users)
const uid = "y8LjDcf98yOhUphDHzqJJgiZxjw1";

// Set custom claim
admin
  .auth()
  .setCustomUserClaims(uid, { admin: true })
  .then(() => {
    console.log(`✅ User ${uid} is now an admin.`);
  })
  .catch((error) => {
    console.error("❌ Error setting admin claim:", error);
  });
