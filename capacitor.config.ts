import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'vedichoroo',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  cordova: {
    preferences: {
      ScrollEnabled: 'false',
      'android-targetSdkVersion': '33',
      'android-compileSdkVersion': '33',
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
