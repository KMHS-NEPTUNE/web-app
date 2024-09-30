import type { ServiceAccount } from "firebase-admin";
import { initializeApp, cert, getApps } from "firebase-admin/app";

const activeApps = getApps();
const serviceAccount = {
    "type": "service_account",
    "project_id": "kmhs-neptune-web-app",
    "private_key_id": "4a197c578e8026ad631f71be6d4d42661eb0821c",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC8a38XIUcffES6\nzdu8kIyARNf669/WwLXgn/vltYlF7XevC7BM+u07gLbT3NG2C5p76yp0tNMZUmNr\n2k3WIxvWLmw/MOA0CdWuZtMAKtzOkBy4NUHf/yiRk2ne9aiP6Mxn8ORKSVaX+OIE\niNePdmoBce9ZunPeaOnlkUesZ+VU/UetvpKaLizmbZPtoDEEAcNsbrzZxUpe5ZWy\nslDJdvy0gADl+TRz71f+tvx4590X4D0Lyyk+gi+2QAPw1MffdYm6Bs1BzQBE2lJ9\n70l1iHqKJior1LWjIIAcu4XJ6evX5UGlVaUpQGAOcM32OfHdmcJfUrA9dmwm6REx\nwacFpYpZAgMBAAECggEAIGPSSyWbVlxEbGBq/7VRkdND1Yyqw/4Ixf56jPhyCqVR\nx7OYsQMJuQrdYvo4yrSf7+FzQPC8wUOad7XlX4RVirIcRZifUhLGut5OM18q6g94\nAGqXUmxIiw3uSzerrGF2kf+lHugQjLtqDyF+/Nh8TJdLb/9PX9JlMuOQkKCjmcJN\nB0PDaIpIe5VFJCKSnh3Gx4W9BrQK33qdplTJ2XzKSes5cZalW47SH02ZPpTdTH25\nWPKUBaR+09Z3b5dY7wnY2kF3jBQRO0Kp0k8ACCHH2gqjcs7cpL+k/jsbzD3IUMvs\nce5s++cXc5Vkqqc6yOZTXAVVylr+BwVI+bjbVSrDaQKBgQDc9WYL7tGew+muqqGx\nLzw3o2BYrwpuoApqkWQm5h9Iqur4AuL+W4sjtJvEN80B+G1XU2DSAMOs+0rOFGLH\nVr3ZCdG8oEuX6P7RJivxrqg6GCQoTjpj3u6hFuiDcWnuC4ANUTGB8P33X5NOgM/v\nhQH7t2MB5n+WYY1HLnYcHYS6XwKBgQDaTRL6Rz/92GXLJLu4q0UjrvVK19tRGWWp\n53zJoEtkcc1P2yGwEalKSGK9dC8sWbAeDwm+t8GXINHHVX83D6Fg4cg5oklu6xts\ngZnAahQbRi+xTTZZgEqN8vYvIBCih1tQdp2BGs7xsFiEDDU2j6YV88VIozSiMFrs\n+9h+XOxmRwKBgH5NsFVl4GEWr/9t/htgWtWbCDnpZNczmICuN0edB4jsWoAGdmbb\nQT/Zv6h8FS3pKede+9tPIItC4dHHCWfVB5SG7mMaZduiDfbUEQ6HvhXnMtPvU6U/\nC7z9cU+hhuHRpRL3tIsIjMPY2EVpkHLj3uxaObgeYBRAExf7UPxlSzeVAoGBANc/\nH/M/xc0aTmSbd62C0s14ecyuQkYY8LEy20xDjZMg0vxmaTUedPoVnaaIpOrqFEnP\nMiCnN284oSAXITS9aLYKak7JwfZoQ8Ydk+ixr9mkvunn5Csj4F9OrYeR6lUXeeZA\nztS6BksxQlYRY3bE9VK35lLU+dTiMQVy3eja3w2JAoGBALdtLaEFue6J7F9y+iXK\ntNQSphu0qZiowcPGeH80XNJuExdWvN1DufZvMAKaYml08NIO0Q4BX436etf6FsvZ\ntlA0Nxk8K9e0nqO3KUIF5Qjp7BeUA7JYwQz+8zJ25iQZIltOl//4iDzP0BPqA3OB\nBv+X1OCO1XkudlA1Xvq6rVF9\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-szts5@kmhs-neptune-web-app.iam.gserviceaccount.com",
    "client_id": "108642253069083679965",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-szts5%40kmhs-neptune-web-app.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
}
  

const initApp = () => {
  if (import.meta.env.PROD) {
    console.info('PROD env detected. Using default service account.')
    // Use default config in firebase functions. Should be already injected in the server by Firebase.
    return initializeApp()
  }
  console.info('Loading service account from env.')
  return initializeApp({
    credential: cert(serviceAccount as ServiceAccount)
  })
}

export const app = activeApps.length === 0 ? initApp() : activeApps[0];
