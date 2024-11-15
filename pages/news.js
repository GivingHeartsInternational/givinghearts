import Articles from "../components/articles"
import { fetchAPI } from "../lib/api"
import Layout from "../components/layout"
import Seo from "../components/seo"

const News = ({ category, categories, articles, projects }) => {
  const seo = {
    metaTitle: category.attributes.name,
    metaDescription: `All ${category.attributes.name} articles`,
  }
  console.log("category. ")
  console.log(category)

  return (
    <Layout categories={categories.data} projects={projects}>
      <Seo seo={seo} />
      <div className="uk-section">
        <div className="uk-container uk-container-medium">
          <h2>{category.attributes.name}</h2>

          {/* <Articles articles={category.attributes.articles.data} /> */}
          <Articles articles={articles} />
        </div>
      </div>
    </Layout>
  )
}

/*
export async function getStaticPaths() {
  const categoriesRes = await fetchAPI("/categories", { fields: ["slug"] })

  return {
    paths: categoriesRes.data.map((category) => ({
      params: {
        slug: category.attributes.slug,
      },
    })),
    fallback: false,
  }
}
*/

/*
export async function getStaticProps({ params }) {
  const matchingCategories = await fetchAPI("/categories", {
    filters: { slug: "news" },
    populate: "*"  
  })
  const allCategories = await fetchAPI("/categories")

  return {
    props: {
      category: matchingCategories.data[0],
      categories: allCategories,
    },
    revalidate: 1,
  }
}

*/

export async function getStaticProps() {
  // Run API calls in parallel

  /*
  const [articlesRes, projectsRes] = await Promise.all([
    fetchAPI("https://giv-back.herokuapp.com/api/articles", {
      populate: "*",
      sort: "createdAt:desc",
    }),
    fetchAPI("https://giv-back.herokuapp.com/api/projects", {
      populate: "*",
      filters: {
        status: {
          $eq: true,
        },
      },
 
    }),
  ])

  ///projects видаити !!!!!!

  const matchingCategories = await fetchAPI(
    "https://giv-back.herokuapp.com/api/categories",
    {
      filters: { slug: "news" },
      populate: "*",
    }
  )
  const allCategories = await fetchAPI(
    "https://giv-back.herokuapp.com/api/categories"
  )
*/
  return {
    props: {
      /*
      articles: articlesRes.data,
      projects: projectsRes.data,
      categories: allCategories,
      category: matchingCategories.data[0],
      */
    },
    revalidate: 1,
  }
}

export default News
