import { Link, useParams } from "react-router-dom";

const EventDetail = () => {
  const params = useParams();

  return (
    <>
      <h1>Event Details</h1>
      <p>{params.eventId}</p>
      <p><Link to="edit">Edit Event</Link></p>
      <p><Link to=".." relative="path">Back</Link></p>
    </>
  );
};

export default EventDetail;
