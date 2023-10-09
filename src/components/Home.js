import React,{ useState }from "react";
import AWS from "aws-sdk";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";


const Home = () => {
  const { logOut, user } = useUserAuth();
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
    


  
  };
  const uploadFile = async () => {
    // S3 Bucket Name
    const S3_BUCKET = "callforcodeibm";

    // S3 Region
    const REGION = "us-east-1";

    // S3 Credentials
    AWS.config.update({
      accessKeyId: "AKIA47TAMEOOCVPL5X4W",
      secretAccessKey: "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",
    });
    const s3 = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });

    // Files Parameters

    const params = {
      Bucket: S3_BUCKET,
      Key: file.name,
      Body: file,
    };
    var upload = s3
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        // File uploading progress
        console.log(
          "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
        );
      })
      .promise();

    await upload.then((err, data) => {
      console.log(err);
      // Fille successfully uploaded
      alert("File uploaded successfully.");
    });
  };
    const handleFileChange = (e) => {
      // Uploaded file
      const file = e.target.files[0];
      // Changing file state
      setFile(file);
    };

  return (
    <>
      <div className="p-4 box mt-3 text-center">
        Hello Welcome <br />
        {user && user.email}
      </div>
      <div className="App">
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={uploadFile}>Upload</button>
      </div>
    </div>
      

      
      
        
      


      <div className="d-grid gap-2">
        <Button variant="primary" onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </>
  );
  
};
export default Home;
