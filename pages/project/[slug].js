import ReactMarkdown from "react-markdown"
import Moment from "react-moment"
import { fetchAPI } from "../../lib/api"
import Layout from "../../components/layout"
import NextImage from "../../components/image"
import Seo from "../../components/seo"
import { getStrapiMedia } from "../../lib/media"

const Project = ({ project, categories, projects }) => {
  const imageUrl = getStrapiMedia(project.attributes.image)

  const seo = {
    metaTitle: project.attributes.title,
    metaDescription: project.attributes.description,
    shareImage: project.attributes.image,
    project: true,
  }

  return (
    <Layout categories={categories.data} projects={projects}>
      <Seo seo={seo} />
      {/*
      <div
        id="banner"
        className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin"
        data-src={imageUrl}
        data-srcset={imageUrl}
        data-uk-img
      ></div>*/}
      <div className="uk-section">
        <div className="uk-container uk-container-small">
          {/*
          <NextImage
            imageurl={project.attributes.imageurl}
            width={300}
            height={200}
          />
        */}
          <h2>{project.attributes.title}</h2>

          <div className="uk-flex  project-fields">
            {project.attributes.date && (
              <div>
                <h3>Date</h3>
                <p>{project.attributes.date}</p>
              </div>
            )}
            {project.attributes.location && (
              <div>
                <h3>Location</h3>
                <p>{project.attributes.location}</p>
              </div>
            )}
            {project.attributes.amount && (
              <div>
                <h3>Amount</h3>
                <p>{project.attributes.amount}</p>
              </div>
            )}
          </div>
          <ReactMarkdown
            source={project.attributes.content}
            escapeHtml={false}
          />
          <hr className="uk-divider-small" />
          <div className="uk-grid-small uk-flex-left" data-uk-grid="true">
            <div>
              {project.attributes.author.picture && (
                <NextImage image={project.attributes.author.picture} />
              )}
            </div>
            {/* <div className="uk-width-expand">
             
              <p className="uk-margin-remove-bottom">
                By {project.attributes.author.name}
              </p>
              <p className="uk-text-meta uk-margin-remove-top">
                <Moment format="MMM Do YYYY">
                  {project.attributes.published_at}
                </Moment>
              </p>
            </div>*/}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  /*
  const projectsRes = await fetchAPI(
    "https://giv-back.herokuapp.com/api/projects",
    { fields: ["slug"] }
  )

  return {
    paths: projectsRes.data.map((project) => ({
      params: {
        slug: project.attributes.slug,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const projectsRes = await fetchAPI(
    "https://giv-back.herokuapp.com/api/projects",
    {
      filters: {
        slug: params.slug,
      },
      populate: "*",
    }
  )
  const categoriesRes = await fetchAPI(
    "https://giv-back.herokuapp.com/api/categories"
  )

  const projects = await fetchAPI(
    "https://giv-back.herokuapp.com/api/projects",
    {
      populate: "*",
      filters: {
        status: {
          $eq: true,
        },
      },
    }
  )
*/
  return {
    props: {
      /*
      project: projectsRes.data[0],
      categories: categoriesRes,
      projects: projects.data,
      */
    },
    revalidate: 1,
  }
}

export default Project
