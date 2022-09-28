import HttpService from "./HttpService";


class MovieService extends HttpService{

    
    getAll = async () => {
        try{
            const { data } = await this.client.get('/movies');
            return data;
        }catch(e){
            console.log(e);
        }      
    };
    get = async (id) => {
        const { data } = await this.client.get(`movies/${id}`);
        return data;
    };
}


export default new MovieService()