/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import './App.css';
import {useState } from 'react'
import { sendFiles }  from './service/main'

const MAX_COUNT = 1000;

function App() {

	const [uploadedFiles, setUploadedFiles] = useState([])
    const [fileLimit, setFileLimit] = useState(false);


    const handleUploadFiles = files => {
        const uploaded = [...uploadedFiles];
        let limitExceeded = false;
        files.some((file) => {
            if (uploaded.findIndex((f) => f.name === file.name) === -1) {
                uploaded.push(file);
                if (uploaded.length === MAX_COUNT) setFileLimit(true);
                if (uploaded.length > MAX_COUNT) {
                    alert(`You can only add a maximum of ${MAX_COUNT} files`);
                    setFileLimit(false);
                    limitExceeded = true;
                    return true;
                }
            }
        })
        if (!limitExceeded) setUploadedFiles(uploaded)

    }

    const handleFileEvent =  (e) => {
        const chosenFiles = Array.prototype.slice.call(e.target.files)
        handleUploadFiles(chosenFiles);
    }

    const handleSend = () =>{
      sendFiles(uploadedFiles);
    }

    return (
		<div className="App">

			<input id='fileUpload' type='file' multiple
                    onChange={handleFileEvent}
                    disabled={fileLimit}
			/>

			<label htmlFor='fileUpload'>
				<a className={`btn btn-primary ${!fileLimit ? '' : 'disabled' } `}>Upload Files</a>
			</label>

			<div className="uploaded-files-list">
				{uploadedFiles.map(file => (
                    <div >
                        {file.name}
                    </div>
                ))}
			</div>

      <div>
        sendFiles
        <button onClick={handleSend}>
          Senddd
        </button>
      </div>

		</div>
	);
}

export default App;
