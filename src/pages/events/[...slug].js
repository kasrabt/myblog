import EventList from "@/Components/events/event-list";
import ResultsTitle from "@/Components/events/results-title";
import Button from "@/Components/ui/Button";
import { getFilteredEvents } from "@/helpers/api-utli";

import { Fragment } from "react";
import ErrorAlert from '../../Components/ui/error-alert'
const Slug = (props) => {
  const {hasError , events , NFMonth , NFYear} = props

  if (hasError) {
    return (
      <Fragment>
        <ErrorAlert><p>Wrong Url</p></ErrorAlert>
        <div className="center">
          <Button link="/events">show all events</Button>
        </div>
      </Fragment> 
    );
  }
  const filteredEvents = events ;
  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert><p>We dont have any events</p></ErrorAlert>
        <div className="center">
          <Button link="/events">show all events</Button>
        </div>
      </Fragment>
    );
  }
  const date = new Date(NFYear, NFMonth -1);
  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
};
export const getServerSideProps =async(context)=>{
  const { params } = context;
   const SlugUrl = params.slug;
  if (!SlugUrl) {
    return <p>loading ...</p>;
  }
  const filterYear = SlugUrl[0];
  const filterMonth = SlugUrl[1];

  const NFYear = +filterYear;
  const NFMonth = +filterMonth;

  if (
    isNaN(NFYear) ||
    isNaN(NFMonth) ||
    NFMonth < 1 ||
    NFMonth > 12 ||
    NFYear < 2021 ||
    NFYear > 2030
  ) {
    return {
      props : {
         hasError : true 
      }
    }
  }
  const filteredEvents = await getFilteredEvents({
    year: NFYear,
    month: NFMonth,
  });
  
  return {
    props : {
  events  : filteredEvents , 
  date : {
    year  : NFYear , 
    month : NFMonth
  }
    }
  }
}
export default Slug;
