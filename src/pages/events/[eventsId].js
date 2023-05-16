import EventContent from "@/Components/event-detail/event-content";
import EventLogistics from "@/Components/event-detail/event-logistics";
import EventSummary from "@/Components/event-detail/event-summary";
import Comments from "@/Components/input/comments";
import { getEventById , getAllEvents} from "@/helpers/api-utli";

import { Fragment } from "react";

const EventsId = (props) => {
  const { selectedEventsid } = props ;
  const event = selectedEventsid
  if (!event) {
    return <p>not found</p>;
  }
  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </Fragment>
  );
};
export const getStaticProps=async(context)=>{
 const urlEvent = context.params.eventsId ; 
 const urleventsID = await getEventById(urlEvent)
 return {
   props : {
     selectedEventsid : urleventsID
   }
 }
}

export const getStaticPaths = async () =>{
     const allevent = await getAllEvents();
     const alleventsID = allevent.map((event) => ({ params : {eventsId : event.id}}))

   return {
        paths : alleventsID ,
        fallback : false
   }
}
export default EventsId;
