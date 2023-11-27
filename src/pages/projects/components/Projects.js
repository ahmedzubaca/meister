import React from "react";
import Footer from '../../../components/Footer'
import {projectsData} from '../helperFiles/projectsData';
import { useParams, useNavigate } from "react-router-dom";
import { ProjectCard } from "./ProjectCard";
import useWindowResize from "../../../helperFunctions/windowWidth";
import styles from '../cssModules/projects.module.css'

const Projects = () => {  
  const windowSize = useWindowResize();
  const { projectsCategory } = useParams();
  const navigate = useNavigate();
  let imgHeight = 0;  

  const calculateImgHeight = (viewportWidth) => {    
    if(viewportWidth >= 500 && viewportWidth < 900) {
      return 9* (43 * viewportWidth/100) / 16
    }
    else if(viewportWidth >= 900 && viewportWidth < 1200) {
      return 9* (30 * viewportWidth/100) / 16
    }
    else if(viewportWidth >= 1200) {
      return 9* (25 * viewportWidth/100) / 16
    }
    else {
      return 9 * viewportWidth / 16
    }    
  }
    
  imgHeight = calculateImgHeight(windowSize.windowWidth);

  const handlProjectClick = (id, title, size, description, images) => {    
    const urlTitle = title.toLowerCase().replace(/\s+/g, '-')
    navigate(`/projects/${projectsCategory}/${urlTitle}`,
    {
      state: {
        id: id,
        title: title,
        size: size,
        description: description,
        images: images,
        projectsCategory: projectsCategory        
      }
    })
  }  

  return (
    <>
    <div className={styles.overallContainer}>
      <p className={styles.projectsCategoryTitle}>
          {
            projectsCategory === 'completedProjects' ? 'ZAVRŠENI PROJEKTI' 
            : projectsCategory === 'ongoingProjects' ? 'PROJEKTI U RADU' : ''
          }
      </p> 
      <div className={styles.allProjectsContainer}>
        {          
          <ProjectCard  projectsData = { projectsCategory === 'completedProjects' ? projectsData.completedProjects
                                        : projectsCategory === 'ongoingProjects' ? projectsData.ongoingProjects
                                        : null
                                       } 
                        projectsCategory={ projectsCategory }               
                        imgHeight = {imgHeight}
                        styles = {styles} 
                        handleProjectClick = {handlProjectClick}
          />            
        } 
      </div>
    </div>
    <div className={styles.foterDiv}>
      <Footer />
    </div>
  </>
  )
} 
export default Projects;