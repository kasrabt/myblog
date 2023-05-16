import EventItem from "./event-item";
import classes from './event-list.module.css'
const EventList = (props) => {
  const { items } = props;
  return (
    <ul className={classes.list}>
      {items.map((event) => (
        <EventItem
          key={event.id}
          id={event.id}
          image={event.image}
          location={event.location}
          title={event.title}
          date={event.date}
        />
      ))}
    </ul>
  );
};
export default EventList;
