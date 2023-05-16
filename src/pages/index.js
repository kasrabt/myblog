import EventList from "@/Components/events/event-list";
import NewsletterRegistration from "@/Components/input/newsletter-registration";
import { getFeaturedEvents } from '../helpers/api-utli';

const HomePage = (props) => {
  const { events } = props;
 console.log(events)
  return (
    <div>
      <NewsletterRegistration />
      <EventList items={events} />
    </div>
  );
};
export const getStaticProps=async()=>{
  const featureData = await getFeaturedEvents();
  return {
    props: {
       events: featureData
    }
  }
}
export default HomePage;
