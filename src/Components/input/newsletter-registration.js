import NotificationContext from '@/store/NotificationCtx';
import {  useContext, useRef } from 'react';
import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
  const emailinputref = useRef()
  const notifiCtx =  useContext(NotificationContext) 
  function registrationHandler(event) {
    event.preventDefault();
   const enteredEmail =  emailinputref.current.value ;
   notifiCtx.showNotification({
     title : 'Sign up ...' ,
     message : 'we are working on it...' ,
     status : 'pending'
   })
   fetch('/api/newsletter', {
     method : 'POST' , 
     body : JSON.stringify({email : enteredEmail}) ,
     headers : {
       "Content-Type" : 'application/json',
     }
   }).then(res =>{
     if(res.ok){
       return res.json()
     }else {
      return res.json().then(data=> {throw new Error( data.message || 'somthing went wrong ..')})
       
     }
   }).then(data => notifiCtx.showNotification({
    title : 'finish' ,
    message : 'you are sigend up' ,
    status : 'success'
  })).catch(error => {
    notifiCtx.showNotification({
      title : 'you have an error' ,
      message : 'somthing went Wrong ... ' || error.message ,
      status : 'error'
    })
  })
    
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailinputref}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
