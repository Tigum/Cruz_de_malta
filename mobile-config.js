App.info({
    // id: 'br.com.mrmeats', //Android
    // id: "com.br.mrmeats", //iOS
    name: "Cruz de Malta",
    description: "Cruz de Malta Software",
    author: "Thiago Scolari",
    version: "0.0.1",
    email: "gabrielscolari@despachantemalta.com.br",
    website: "https://cruzdemalta.meteorapp.com"
  });
  
  // Attempt to fix hot code push on mobile
  App.setPreference("WebAppStartupTimeout", 20000);
  
//   App.setPreference("SplashScreen", "CDVSplashScreen");
//   App.setPreference("SplashScreenDelay", "0");
//   App.setPreference("FadeSplashScreenDuration", "0");
//   App.setPreference("android-minSdkVersion", "17");
//   App.setPreference("android-targetSdkVersion", "20");
//   App.setPreference("EnableViewportScale", "true");
  
//   App.setPreference("CameraUsesGeolocation", "false");
  
//   App.icons({
//     app_store: "icons/ios/app_store.png", //(1024x1024) // Apple App Store
//     iphone_2x: "icons/ios/iphone_2x.png", //(120x120) // iPhone 5, SE, 6, 6s, 7, 8
//     iphone_3x: "icons/ios/iphone_3x.png", //(180x180) // iPhone 6 Plus, 6s Plus, 7 Plus, 8 Plus, X
//     ipad_2x: "icons/ios/ipad_2x.png", //(152x152) // iPad, iPad mini
//     ipad_pro: "icons/ios/ipad_pro.png", //(167x167) // iPad Pro
//     ios_settings_2x: "icons/ios/ios_settings_2x.png", //(58x58) // iPhone 5, SE, 6, 6s, 7, 8, iPad, mini, Pro
//     ios_settings_3x: "icons/ios/ios_settings_3x.png", //(87x87) // iPhone 6 Plus, 6s Plus, 7 Plus, 8 Plus, X
//     ios_spotlight_2x: "icons/ios/ios_spotlight_2x.png", //(80x80) // iPhone 5, SE, 6, 6s, 7, 8, iPad, mini, Pro
//     ios_spotlight_3x: "icons/ios/ios_spotlight_3x.png", //(120x120) // iPhone 6 Plus, 6s Plus, 7 Plus, 8 Plus, X
//     ios_notification_2x: "icons/ios/ios_notification_2x.png", //(40x40) // iPhone 5, SE, 6, 6s, 7, 8, iPad, mini, Pro
//     ios_notification_3x: "icons/ios/ios_notification_3x.png", //(60x60 // iPhone 6 Plus, 6s Plus, 7 Plus, 8 Plus, X
//     ipad: "icons/ios/ipad.png", //(76x76) // Legacy
//     ios_settings: "icons/ios/ios_settings.png", //(29x29) // Legacy
//     ios_spotlight: "icons/ios/ios_spotlight.png", //(40x40) // Legacy
//     ios_notification: "icons/ios/ios_notification.png", //(20x20) // Legacy
//     iphone_legacy: "icons/ios/iphone_legacy.png", //(57x57) // Legacy
//     iphone_legacy_2x: "icons/ios/iphone_legacy_2x.png", //(114x114) // Legacy
//     ipad_spotlight_legacy: "icons/ios/ipad_spotlight_legacy.png", //(50x50) // Legacy
//     ipad_spotlight_legacy_2x: "icons/ios/ipad_spotlight_legacy_2x.png", //(100x100) // Legacy
//     ipad_app_legacy: "icons/ios/ipad_app_legacy.png", //(72x72) // Legacy
//     ipad_app_legacy_2x: "icons/ios/ipad_app_legacy_2x.png", //(144x144) // Legacy
//     android_mdpi: "icons/android/android_mdpi.png", // (48x48)
//     android_hdpi: "icons/android/android_hdpi.png", //  (72x72)
//     android_xhdpi: "icons/android/android_xhdpi.png", //  (96x96)
//     android_xxhdpi: "icons/android/android_xxhdpi.png", //  (144x144)
//     android_xxxhdpi: "icons/android/android_xxxhdpi.png", //  (192x192)
//   });
  
