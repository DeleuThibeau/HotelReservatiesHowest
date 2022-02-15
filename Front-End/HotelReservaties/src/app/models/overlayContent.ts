import Booking from "./booking";
import Review from "./review";

export default interface overlayContent {
    reviews?: Review[],
    bookings?: Booking[],
  }