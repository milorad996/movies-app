import HttpService from "./HttpService";


class CommentService extends HttpService {

    addComment = async (newComment,movieId) => {
        console.log("Comment in service", newComment)
        const { data } = await this.client.post(`/movies/${movieId}/comments`, newComment);
        return data;
    };
}

export default new CommentService();