//   App.launchScreens({
//     iphone5: "splashscreens/ios/iphone5.png", //(640x1136) // iPhone 5, SE
//     iphone6: "splashscreens/ios/iphone6.png", //(750x1334) // iPhone 6, 6s, 7, 8
//     iphone6p_portrait: "splashscreens/ios/iphone6p_portrait.png", //(1242x2208) // iPhone 6 Plus, 6s Plus, 7 Plus, 8 Plus
//     iphone6p_landscape: "splashscreens/ios/iphone6p_landscape.png", //(2208x1242) // iPhone 6 Plus, 6s Plus, 7 Plus, 8 Plus
//     iphoneX_portrait: "splashscreens/ios/iphoneX_portrait.png", //(1125x2436) // iPhone X
//     iphoneX_landscape: "splashscreens/ios/iphoneX_landscape.png", // (2436x1125) // iPhone X
//     ipad_portrait_2x: "splashscreens/ios/ipad_portrait_2x.png", // (1536x2048) // iPad, iPad mini
//     ipad_landscape_2x: "splashscreens/ios/ipad_landscape_2x.png", // (2048x1536) // iPad, iPad mini
//     iphone: "splashscreens/ios/iphone.png", // (320x480) // Legacy
//     iphone_2x: "splashscreens/ios/iphone_2x.png", // (640x960) // Legacy
//     ipad_portrait: "splashscreens/ios/ipad_portrait.png", // (768x1024) // Legacy
//     ipad_landscape: "splashscreens/ios/ipad_landscape.png", // (1024x768) // Legacy
//     android_mdpi_portrait: "splashscreens/android/drawable-port-mdpi-screen.png",
//     android_mdpi_landscape: "splashscreens/android/drawable-land-mdpi-screen.png",
//     android_hdpi_portrait: "splashscreens/android/drawable-port-hdpi-screen.png",
//     android_hdpi_landscape: "splashscreens/android/drawable-land-hdpi-screen.png",
//     android_xhdpi_portrait: "splashscreens/android/drawable-port-xhdpi-screen.png",
//     android_xhdpi_landscape: "splashscreens/android/drawable-land-xhdpi-screen.png",
//     android_xxhdpi_portrait:
//       "splashscreens/android/drawable-port-xxhdpi-screen.png",
//     android_xxhdpi_landscape:
//       "splashscreens/android/drawable-land-xxhdpi-screen.png",
//     android_xxxhdpi_portrait:
//       "splashscreens/android/drawable-port-xxxhdpi-screen.png",
//     android_xxxhdpi_landscape:
//       "splashscreens/android/drawable-land-xxxhdpi-screen.png"
//   });
  
//   App.configurePlugin("phonegap-plugin-push", {
//     SENDER_ID: 189361638485
//   });
  
//   App.setPreference("StatusBarStyle", "lightcontent");
//   App.setPreference("StatusBarBackgroundColor", "#000000");
//   App.setPreference("StatusBarOverlaysWebView", "false");
  
//   App.accessRule("tel:*");
  App.accessRule("https://*");
  App.accessRule('http://*');
//   App.accessRule("https://*****-uploads.s3-sa-east-1.amazonaws.com/*");
//   App.accessRule("https://www.google.com.br/maps/*");
  App.accessRule('https://*', {
    'minimum-tls-version': 'TLSv1.0',
    'requires-forward-secrecy': false,
  });
  App.accessRule('data:*', { type: 'navigation' });
  
//   App.appendToConfig(`<platform name="ios">
//       <config-file platform="ios" target="*-Info.plist" parent="NSPhotoLibraryUsageDescription">
//         <string>Permitir que o aplicativo utilize sua biblioteca de fotos.</string>
//       </config-file>
//       <config-file platform="ios" target="*-Info.plist" parent="NSCameraUsageDescription">
//         <string>Permitir que o aplicativo utilize sua camera.</string>
//       </config-file>
//     </platform>`);
  