import EventList from "@/Components/events/event-list";
import EventsSearch from "@/Components/events/event-serach";
import { getAllEvents } from "@/helpers/api-utli";
import { useRouter } from "next/router";
import { Fragment } from "react";

const Events = (props) => {
  const {events}= props
  const Allevents =events;
  const Router = useRouter()
   const puShRouter =(year , month)=>{
    Router.push(`/events/${year}/${month}`)
   }
  return(
       <Fragment>
    <EventsSearch onSearch={puShRouter} />
    <EventList items={Allevents} />
  </Fragment>
  )
 
};
export const getStaticProps=async()=>{
  const events = await getAllEvents()
  return {
    props : {
      events : events  
    },
    revalidate : 60
  }
}
export default Events;
