window.isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

(function(navigator){
  var clientData = {
    request:{
      url:location.href,
      datetime: (new Date()).toString(),
      connectionType:navigator.connection.type
    },
    device:{
      isMobileDevice:isMobile.any(),
      platform:navigator.platform,
      touchScreen:navigator.maxTouchPoints>0
    },
    browser:{
      userAgent:navigator.userAgent,
      browserVendor:navigator.vendor
    },
    preferences:{
      cookiesEnabled:navigator.cookieEnabled,
      doNotTrack:navigator.doNotTrack,
      javaEnabled:navigator.javaEnabled()
    },
    locale:{
      language:navigator.language
    }
  };
  navigator.geolocation.getCurrentPosition(function(geo){
    clientData.locale.position = {lat:geo.coords.latitude, lon:geo.coords.longitude};
    navigator.getBattery().then(function(battery){
      clientData.device.battery = {charging:battery.charging, percentage: Math.ceil(battery.level * 100)};
    });
  });
})(navigator);