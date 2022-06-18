import "./raBookings.scss";
const dates = [
  { week: "MON", date: "02" },
  { week: "TUE", date: "03" },
  { week: "WED", date: "04" },
  { week: "THU", date: "05" },
  { week: "FRI", date: "06" },
  { week: "SAT", date: "07" },
];
const time = [
  { time: "8:00 am" },
  { time: "8:30 am" },
  { time: "9:00 am" },
  { time: "9:30 am" },
  { time: "10:00 am" },
  { time: "10:30 am" },
  { time: "11:00 am" },
  { time: "11:30 am" },
  { time: "12:00 pm" },
  { time: "12:30 pm" },
  { time: "1:00 pm" },
  { time: "1:30 pm" },
  { time: "2:00 pm" },
  { time: "2:30 pm" },
  { time: "3:00 pm" },
  { time: "3:30 pm" },
  { time: "4:00 pm" },
  { time: "4:30 pm" },
  { time: "5:00 pm" },
  { time: "5:30 pm" },
  { time: "6:00 pm" },
  { time: "6:30 pm" },
];
export default function Rescheduled(props) {
  return (
    <div className="Rescheduled">
      <div className="DateBox">
        <h6>Select the day for reschedule booking</h6>
        <div className="dates">
          {dates.map((item, i) => {
            return (
              <span className="box" key={i}>
                <span className="week">{item.week}</span>
                <span className="date">{item.date}</span>
              </span>
            );
          })}
        </div>
      </div>
      <div className="timeBox">
        <h6>Select the time for reschedule booking</h6>
        <div className="times">
          {time.map((item, i) => {
            return (
              <span className="box" key={i}>
                <span className="time">{item.time}</span>
              </span>
            );
          })}
        </div>
      </div>
      <div className="ModalButton">
        <center>
          <input
            type="submit"
            className="button"
            value="Save"
            style={{ backgroundColor: "#4285f4" }}
          />
          <input
            type="button"
            className="button"
            value="Cancel"
            style={{ backgroundColor: "grey" }}
            onClick={() => {
              props.callback(false);
            }}
          />
        </center>
      </div>
    </div>
  );
}
