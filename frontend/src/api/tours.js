import axiosInstance from "./axiosInstance";

const getTours = async () => {
  try {
    const response = await axiosInstance.get("/tours", {
      params: { limit: 10, offset: 0 },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tours:", error);
    throw error;
  }
};

const getTourAvailability = async () => {
  try {
    const response = await axiosInstance.get("/tours/availability");
    return response.data;
  } catch (error) {
    console.error("Error fetching tour availability:", error);
    throw error;
  }
};

const reserveTour = async (tour_schedule_id, user_id, num_seats) => {
  try {
    const response = await axiosInstance.post("/tours/reserve", {
      tour_schedule_id,
      user_id,
      num_seats,
    });
    return response.data;
  } catch (error) {
    console.error("Error reserving tour:", error);
    throw error;
  }
};

export { getTours, getTourAvailability, reserveTour };
