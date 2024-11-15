import App from "next/app"
import Head from "next/head"
import "../assets/css/style.css"
import { createContext } from "react"
import { fetchAPI, fetchAPI2 } from "../lib/api"
import { getStrapiMedia } from "../lib/media"

import Header from "../components/header.js"
import Footer from "../components/footer.js"

// Store Strapi Global object in context
export const GlobalContext = createContext({})

const MyApp = ({ Component, pageProps }) => {
  const { global } = pageProps
  /*
  console.log("danik")
  const res2 = fetch(`http://localhost:1337`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }) 

*/
  //.then(response => response.json()).then((messages) => {console.log(messages);});

  //const res3 = (await res.json()),then(result => console.log('danik'))

  //.then(result => {
  //setForecast(result);

  console.log(pageProps) ///!!!!!!!!!!!

  return (
    <>
      <Head>

    {/*
        <link
          rel="shortcut icon"
          href={getStrapiMedia(global.attributes.favicon)}
        />
*/}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Jockey+One&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
      </Head>{" "}
     {/* <GlobalContext.Provider value={global.attributes}>*/}
        {/* <Header projects={pageProps.projects} /> */}
       {/* <Component {...pageProps} />{" "} *}
        {/*<Footer phone={pageProps.mainData.attributes.Contacts.phone} />*/}
    {/* </GlobalContext.Provider>{" "}*/} 
    </>
  )
}

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So article, category and home pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
MyApp.getInitialProps = async (ctx) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx)
  // Fetch global site settings from Strapi


  /*
  const globalRes = await fetchAPI(
    "https://giv-back.herokuapp.com/api/global",
    {
      populate: {
        favicon: "*",
        defaultSeo: {
          populate: "*",
        },
      },
    }
  )

  const mainData = await fetchAPI(
    "https://giv-back.herokuapp.com/api/main-data",
    {
      populate: "*",
    }
  )

  const activeProjects = fetchAPI(
    "https://giv-back.herokuapp.com/api/projects",
    {
      populate: "*",
      filters: {
        status: {
          $eq: true,
        },
      },
      sort: "createdAt:desc",
    }
  )
*/
  //const res4 = await fetchAPI2(`https://giv-back.herokuapp.com/api/articles`)

  /////ПРОБЛЕМА В ТОМУЩ О Є ПАРАМЕТРИ ????? ?? ?

  /*
  const res4 = await fetch(`https://jsonplaceholder.typicode.com/todos/2`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("====")
      console.log(result)
    })

 
  const res1 = fetch(`http://localhost:1337`, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    console.log("fsfsdf")
    console.log(response)
  })
*/
  // Handle response

  // Pass the data to our page via props
  return {
    ...appProps,
    pageProps: {
      /*
      global: globalRes.data,
      mainData: mainData.data,
      activeProjects: activeProjects.data,
      */
    },
    // res4: res4,
  }
}

export default MyApp
