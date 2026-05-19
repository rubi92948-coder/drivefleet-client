export const saveCar = (car) => {
  const oldCars = JSON.parse(localStorage.getItem("addedCars")) || [];

  localStorage.setItem(
    "addedCars",
    JSON.stringify([...oldCars, car])
  );
};

export const getCars = () => {
  return JSON.parse(localStorage.getItem("addedCars")) || [];
};

export const deleteCar = (id) => {
  const oldCars = JSON.parse(localStorage.getItem("addedCars")) || [];

  const updated = oldCars.filter((car) => car.id !== id);

  localStorage.setItem("addedCars", JSON.stringify(updated));
};

export const updateCar = (updatedCar) => {
  const oldCars = JSON.parse(localStorage.getItem("addedCars")) || [];

  const updated = oldCars.map((car) =>
    car.id === updatedCar.id ? updatedCar : car
  );

  localStorage.setItem("addedCars", JSON.stringify(updated));
};