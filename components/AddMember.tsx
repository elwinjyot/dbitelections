import { FunctionComponent, useEffect, useState } from "react";

const AddMember: FunctionComponent<Props> = ({ closeWindow, memUpdate }) => {
  const [candidate, setCandidate] = useState<{
    name: string;
    course: string;
    club: string;
    position: string;
    img: File | null;
  }>({ name: "", course: "", club: "", position: "", img: null });
  const [clubOptions, setClubOptions] =
    useState<{ clubName: string; id: string }[]>();

  useEffect(() => {
    fetch("http://localhost:3000/api/get-clubs", {
      method: "GET",
    }).then((res) => {
      res.json().then((data) => {
        setClubOptions(data);
      });
    });
  }, []);

  const addCandidate: Function = async () => {
    const formData = new FormData();
    formData.append("file", candidate.img ? candidate.img : "");
    formData.append("upload_preset", "dbit-uploads");
    const imgUp = await fetch(
      "https://api.cloudinary.com/v1_1/dctxew3tq/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());
    if (imgUp) {
      const res = await fetch("http://localhost:3000/api/create-member", {
        method: "POST",
        body: JSON.stringify({ ...candidate, img: imgUp.secure_url }),
      });

      if (res) {
        res.json().then((data) => {
          console.log(data);
          memUpdate(data);
          closeWindow(false);
        });
      }
    }
  };

  const previewImg: Function = () => {
    const reader = new FileReader();
    if (candidate.img) {
      reader.readAsDataURL(candidate.img);
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
          <h2>Add Candidate</h2>
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
            placeholder="Full Name"
            onChange={(e) => {
              setCandidate({ ...candidate, name: e.target.value });
            }}
          />
        </div>
        <div className="input-grp">
          <select
            onChange={(e) => {
              setCandidate({ ...candidate, course: e.target.value });
            }}
          >
            <option value="" selected>
              Select Course
            </option>
            <option value="BCA">BCA</option>
            <option value="BBA">BBA</option>
            <option value="B.Comm">B.Comm</option>
          </select>
        </div>
        <h3>Club</h3>
        <div className="radio-grp">
          {clubOptions?.map((option) => (
            <label className="radio" id="club-1">
              <input
                type="radio"
                name="club-1"
                value={option.id}
                onChange={(e) => {
                  setCandidate({ ...candidate, club: e.target.value });
                }}
              />
              <p>{option.clubName}</p>
              <span className="material-symbols-rounded checkmark" id="check">
                done
              </span>
            </label>
          ))}
        </div>
        <div className="input-grp">
          <select
            onChange={(e) => {
              setCandidate({ ...candidate, position: e.target.value });
            }}
          >
            <option value="">Select Position</option>
            <option value="President">President</option>
            <option value="Vice President">Vice President</option>
            <option value="Secretary">Secretary</option>
            <option value="class representative male">class representative male</option>
            <option value="class representative female">class representative female</option>
          </select>
        </div>
        <div className="input-grp input-file">
          {candidate.img ? (
            <div className="preview-img">
              <h3 style={{ marginBottom: "1em" }}>Image uploaded: </h3>
              <div className="img-wrapper">
                <img src="" id="preview" />
              </div>
              {previewImg()}
              <p>{candidate.img.name}</p>
              <span
                className="material-symbols-rounded"
                onClick={() => {
                  setCandidate((candidate) => ({ ...candidate, img: null }));
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
                    setCandidate((candidate) => ({
                      ...candidate,
                      img: e.target.files ? e.target.files[0] : null,
                    }));
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
            addCandidate();
          }}
        >
          Add
        </button>
      </form>
    </section>
  );
};

interface Props {
  closeWindow: Function;
  memUpdate: Function;
}

export default AddMember;
