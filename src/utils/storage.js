export const saveBooking = (car) => {
  const old = JSON.parse(localStorage.getItem("bookings")) || [];

  // prevent duplicate
  const exists = old.find((item) => item.id === car.id);
  if (exists) return;

  localStorage.setItem("bookings", JSON.stringify([...old, car]));
};

export const getBookings = () => {
  return JSON.parse(localStorage.getItem("bookings")) || [];
};

export const removeBooking = (id) => {
  const old = JSON.parse(localStorage.getItem("bookings")) || [];
  const updated = old.filter((item) => item.id !== id);
  localStorage.setItem("bookings", JSON.stringify(updated));
};