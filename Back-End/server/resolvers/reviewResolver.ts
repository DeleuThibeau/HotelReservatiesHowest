import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { getMongoManager, MongoEntityManager, ObjectID } from 'typeorm'
import { Review } from '../entity/mongoDB/review'

@Resolver()
export class ReviewResolver {
  manager: MongoEntityManager = getMongoManager('connection2')

  @Query(() => [Review], { nullable: true })
  async getReviews(): Promise<Review[]> {
    try {
      return await this.manager.find<Review>(Review)
    } catch {
      return []
    }
  }

  @Query(() => Review, { nullable: true })
  async getReviewById(
    @Arg('id') id: string,
  ): Promise<Review | undefined | null> {
    try {
      const res = await this.manager.findOne<Review>(Review, id)
      return res
    } catch {
      return undefined
    }
  }

  @Mutation(() => Review, { nullable: true })
  async createReview(
    @Arg('data') newReviewData: Review,
  ): Promise<Review | undefined | null> {
    try {
      const result = await this.manager
        .save<Review>(newReviewData)
        .catch(ex => console.log(ex))
      if (result) {
        return result
      } else {
        return undefined
      }
    } catch {
      return null
    }
  }
}
