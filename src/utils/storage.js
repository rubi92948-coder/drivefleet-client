// SAVE BOOKING
export const saveBooking = (car) => {
  const bookings =
    JSON.parse(localStorage.getItem("bookings")) || [];

  bookings.push(car);

  localStorage.setItem(
    "bookings",
    JSON.stringify(bookings)
  );
};

// GET BOOKINGS
export const getBookings = () => {
  return JSON.parse(localStorage.getItem("bookings")) || [];
};

// REMOVE BOOKING
export const removeBooking = (id) => {
  const bookings =
    JSON.parse(localStorage.getItem("bookings")) || [];

  const updatedBookings = bookings.filter(
    (car) => car._id !== id
  );

  localStorage.setItem(
    "bookings",
    JSON.stringify(updatedBookings)
  );
};