import { FunctionComponent, useState } from "react";
import { IClub } from "../types";

const AddClub: FunctionComponent<Props> = ({ closeWindow, clubUpdate }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [club, setClub] = useState<{ clubName: string; imgUri: string }>({
    clubName: "",
    imgUri: "",
  });

  const [img, setImage] = useState<File | null>();

  const addClub: Function = async () => {
    setLoading(true);
    const formData = new FormData();

    if (img) {
      formData.append("file", img);
    }

    formData.append("upload_preset", "dbit-uploads");

    const data = await fetch(
      "https://api.cloudinary.com/v1_1/dctxew3tq/image/upload",
      {
        method: "POST",
        body: formData,
      }
      ).then((res) => res.json());
      
      if (data) {
        const response = await fetch("http://localhost:3000/api/create-club", {
          method: "POST",
          body: JSON.stringify({ clubName: club.clubName, img: data.secure_url }),
        }).then((r) => r.json());
        
        if (response) {
          console.log(response);
          clubUpdate(response);
          window.location.reload();
        }
      }
  };

  const previewImg: Function = () => {
    const reader = new FileReader();
    if (img) {
      reader.readAsDataURL(img);
      reader.onload = (e) => {
        if (e.target?.result) {
          document
            .getElementById("preview")
            ?.setAttribute("src", e.target.result.toString());
        }
      };
    }
  };

  return (
    <section className="add-member-window">
      <form className="add-member-form">
        <div className="header">
          <h2>Add Club</h2>
          <button
            className="btn-round"
            onClick={(e) => {
              e.preventDefault();
              closeWindow(false);
            }}
          >
            <span className="material-symbols-rounded">close</span>
          </button>
        </div>
        <div className="input-grp">
          <input
            type="text"
            placeholder="Club Name"
            onChange={(e) => {
              setClub({ ...club, clubName: e.target.value });
            }}
          />
        </div>
        <div className="input-grp input-file">
          {img ? (
            <div className="preview-img">
              <p style={{ marginBottom: "1em" }}>Image uploaded: </p>
              <div className="img-wrapper">
                <img src="" id="preview" />
              </div>
              {previewImg()}
              <p>{img.name}</p>
              <span
                className="material-symbols-rounded"
                onClick={() => {
                  setImage(null);
                }}
              >
                close
              </span>
            </div>
          ) : (
            <>
              <input
                type="file"
                onChange={(e) => {
                  if (e.target.files) {
                    setImage(e.target.files[0]);
                  }
                }}
              />
              <button className="btn-primary" style={{ width: "100%" }}>
                <span className="material-symbols-rounded">upload</span> Upload
                Image
              </button>
            </>
          )}
        </div>
        <button
          className="btn-primary"
          onClick={(e) => {
            e.preventDefault();
            addClub();
          }}
        >
          {loading ? "Uploading..." : "Add"}
        </button>
      </form>
    </section>
  );
};

interface Props {
  closeWindow: Function;
  clubUpdate: Function;
}

export default AddClub;
