import HttpService from "./HttpService";

class LikeDislikeService extends HttpService {
  createLike = async (newLike, movieId) => {
    const { data } = await this.client.post(
      `/movies/${movieId}/likes`,
      newLike
    );
    return data;
  };
  createDislike = async (newDislike, movieId) => {
    const { data } = await this.client.post(
      `/movies/${movieId}/dislikes`,
      newDislike
    );
    return data;
  };
}

export default new LikeDislikeService();
