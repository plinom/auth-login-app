# MSG

## Environment Configuration

This project consists of an API application and a web application. Below are the required environment variables for each part of the application.

### msg-api Application Environment Variables

The API application requires the following environment variables:

#### General Configuration
- `WEB_HOST`: Host address for the web application.
- `WEB_PORT`: Port for the web application to listen on.
- `API_HOST`: Host address for the API server.
- `API_PORT`: Port for the API server to listen on.

#### Database and Firebase Configuration
- `MONGO_URI`: MongoDB connection string (including credentials if required).
- `FIREBASE_CLIENT_EMAIL`: Firebase service account client email.
- `FIREBASE_PRIVATE_KEY`: Firebase service account private key.
- `FIREBASE_PROJECT_ID`: Firebase project ID.

### msg-web Application Environment Variables

The web application has its own set of required environment variables:

#### General Configuration
- `API_HOST`: Host address of the API server. Set to `localhost` by default.
- `API_PORT`: Port of the API server. Set to `3001` by default.
- `WEB_HOST`: Host address for the web application. Set to `localhost` by default.
- `WEB_PORT`: Port for the web application to listen on. Set to `3000` by default.

#### Firebase Configuration
- `FIREBASE_API_KEY`: Firebase API key.
- `FIREBASE_AUTH_DOMAIN`: Firebase Auth domain.
- `FIREBASE_PROJECT_ID`: Firebase project ID.
- `FIREBASE_STORAGE_BUCKET`: Firebase storage bucket URL.
- `FIREBASE_MESSAGING_SENDER_ID`: Firebase messaging sender ID.
- `FIREBASE_APP_ID`: Firebase app ID.
- `FIREBASE_MEASUREMENT_ID`: Firebase measurement ID.
