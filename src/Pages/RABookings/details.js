import "./raBookings.scss";
import { AiFillCheckCircle } from "react-icons/ai";
import CommonModal from "../../Components/commonmodal";
import Chat from "./chat";
const bookingDetails = {
  id: "RA2021-1001",
  revenue: 100,
  status: [
    { name: "Booking Confirmed", status: true },
    { name: "RA Tasker assigned for HairCut", status: true },
    { name: "Estimated start time", status: false, time: "10:30am" },
    { name: "Estimated end time", status: false, time: "11:30am" },
    { name: "Completed", status: false },
  ],
  tracking: [
    {
      date: "06-28-2021",
      time: "10:40am",
      details: "Nicholas",
    },
    {
      date: "06-29-2021",
      time: "10:20am",
      details: "Victor Bateman",
    },
    {
      date: "06-29-2021",
      time: "10:40am",
      details: " RA Tasker on the way",
    },
  ],
  requester: {
    name: "Nicholas Smith",
    number: "(717) 525-2145",
    address: "3108-2500, Flint Hill RD, Coopersburg, PA, 18036",
    email: "nicholas@gmail.com",
  },
  tasker: {
    name: "Victor",
    number: "(712) 526-2245",
    email: "Victor@gmail.com",
  },
  service: {
    mastercategory: "Salon for Men",
    category: "Hairstyle",
    subcategory: "Haircut",
    microcategory: "Haircut - Cut for 2",
    appointment: "6-26-2021 @ 10:30am",
  },
};
export default function Details() {
  let status = bookingDetails.status;
  return (
    <div className="Details">
      <div className="bookings">
        <strong>
          Booking ID: {bookingDetails.id}
          <span> RA Tasker Assigned</span>
        </strong>
        <strong>
          Revenue:<span>${bookingDetails.revenue}</span>
        </strong>
      </div>
      <div className="status">
        {status.map((item, i) => {
          return (
            <div className="statusbox" key={i}>
              <div className="bar">
                <AiFillCheckCircle
                  color={item.status === true ? "green" : "grey"}
                  size={30}
                />
                {i != 4 ? (
                  <div
                    className="line"
                    style={
                      item.status === true
                        ? { backgroundColor: "green" }
                        : { backgroundColor: "grey" }
                    }
                  ></div>
                ) : (
                  ""
                )}
              </div>
              <div>
                {item.name}
                <strong>
                  <span>{item.time}</span>
                </strong>
              </div>
            </div>
          );
        })}
      </div>
      <div className="tracking">
        <div className="header">Tracking Details</div>
        <div className="body">
          <table>
            <tbody>
              <tr key={0}>
                <td>{bookingDetails.tracking[0].date}</td>
                <td>{bookingDetails.tracking[0].time}</td>
                <td>
                  Booking Confirmed (Requested by &nbsp;
                  <span className="Boldblue">
                    {bookingDetails.tracking[0].details}
                  </span>
                  )
                </td>
              </tr>
              <tr key={1}>
                <td>{bookingDetails.tracking[1].date}</td>
                <td>{bookingDetails.tracking[1].time}</td>
                <td>
                  <span className="Boldblue">
                    {bookingDetails.tracking[1].details}
                  </span>
                  &nbsp; Assigned for haircut service
                </td>
              </tr>
              <tr key={2}>
                <td>{bookingDetails.tracking[2].date}</td>
                <td>{bookingDetails.tracking[2].time}</td>
                <td>{bookingDetails.tracking[2].details}</td>
              </tr>
              {/* {bookingDetails.tracking.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{item.date}</td>
                    <td>{item.time}</td>
                    <td>{item.details}</td>
                  </tr>
                );
              })} */}
            </tbody>
          </table>
        </div>
      </div>
      <div className="personalDetails">
        <div className="person">
          <div>
            <h6>RA Requester</h6>
            <div className="detail">
              <div className="head">Name</div>
              <div className="body">: {bookingDetails.requester.name}</div>
            </div>
            <div className="detail">
              <div className="head">Phone Number</div>
              <div className="body">: {bookingDetails.requester.number}</div>
            </div>
            <div className="detail">
              <div className="head">Address</div>
              <div className="body">: {bookingDetails.requester.address}</div>
            </div>
            <div className="detail">
              <div className="head">Email ID</div>
              <div className="body">
                <div className="boldblue">
                  : {bookingDetails.requester.email}
                </div>
              </div>
            </div>
          </div>
          <div>
            <h6>RA Tasker</h6>
            <div className="detail">
              <div className="head">Name</div>
              <div className="body">: {bookingDetails.tasker.name}</div>
            </div>
            <div className="detail">
              <div className="head">Phone Number</div>
              <div className="body">: {bookingDetails.tasker.number}</div>
            </div>
            <div className="detail">
              <div className="head">Email ID</div>
              <div className="body">
                <div className="boldblue">: {bookingDetails.tasker.email}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="service">
          <div>
            <h6>Service Details</h6>
            <div className="detail">
              <div className="head">Master Category</div>
              <div className="body">
                : {bookingDetails.service.mastercategory}
              </div>
            </div>
            <div className="detail">
              <div className="head">Category</div>
              <div className="body">: {bookingDetails.service.category}</div>
            </div>
            <div className="detail">
              <div className="head">Sub Category</div>
              <div className="body">: {bookingDetails.service.subcategory}</div>
            </div>
            <div className="detail">
              <div className="head">Micro Category</div>
              <div className="body">
                : {bookingDetails.service.microcategory}
              </div>
            </div>
            <div className="detail">
              <div className="head">Date of Appointment</div>
              <div className="body">
                <div className="boldblue">
                  : {bookingDetails.service.appointment}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="chat">
        <div>
          <div className="system">
            <h6>Appointment reminder:</h6>
            <div>Classic SPA on Monday January 21st at 4:00pm</div>
            <div>Thank you for using our services</div>
          </div>
        </div>
        <div className="cust">
          <div className="customer">
            <span>
              Hello can we please
              <br />
              rescheduled this to 23rd of <br />
              January? Thanks
            </span>
          </div>
          <CommonModal
            data={{
              header: "Chat",
              heading: <div className="boldblue">View More</div>,
              body: <Chat />,
              size: "lg",
              screen: "fullscreen",
            }}
          />
        </div>
      </div>
    </div>
  );
}
