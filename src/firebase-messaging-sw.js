importScripts('https://www.gstatic.com/firebasejs/5.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.5.0/firebase-messaging.js');


// // messagingSenderId.
firebase.initializeApp({
  messagingSenderId: "689198147494",
});

if (firebase.messaging.isSupported()) {
  // // Retrieve an instance of Firebase Messaging so that it can handle background
  // // messages.
  const messaging = firebase.messaging();

  messaging.setBackgroundMessageHandler(function (payload) {
    let redirection = payload.data.urlToRedirect;


    var dataBody = (payload.data);
    const notificationTitle = dataBody.title;
    const notificationOptions = {
      body: dataBody.body,
      icon: dataBody.icon,
      click_action: redirection,
      data: {
        click_action: redirection
      }
    };
    self.addEventListener('notificationclick', function (event) {
      event.notification.close();
      event.waitUntil(self.clients.openWindow(redirection, '_self'));


    });


    return self.registration.showNotification(notificationTitle,
      notificationOptions);
  });
}














// importScripts('https://www.gstatic.com/firebasejs/5.5.0/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/5.5.0/firebase-messaging.js');


// // // messagingSenderId.
// firebase.initializeApp({ 
//    messagingSenderId: "689198147494",
// });

// if (firebase.messaging.isSupported()) {
//   // // Retrieve an instance of Firebase Messaging so that it can handle background
//   // // messages.
//   const messaging = firebase.messaging();

//   messaging.setBackgroundMessageHandler(function (payload) {
//     let redirection = payload.data.urlToRedirect;


//     var dataBody = (payload.data);
//     const notificationTitle = dataBody.title;
//     const notificationOptions = {
//       body: dataBody.body,
//       icon: dataBody.icon,
//       click_action: redirection,
//       data: {
//         click_action: redirection
//       }
//     };
//     self.addEventListener('notificationclick', function (event) {
//       event.notification.close();
//       event.waitUntil(self.clients.openWindow(redirection, '_self'));


//     });


//     return self.registration.showNotification(notificationTitle,
//       notificationOptions);
//   });
// }
