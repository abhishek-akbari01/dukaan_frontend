console.log("started -  ");

window.addEventListener("push", (e) => {
  const data = e.data.json();
  window.registration.showNotification(
    data.title, // title of the notification
    {
      body: "Push notification from section.io", //the body of the push notification
      image:
        "https://pixabay.com/vectors/bell-notification-communication-1096280/",
      icon: "https://pixabay.com/vectors/bell-notification-communication-1096280/", // icon
    }
  );
});
