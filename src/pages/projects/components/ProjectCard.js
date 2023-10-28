
export const ProjectCard = ({projectsData, projectsCategory, styles, imgHeight, handleProjectClick}) => { 

  return(
    <>    
      {
        projectsData.map((project, index) => (
          <div  key={index} 
                className={styles.singleProjectContainer}
                onClick={() => handleProjectClick(project.projectId, project.title, project.size, project.description, project.contentImages)}
          > 
            <div className={styles.projectInfo}> 
              <p> {project.title} </p>
              <p> {project.size}  </p>
            </div>
            <img src={require(`../images/${projectsCategory}/${project.projectId}/${project.coverImage}`)} alt='slika'
                style={{height: imgHeight}}
                className={styles.projectImg}                 
            />
          </div>
        ))
      }    
    </>
  )
}