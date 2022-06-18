import { useState } from "react";
export default function UploadField(props) {
  let item = props.data;
  const [inputValue, setInput] = useState(item.defaultValue);
  let onUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file, file.name);
    props.callback(formData);
  };
  return (
    <div className="formBox">
      <span className="boxLabel">{item.name}</span>
      <input
        type="file"
        id={"files" + item.name}
        style={{ display: "none" }}
        onChange={(event) => {
          let file = event.target.files[0];
          onUpload(file);
          setInput(file.name);
        }}
        disabled={item.disabled === item.type ? "disabled" : ""}
      />
      <div>
        <div className="inputBox">{inputValue}</div>
        <label className="Uploadlabel" htmlFor={"files" + item.name}>
          Upload File
        </label>
      </div>
      <span className="Error">{item.errorvalue}</span>
    </div>
  );
}
