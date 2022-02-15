export default interface Review {
    id?: string,
    roomId?: string,
    starRating?: number,
    comment?: string,
    userId?: string,
    userImage?: string,
    userName?: string,
    createdAt?: Date,
  }