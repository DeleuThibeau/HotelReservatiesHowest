import maxGuests from "./maxGuests";
import roomService from "./RoomService";

export default interface Room {
    uuid?: string,
    name?: string,
    price?: number,
    description?: string,
    bedType?: string,
    maxGuest?: maxGuests,
    bookingNights?: number,
    area?: number,
    bookingsUuid?: string,
    image?: string,
    bookedDates?: string[],
    roomServices?: roomService[],
  }