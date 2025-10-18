import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mypubz.eportal',
  appName: 'vedichoroo',
  webDir: 'www',

  // Capacitor 7 uses this plugins section
  plugins: {
    FirebaseAuthentication: {
      skipNativeAuth: false,
      providers: ["google.com"],
    },
    Keyboard: {
      resize: "body",
      resizeOnFullScreen: true,
    },
    FirebaseMessaging: {} // <-- Add Firebase Messaging plugin
  },

  server: {
    androidScheme: 'https'
  },

  // Cordova settings are still supported if you have other Cordova plugins
  cordova: {
    preferences: {
      ScrollEnabled: 'false',
      'android-targetSdkVersion': '34',
      'android-compileSdkVersion': '34',
      'android-minSdkVersion': '19',
      BackupWebStorage: 'none',
      SplashMaintainAspectRatio: 'true',
      loadUrlTimeoutValue: '700000',
      AutoHideSplashScreen: 'false',
      SplashScreenDelay: '10000',
      FadeSplashScreenDuration: '1000',
      SplashScreen: 'screen',
      ShowSplashScreen: 'true',
      ShowSplashScreenSpinner: 'true',
      SplashShowOnlyFirstTime: 'false',
      FadeSplashScreen: 'true',
      AndroidPersistentFileLocation: 'Compatibility'
    }
  }
};

export default config;
