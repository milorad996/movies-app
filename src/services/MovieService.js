import HttpService from "./HttpService";


class MovieService extends HttpService{

    
    getAll = async () => {
        try{
            const { data } = await this.client.get('/movies');
            return data;
        }catch(e){
            console.log(e)
        }
            

        
    }
}


export default new MovieService()