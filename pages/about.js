import React from "react"
import Articles from "../components/articles"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { fetchAPI } from "../lib/api"
import ReactMarkdown from "react-markdown"

const About = ({ articles, categories, homepage, projects, about }) => {
    console.log(about.data.attributes.About)
    return (
        <Layout categories={categories} projects={projects}>
      <Seo seo={homepage.attributes.seo} /> {/* !!!! ABOUT SEO */}
      <div className="uk-section">
        <div className="uk-container uk-container-small">
          {/* <h1>{homepage.attributes.hero.title}</h1> */}
            {/*<h2>About</h2>*/}
                      <ReactMarkdown
              source={about.data.attributes.About}
              escapeHtml={false}
            /> 
        </div>
      </div>
    </Layout>
    )
}

/// ????
export async function getStaticProps() {
    // Run API calls in parallel
    /*
    const [articlesRes, categoriesRes, homepageRes, about, projects] =
    await Promise.all([
        fetchAPI("https://giv-back.herokuapp.com/api/articles", {
            populate: "*",
        }),
        fetchAPI("https://giv-back.herokuapp.com/api/categories", {
            populate: "*",
        }),
        fetchAPI("https://giv-back.herokuapp.com/api/homepage", {
            populate: {
                hero: "*",
                seo: { populate: "*" },
            },
        }),

        fetchAPI("https://giv-back.herokuapp.com/api/about", {
            populate: "*",
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
    */

    return {
        props: {
            /*
            articles: articlesRes.data,
            categories: categoriesRes.data,
            homepage: homepageRes.data,
            projects: projects.data,
            about: about,
            */
        },
        revalidate: 1,
    }
}

export default About