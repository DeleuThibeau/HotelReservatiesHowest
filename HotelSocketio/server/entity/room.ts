export class Room {
    uuid?: string
    name?: string
    price?: number
    description?: string
    bedType?: string
    maxGuest?: Record<string,number>
    bookingNights?: number
    area?: number
    image?: string
    bookedDates?:Date[]
    socketid?:string
}