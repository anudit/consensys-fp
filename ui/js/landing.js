var options = {
    bottom: '32px',
    left: 'unset',
    right: '32px',
    time: '0.5s',
    mixColor: '#fff',
    backgroundColor: '#fff',
    buttonColorDark: '#100f2c',
    buttonColorLight: '#fff',
    saveInCookies: true,
    label: '🌓',
    autoMatchOsTheme: false
  }
  const darkmode = new Darkmode(options);
  darkmode.showWidget();

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('serviceworker.js', {scope: '/'})
    .then((reg) => {
      // registration worked
      console.log('Registration succeeded. Scope is ' + reg.scope);
    }).catch((error) => {
      // registration failed
      console.log('Registration failed with ' + error);
    });
  }
