import "./raBookings.scss";
import AllImages from "../../Components/AllImages";
export default function Chat() {
  return (
    <div className="chatSystem">
      <div className="heading">Booking ID:RA2021-1001</div>
      <div className="chatbox" style={{ justifyContent: "end" }}>
        <div className="system">
          <h6>Appointment reminder:</h6>
          <div>Classic SPA on Monday January 21st at 4:00pm</div>
          <div>Thank you for using our services</div>
        </div>
        <div className="user">
          <div className="name">Victor</div>
          <img className="profile" src={AllImages.user} />
        </div>
      </div>
      <div className="chatbox">
        <div className="user">
          <div className="name">Smith</div>
          <img className="profile" src={AllImages.user} />
        </div>
        <div className="customer">
          <span>
            Hello can we please
            <br />
            rescheduled this to 23rd of <br />
            January? Thanks
          </span>
        </div>
      </div>
    </div>
  );
}
