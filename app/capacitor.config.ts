import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.vfied.app',
  appName: 'VFIED',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#488AFF",
      sound: "beep.wav",
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#2C3E50'
    },
    Haptics: {},
    App: {
      launchShowDuration: 0
    }
  },
  ios: {
    contentInset: 'automatic'
  },
  android: {
    allowMixedContent: true
  }
};

export default config;