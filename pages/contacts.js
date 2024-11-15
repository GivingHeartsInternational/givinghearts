import React from "react"
import Articles from "../components/articles"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { fetchAPI } from "../lib/api"
import ReactMarkdown from "react-markdown"

import Contact from "../components/contact"

import GoogleMapReact from "google-map-react"

const ContactPage = ({
  articles,
  categories,
  homepage,
  projects,
  involved,
  mainData2,
}) => {
  const { address, email, phone } = mainData2.data.attributes.Contacts

  return (
    <Layout categories={categories} projects={projects}>
      <Seo seo={homepage.attributes.seo} /> {/* !!!! */}
      <div className="uk-section">
        <div className="uk-container uk-container-medium">
          {/* <h1>{homepage.attributes.hero.title}</h1> */}
          <h2>Contact Us</h2>

          <div>
            <div className="uk-container-small uk-flex uk-margin-auto uk-margin-medium-top">
              <div className="uk-width-1-2@s uk-text-left">
                <h3>Office</h3>
                <p>{address}</p>

                <h3>Email</h3>
                <p>{email}</p>

                <h3>Phone</h3>
                <p>{phone}</p>
              </div>

              <div className="uk-width-1-2@s " style={{ overflow: "hidden" }}>
                <iframe
                  src="https://www.google.com/maps/d/u/1/embed?mid=11FZUZFaO8BbavPxzb0sZvJD0MJ9_WCoL&ehbc=2E312F&z=11"
                  width="600"
                  height="800"
                  style={{
                    border: "0px",
                    padding: "0",
                    frameborder: "0",
                    marginTop: "-50px",
                  }}
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

/// ????
export async function getStaticProps() {
  // Run API calls in parallel
  /*
  const [articlesRes, categoriesRes, homepageRes, projects, involved] =
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
      fetchAPI("https://giv-back.herokuapp.com/api/projects", {
        populate: "*",
        filters: {
          status: {
            $eq: true,
          },
        },
      }),
      fetchAPI("https://giv-back.herokuapp.com/api/involved", {
        populate: "*",
      }),
    ])

  const mainData2 = await fetchAPI(
    "https://giv-back.herokuapp.com/api/main-data",
    {
      populate: "*",
    }
  )
*/
  return {
    props: {
      /*
      articles: articlesRes.data,
      categories: categoriesRes.data,
      homepage: homepageRes.data,
      projects: projects.data,
      involved: involved,
      mainData2: mainData2,
      */
    },
    revalidate: 1,
  }
}

export default ContactPage
