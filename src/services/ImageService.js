import HttpService from "./HttpService";

class ImageService extends HttpService {
  uploadImage = async (fromData) => {


    const { data } = await this.client.post("/upload-image", fromData, {
      headers: {
        accept: "application/json",
        "Accept-Language": "en-US,en;q=0.8",
        "Content-Type": `multipart/form-data`,
      },
    });
    return data;
  };
}

export default new ImageService();
