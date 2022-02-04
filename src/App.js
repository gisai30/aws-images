import logo from "./logo.svg";
import "./App.css";
import S3 from "react-aws-s3";
import { useRef } from "react";

const config = {
  bucketName: "monitor-app-dev",
  dirName: "photos" /* optional */,
  region: "us-west-1",
  accessKeyId: "AKIAT4JDCUNRGGBXZKJT",
  secretAccessKey: "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"
};

function App() {
  const fileInput = useRef();

  const handleClick = e => {
    e.preventDefault();
    console.log(fileInput.current);
    const file = fileInput.current.files[0];
    const ReactS3Client = new S3(config);
    ReactS3Client.uploadFile(file, file.name).then(data => {
      console.log(data);
      if (data.status === 204) {
        console.log("success");
      } else {
        console.log("fail");
      }
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleClick}>
          <label>
            Upload image
            <input type="file" ref={fileInput} />
          </label>
          <br />
          <button type="submit">Upload</button>
        </form>
      </header>
    </div>
  );
}

export default App;
