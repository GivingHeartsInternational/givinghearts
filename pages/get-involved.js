import React from "react"
import Articles from "../components/articles"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { fetchAPI } from "../lib/api"
import ReactMarkdown from "react-markdown"

import Contact from "../components/contact"
import Donation from "../components/donation"
import Home from '../components/home';

import GoogleMapReact from "google-map-react"

const GetInvolved = ({
    articles,
    categories,
    homepage,
    projects,
    involved,
}) => {
    console.log(involved.data.attributes.involved)
    return (
        <Layout categories={categories} projects={projects}>
      <Seo seo={homepage.attributes.seo} /> {/* !!!! */}
      <div className="uk-section">
        <div className="uk-container uk-container-medium">
          {/* <h1>{homepage.attributes.hero.title}</h1> */}
          <h2>Get Involved</h2>
          <Home />

          {/*
          <a href="https://buy.stripe.com/4gw7ueazl2ePfny4gg">
            <button
              style={{
                backgroundColor: "#6772E5",
                color: "#FFF",
                padding: "8px 12px",
                border: 0,
                borderRadius: "4px",
                cursor: "pointer",
              }}
              id="checkout-button-price_1Km1BlDH61zU2IPXN7sZe25V"
              role="link"
              type="button"
            >
              Donate 100
            </button>
          </a>
*/}
          <div className="uk-container-small uk-align-center uk-flex uk-flex-around ">
            {/* <button className="uk-button button-yellow uk-button-large uk-button-bold">
              Donate Via Credit Or Debit Card
            </button>
            <span> </span>*/}

            <a href="https://www.facebook.com/GivingHeartsIntl/fundraisers">
              <button className="uk-button button-yellow uk-button-large uk-button-bold  ">
                Facebook Fundraiser
              </button>
            </a>
          </div>

          <ReactMarkdown
            source={involved.data.attributes.involved}
            escapeHtml={false}
          />
        </div>

        <div
          className="uk-section dark-section uk-flex-center"
          style={{ marginBottom: "50px" }}
        >
          <div className="poster uk-margin-auto uk-align-center uk-text-center">
            <p> Live near one of our projects or want to donate? </p>
            <h2>Get involved today!</h2>
            <p> We are always looking for volunteers and partners to join!</p>
          </div>{" "}
        </div>
        <Contact />
      </div>
    </Layout>
    )
}

/// ????
export async function getStaticProps() {
  /*
    // Run API calls in parallel
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
*/
    return {
        props: {
          /*
            articles: articlesRes.data,
            categories: categoriesRes.data,
            homepage: homepageRes.data,
            projects: projects.data,
            involved: involved,
            */
        },
        revalidate: 1,
    }
}

export default GetInvolved

{
    /*

                          <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d412184.0395736126!2d-87.06543234691927!3d36.18631404039682!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8864ec3213eb903d%3A0x7d3fb9d0a1e9daa0!2sNashville%2C%20TN%2C%20USA!5e0!3m2!1sen!2sua!4v1647370010960!5m2!1sen!2sua"
                            width="600"
                            height="450"
                            style={{ border: 0 }}
                            allowfullscreen={false}
                            loading="lazy"
                          ></iframe>

                          <iframe
                            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBlxc4gMWNiQpxY4SfKkl0yOphiV_rRaw4&q=Nashville,+TN,+USA&center=36.186641,-86.785245&zoom=9&language=en&"
                            width="600"
                            height="450"
                            style={{ border: 0 }}
                            allowfullscreen={false}
                            loading="lazy"
                          ></iframe>
                */
}

{
    /*

                          <div style={{ width: "600px", height: "800px" }}>
                            <GoogleMapReact
                              bootstrapURLKeys={{
                                key: "AIzaSyBlxc4gMWNiQpxY4SfKkl0yOphiV_rRaw4",
                              }}
                              defaultCenter={{
                                lat: 36.186641,
                                lng: -86.785245,
                              }}
                              defaultZoom={9}
                            >
                              <div lat={36.186641} lng={-86.785245}>
                                Hello
                              </div>
                            </GoogleMapReact>
                          </div>

                        */
}