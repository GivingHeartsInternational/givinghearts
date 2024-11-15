import React from "react"
import Articles from "../components/articles"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { fetchAPI } from "../lib/api"
import Image from "next/image"
import ReactMarkdown from "react-markdown"
import ProjectList from "../components/projects"
import { motion } from "framer-motion"
import { AnimationOnScroll } from "react-animation-on-scroll"



const Home = ({ articles, projects, categories, homepage }) => {
    return (
        <Layout categories={categories} projects={projects}>
      <Seo seo={homepage.attributes.seo} />
      <div className="homepage">

      {/*
        <div className="uk-section dark-section ">
          <div className="uk-container uk-container-medium">
            <h2>News</h2>
            <Articles articles={articles} />
          </div>
        </div>
      */}

        {/* не delay а склорр */}

        <div className="uk-section yellow-section ">
          <div className="uk-container  uk-text-center uk-container-small">
            <AnimationOnScroll animateIn="animate__fadeInUp" animateOnce={true}>
              {" "}
              <h2>Mission</h2>
            </AnimationOnScroll>
            <AnimationOnScroll animateIn="animate__fadeInUp" animateOnce={true}>
              {" "}
              <ReactMarkdown
                source={homepage.attributes.mission}
                escapeHtml={false}
              />
            </AnimationOnScroll>
          </div>{" "}
        </div>

        <div className="uk-section  ">
          <AnimationOnScroll animateIn="animate__fadeInUp" animateOnce={true}>
            <div className="uk-container uk-container-large">
              <h2>Active Projects</h2>
              <ProjectList projects={projects} />
            </div>{" "}
          </AnimationOnScroll>
        </div>

        <div className="uk-section yellow-section uk-padding-remove ">
          <div className="uk-container uk-container-large">
            <div className="homepage__banner  uk-flex  uk-flex-center  ">
              <Image
                src="/images/plane_img.jpg"
                alt="footer arrow"
                width={560}
                height={480}
              />

              <div className="uk-width-1-2@s  uk-flex uk-flex-middle uk-flex-center uk-flex-column uk-padding-large ">
                <AnimationOnScroll
                  animateIn="animate__fadeInRight"
                  animateOnce={true}
                >
                  <ReactMarkdown
                    source={homepage.attributes.banner}
                    escapeHtml={false}
                  />
                </AnimationOnScroll>
                <AnimationOnScroll
                  animateIn="animate__fadeInUp"
                  animateOnce={true}
                >
                  <button className="uk-button uk-button-secondary uk-button-large uk-button-bold">
                    Donate
                  </button>
                </AnimationOnScroll>
              </div>
            </div>
          </div>{" "}
        </div>

        <div className="uk-section dark-section">
          <div className="uk-container uk-text-center uk-container-small">
            <AnimationOnScroll animateIn="animate__fadeIn" animateOnce={true}>
              <h2>Get Involved</h2>
            </AnimationOnScroll>

            <AnimationOnScroll animateIn="animate__fadeInUp" animateOnce={true}>
              {" "}
              <ReactMarkdown
                source={homepage.attributes.getinvolved}
                escapeHtml={false}
              />
            </AnimationOnScroll>

            <AnimationOnScroll animateIn="animate__fadeInUp" animateOnce={true}>
              {" "}
              <a href="/get-involved">
                <button className="uk-button uk-button-secondary uk-button-large uk-button-bold button-yellow">
                  Learn More
                </button>
              </a>
            </AnimationOnScroll>
          </div>{" "}
        </div>

        {/*
        <div className="uk-container uk-container-large">
          <h1>{homepage.attributes.hero.title}</h1>
 
        </div>*/}
      </div>
    </Layout>
    )
}

export async function getStaticProps() {
    // Run API calls in parallel

    /*
    const [articlesRes, projectsRes, categoriesRes, homepageRes] =
    await Promise.all([
        fetchAPI("https://giv-back.herokuapp.com/api/articles", {
            populate: "*",
            sort: "createdAt:desc",
            pagination: {
                limit: "3",
            },
        }),
        fetchAPI("https://giv-back.herokuapp.com/api/projects", {
            populate: "*",
            filters: {
                status: {
                    $eq: true,
                },
            },
            sort: "createdAt:desc",
            pagination: {
                limit: "3",
            },
 
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
    ])
*/
    return {
        props: {
          /*
            articles: articlesRes.data,
            projects: projectsRes.data,
            categories: categoriesRes.data,
            homepage: homepageRes.data
            */
        },
        revalidate: 1,
    }
}

export default Home