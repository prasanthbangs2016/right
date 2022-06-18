import "./verfication.scss";
import { useState } from "react";
import AllImages from "../../../Components/AllImages";
export default function Verfication() {
  let Identity = (
    <div className="tabContent" id="Identity">
      <span className="idPhoto">
        <img src={AllImages.user} />
      </span>
      <span className="details">
        <span className="labels">
          <span>Type of ID</span>
          <span>Name</span>
          <span>ID No.</span>
          <span>Gender</span>
          <span>DOB</span>
          <span>Address</span>
        </span>
        <span className="values">
          <span>: Driving License</span>
          <span>: Victor</span>
          <span>: 99 000 42</span>
          <span>: Male</span>
          <span>: 08-28-1960</span>
          <span>
            : 221 Baker Street
            <br />
            AllenTown USA 04{" "}
          </span>
        </span>
      </span>
    </div>
  );
  let Service = (
    <div className="tabContent" id="Service">
      <div className="Info">
        <span>
          117 S Main St,
          <br />
          Coopersburg,
          <br /> PA 18036,
          <br /> USA
        </span>
        <br /> <br />
        <span>Radius:4-10 Miles</span>
      </div>
      <div className="location">
        <img src={AllImages.location} />
      </div>
    </div>
  );
  let Awards = (
    <div className="tabContent" id="Awards">
      <div>
        <img src={AllImages.certificate} width="400" height="300" />
        <br />
        <center>Certificate</center>
      </div>
      <div>
        <img src={AllImages.reference} width="400" height="300" />
        <br />
        <center>Reference</center>
      </div>
    </div>
  );
  let Profile = (
    <div className="tabContent" id="Profile">
      <img src={AllImages.user} />
    </div>
  );
  const tabs = [Identity, Service, Awards, Profile];
  const tabName = [
    "Identity",
    "Service Location",
    "Awards / References / Certificates",
    "Profile Picture",
  ];
  const [tab, setTab] = useState(0);
  return (
    <div className="Verfication">
      <div className="tabs">
        {tabName.map((element, i) => {
          console.log(element);
          return (
            <span
              key={i}
              className={tab === i ? "tab active" : "tab"}
              onClick={() => setTab(i)}
            >
              {element}
            </span>
          );
        })}
      </div>
      {tabs[tab]}
      <div className="buttons">
        {tab !== 0 ? (
          <input
            type="button"
            className="previous"
            value="Previous"
            onClick={() => {
              setTab(tab - 1);
            }}
          />
        ) : (
          <div></div>
        )}
        {tab == 3 ? (
          <input
            type="button"
            className="next"
            value="Approve"
            onClick={() => {
              if (tab >= 3) setTab(0);
              else setTab(tab + 1);
            }}
          />
        ) : (
          <input
            type="button"
            className="next"
            value="Next"
            onClick={() => {
              if (tab >= 3) setTab(0);
              else setTab(tab + 1);
            }}
          />
        )}
      </div>
    </div>
  );
}
