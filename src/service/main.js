
import  axios from 'axios'

const host = 'localhost'
const port = '3003'

export const sendFiles = async (files) => {
    const formData = new FormData();
    console.log('files', files);
    for (const audio of files ) {
        console.log('audioo', audio)
        formData.append('file', audio);
      }
    formData.append(
        "metadata",'holaaa'
      );
    try {
        return await axios.post(`http://${host}:${port}/files`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
    } catch (error) {
        console.log('error', error)
    }

}