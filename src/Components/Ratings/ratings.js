import "./ratings.scss";
import StarRatings from "react-star-ratings";
import AllImages from "../AllImages";
export default function Ratings(props) {
  const ratings = props.data.ratings;
  const type = props.data.type;
  const color = props.data.color;
  const user = props.data.name;
  var div = ratings.length;
  var sum = 0;
  var RaterList = (
    <div>
      {ratings.map((item, i) => {
        sum = sum + parseInt(item.rating);
        return (
          <div className="experienceRating" key={i}>
            <span className="name">
              {i + 1}. {item.type}
            </span>
            <span className="rating">({item.rating})</span>
            <StarRatings
              rating={item.rating}
              starRatedColor={color}
              numberOfStars={5}
              name="rating"
              starDimension="24px"
              className="sRating"
            />
            <span className="rate"></span>
          </div>
        );
      })}
    </div>
  );
  return (
    <div className="Ratings">
      <div className="head">
        {type === "tasker" ? (
          <div className="customerHead">
            <span className="info">
              <img src={AllImages[user.image]} />
              <span>
                <div className="name">{user.name}</div>
                <div className="profession">{user.profession}</div>
              </span>
            </span>
            <span className="average_score">
              <div className="profession">Average Score</div>
              <span className="starRating">
                <span className="rating">{sum / div}</span>
                <StarRatings
                  rating={sum / div}
                  starRatedColor="red"
                  numberOfStars={5}
                  name="rating"
                  starDimension="27px"
                />
              </span>
            </span>
          </div>
        ) : (
          <center>
            <h5>{user.name}</h5>
          </center>
        )}
        <div className="question">
          How would you rate your experience
          {type === "tasker" ? " with " : " serving "} {user.name} ?<br />
          {type !== "tasker" ? (
            <div className="Rating">
              <StarRatings
                rating={sum / div}
                starRatedColor="green"
                numberOfStars={5}
                name="rating"
                starDimension="40px"
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="body">
        {RaterList}
        <div className="feedback">
          <div className="Question">Do you have any additional Feedback ?</div>
          <input
            type="textarea"
            className="textBox"
            placeholder="Tell us what is on your mind"
          />
          <input type="button" className="button" value="Submit" />
        </div>
      </div>
    </div>
  );
}
