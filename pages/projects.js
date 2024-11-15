import ProjectList from "../components/projects"
import { fetchAPI } from "../lib/api"
import Layout from "../components/layout"
import Seo from "../components/seo"

const Projects = ({ categories, activeProjects, completedProjects }) => {
  const seo = {
    metaTitle: "Projects",
    metaDescription: `All projects`, /////// !!!!!!!!!!!!
  }

  return (
    <Layout categories={categories.data} projects={activeProjects}>
      <Seo seo={seo} />
      <div className="uk-section">
        <div className="uk-container uk-container-medium">
          <h2> Projects </h2>
          <h3>Active Projects</h3>
          <ProjectList projects={activeProjects} type="active" />

          <h3>Completed Projects</h3>
          <ProjectList projects={completedProjects} type="completed" />
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  /*
  const [activeProjects, completedProjects] = await Promise.all([
    fetchAPI("https://giv-back.herokuapp.com/api/projects", {
      populate: "*",
      filters: {
        status: {
          $eq: true,
        },
      },
      sort: "createdAt:desc",
    }),

    fetchAPI("https://giv-back.herokuapp.com/api/projects", {
      populate: "*",
      filters: {
        status: {
          $eq: false,
        },
      },
      sort: "createdAt:desc",
 
    }),
  ])
 

  const allCategories = await fetchAPI(
    "https://giv-back.herokuapp.com/api/categories"
  )
*/
  return {
    props: {
      /*
      //   category: matchingCategories.data[0],
      categories: allCategories,
      activeProjects: activeProjects.data,
      completedProjects: completedProjects.data,
      */
    },
    revalidate: 1,
  }
}

export default Projects
