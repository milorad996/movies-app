import HttpService from "./HttpService";


class MovieService extends HttpService{

    
    getAll = async (page = null) => {
        if(page){
            const { data } = await this.client.get(`/movies?page=${page}`);
            return data;
        }
            const { data } = await this.client.get('/movies');
            return data;
        
    };
    get = async (id) => {
        const { data } = await this.client.get(`movies/${id}`);
        return data;
    };
}


export default new MovieService()