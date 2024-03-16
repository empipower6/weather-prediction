export const findLocation = () => {
  if (navigator && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      return [latitude, longitude];
    });
  }
  return [
    43.6534817,
    -79.3839347,
    "Geolocation is not supported by this browser.",
  ];
};
