import HttpService from "./HttpService";


class CommentService extends HttpService {

    addComment = async (newComment,movieId) => {
        console.log("Comment in service", newComment)
        const { data } = await this.client.post(`/movies/${movieId}/comments`, newComment);
        return data;
    };
    getComments = async (movieId,page = null) => {
        if(page){
            const {data} = await this.client.get(`/comments/${movieId}?page=${page}`);
            return data;
        }
        const {data} = await this.client.get(`/comments/${movieId}`);
        return data;
    }
}

export default new CommentService();