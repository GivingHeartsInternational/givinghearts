import Nav from "./nav"
import Footer from "./footer"
import Header from "./header"

const Layout = ({ children, categories, projects, seo }) => {
  return (
    <>
      {" "}
      {/* <Header categories={categories} projects={projects} /> */} {children}{" "}
      {/*<Footer />*/}{" "}
    </>
  )
}

export default Layout
