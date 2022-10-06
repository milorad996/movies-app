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
    createMovie = async (newMovie) => {
        const { data } = await this.client.post("/movies", newMovie);
        return data;
    };
    searchByTerm = async (searchTerm,page) => {
        const {data} = await this.client.get(`/movies-search?title=${searchTerm}&page=${page}`);
        console.log("Search in service" ,data)
        return data;
    }
    filterByTerm = async (filterTerm,page) => {
        const {data} = await this.client.get(`/movies-filter?genre=${filterTerm}&page=${page}`);
        console.log("Filter in service" , data)
        return data;
    }
    getPopularMovies = async() => {
        const {data} = await this.client.get('/popular');
        return data;
    }
}


export default new MovieService()