import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import GoogleMapReact from 'google-map-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import contactCss from './contact.module.css';

const Contact = () => {

  const initUserInfo = { 
    firstName: '',   
    lastName: '',
    email: '',
    message: ''
  }
    
  const [userInfo, setUserInfo] = useState(initUserInfo);   
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);
  const formRef = useRef(null);
  const CompanyLocation = ({text}) => <div>{text}</div>;
  const mapCenter = {
    center: {
      lat: 43.90178488252929,
      lng: 18.336620744520634
    },
    zoom: 11
  };
  
  const clearUserInfo = () => {
    if(formRef.current !== null) {
      formRef.current.reset()
    }    
  }

  const notify = (message) => {
    toast(message);    
  }

  const handleUserInfo = () => {
    if(firstNameRef.current !== null && lastNameRef.current !== null
       && emailRef.current !== null && messageRef.current !== null) {
        setUserInfo({
          ...userInfo,  firstName: firstNameRef.current.value,
                        lastName: lastNameRef.current.value,
                        email: emailRef.current.value,
                        message: messageRef.current.value
        })
    }      
  }  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {firstName, lastName, email, message} = userInfo;
    if(firstName !== '' && lastName !== '' && email !== '' && message !== '') {
      const templateParams = {
        from_name: firstName + ' ' + lastName,
        from_email: email,
        to_name: 'merjema.website',
        message: message,
        reply_to: email
      }

      emailjs.send(process.env.REACT_APP_SERVICEID, process.env.REACT_APP_TEMPLATEID, templateParams, process.env.REACT_APP_PUBLICKEY)
      .then((response) => {         
        if( response.status === 200 ) {                   
          notify('Poruka uspješno poslana');
          clearUserInfo();
        }
      }, () => {
        notify('Greška servera, molimo za nekoliko trenutaka pokušajte ponovo!');
      });
      
    } else {
      notify('Molimo popunite sva polja!');
    }
  }

  return(    
    <div className={contactCss['overall-container']}>      
      <div className={contactCss['overall-contact-container']}> 
        <div className={contactCss['contact-info-container']}>
          <p>
            Igmanska do 75, 71320 Vogošća <br/>
            Sarajevo, Bosna i Hercegovina
          </p>   
          <p>Telefon: +387 (0)33 878 210</p>
          <p> Fax: +387 (0)33 878 153</p>
          <p>E-mail: info@meister.ba</p>          
        </div>       
        <form className={contactCss['form-container']}
              ref={formRef} 
              method='POST'
              onSubmit={handleSubmit}
        >          
          <div className={contactCss['user-data-container']}>
            <div className={contactCss['contact-note']}> Kontaktirajte nas: </div>                      
            <input type='text' id='fname' 
                    placeholder='Ime (obavezno)'                   
                    ref={firstNameRef}                                 
            />            
            <input type='text' id='lname' 
                  name='lastName' placeholder='Prezime (obavezno)'                  
                  ref={lastNameRef} 
            />
            <input type='email' id='email' 
                  name='email' placeholder='E-mail (obavezno)'                   
                  ref={emailRef}
            />            
          </div> 
          <div className={contactCss['message-button-container']}>         
            <textarea className={contactCss['message-container']}
                      name='message' 
                      id='message'
                      placeholder='Poruka'                    
                      ref={messageRef}
            >
            </textarea>            
            <button className={contactCss['submit-button']} 
                    type='submit'
                    onClick={handleUserInfo}
            >
                      Pošalji
            </button>            
          </div>          
        </form>        
      </div>
      <div className={contactCss['map-container']}> mapa </div>
      <ToastContainer />      
    </div>    
  )
}
export default Contact;