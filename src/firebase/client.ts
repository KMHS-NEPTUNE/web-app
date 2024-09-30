import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAXAlx-XF_8I2E2Vqb74jAaTwkxaQr29HA",
    authDomain: "kmhs-neptune-web-app.firebaseapp.com",
    projectId: "kmhs-neptune-web-app",
    storageBucket: "kmhs-neptune-web-app.appspot.com",
    messagingSenderId: "948196487338",
    appId: "1:948196487338:web:42e3a368e114aeedad60d3",
    measurementId: "G-PDXWGF7DNR"
    };

export const app = initializeApp(firebaseConfig);
