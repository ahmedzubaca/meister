import React from "react";
import Footer from '../../components/Footer';
import styles from './about.module.css';

const About = () => {
  
  return (
    <>
      <div> Hello from About </div>
      <div className={styles.footerDiv}>
        <Footer /> 
      </div>
    </>
  )
} 
export default About;