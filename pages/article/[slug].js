import ReactMarkdown from "react-markdown"
import Moment from "react-moment"
import { fetchAPI } from "../../lib/api"
import Layout from "../../components/layout"
import NextImage from "../../components/image"
import Seo from "../../components/seo"
import { getStrapiMedia } from "../../lib/media"

const Article = ({ article, categories, projects }) => {
  const imageUrl = getStrapiMedia(article.attributes.image)

  const seo = {
    metaTitle: article.attributes.title,
    metaDescription: article.attributes.description,
    shareImage: article.attributes.image,
    article: true,
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
      >
     
      </div>
*/}

      <div className="uk-section">
        <div className="uk-container uk-container-small">
          <NextImage
            imageurl={article.attributes.imageurl}
            width={300}
            height={200}
          />
          <h2>{article.attributes.title}</h2>
          <ReactMarkdown
            source={article.attributes.content}
            escapeHtml={false}
          />
          <hr className="uk-divider-small" />
          <div className="uk-grid-small uk-flex-left" data-uk-grid="true">
            <div>
              {article.attributes.author.picture && (
                <NextImage image={article.attributes.author.picture} />
              )}
            </div>
            <div className="uk-width-expand">
              {/*
              <p className="uk-margin-remove-bottom">
                By {article.attributes.author.name}
              </p>*/}
              <p className="uk-text-meta uk-margin-remove-top">
                <Moment format="MMM Do YYYY">
                  {article.attributes.published_at}
                </Moment>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {

 /*
  const articlesRes = await fetchAPI(
    "https://giv-back.herokuapp.com/api/articles",
    { fields: ["slug"] }
  )

  return {
    paths: articlesRes.data.map((article) => ({
      params: {
        slug: article.attributes.slug,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const articlesRes = await fetchAPI(
    "https://giv-back.herokuapp.com/api/articles",
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
      article: articlesRes.data[0],
      categories: categoriesRes,
      projects: projects.data,
      */
    },
    revalidate: 1,
  }
}

export default Article
