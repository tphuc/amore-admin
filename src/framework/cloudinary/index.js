import axios from "axios";

const baseUrl = "https://api.cloudinary.com/v1_1/minnuochoa-com/image/upload"


const CloudinaryAPI = {
  uploadFiles: async (files) => {


    const form = new FormData();
    return Promise.all(files.map(async file => {

      if (!(file instanceof File) ) {
        return file
      
      }
      else {
        form.append("file", file);
        form.append("upload_preset", "y1rasrxf");

        let res = await axios.post(baseUrl, form)

        return { name: res.data.url}
      }


    }))

  }

}

export {
  CloudinaryAPI
}