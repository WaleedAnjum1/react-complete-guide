import { json, useLoaderData } from "react-router-dom";

import EventsList from "../components/EventsList";

function EventsPage() {
  //Can not use React HOOKS in loader() as loader() is not a React Component
  //In react router this useEffect and useState code can be minimized to loader()
  //   const [isLoading, setIsLoading] = useState(false);
  //   const [fetchedEvents, setFetchedEvents] = useState();
  //   const [error, setError] = useState();

  //   useEffect(() => {
  //     async function fetchEvents() {
  //       setIsLoading(true);
  //       const response = await fetch("http://localhost:8080/events");

  //       if (!response.ok) {
  //         setError("Fetching events failed.");
  //       } else {
  //         const resData = await response.json();
  //         setFetchedEvents(resData.events);
  //       }
  //       setIsLoading(false);
  //     }

  //     fetchEvents();
  //   }, []);

  const data = useLoaderData();
  //   if (data.isError) {
  //     return <p>{data.message}</p>;
  //   }
  const events = data.events;

  return <EventsList events={events} />;
}

export default EventsPage;

export async function loader() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    //return { isError: true, message: "Could not fetch events!" };
    // throw new Response(JSON.stringify({ message: "Could not fetch events." }), {
    //   status: 500,
    // });
    throw json({ message: "Could not fetch events." }, { status: 500 });
  } else {
    return response;
  }
}
