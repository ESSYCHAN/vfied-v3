// Firebase configuration for VFIED V3
import { initializeApp } from 'firebase/app';
import { getFirestore, enableNetwork, disableNetwork } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Your Firebase config (replace with your actual config)
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "vfied-v3.firebaseapp.com",
  projectId: "vfied-v3",
  storageBucket: "vfied-v3.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);

// Firestore collections
export const COLLECTIONS = {
  USERS: 'users',
  DECISIONS: 'decisions',
  FOOD_CHOICES: 'foodChoices',
  USER_PREFERENCES: 'userPreferences',
  APP_STATS: 'appStats'
};

// Connection status
let isOnline = navigator.onLine;

// Handle online/offline status
window.addEventListener('online', async () => {
  isOnline = true;
  try {
    await enableNetwork(db);
    console.log('🔥 Firebase: Back online');
  } catch (error) {
    console.error('Firebase network enable error:', error);
  }
});

window.addEventListener('offline', async () => {
  isOnline = false;
  try {
    await disableNetwork(db);
    console.log('🔥 Firebase: Offline mode');
  } catch (error) {
    console.error('Firebase network disable error:', error);
  }
});

// Helper functions
export const isFirebaseOnline = () => isOnline;

// Initialize offline persistence
try {
  // Firestore will automatically handle offline persistence
  console.log('🔥 Firebase initialized successfully');
} catch (error) {
  console.error('Firebase initialization error:', error);
}

export default app;