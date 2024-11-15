import React from "react"
import Link from "next/link"

const Nav = ({ categories, projects }) => {
  return (
    <div>
      <div className="navbar-container" data-uk-navbar>
        {/*
        <div className="uk-navbar-left">
          <ul className="uk-navbar-nav">
            <li>
              <Link href="/">
                <a>Giving Heart</a>
              </Link>
            </li>
          </ul>
        </div>*/}

        <ul className="navbar-nav">
          {" "}
          {/*
            {categories.map((category) => {
              return (
                <li key={category.id}>
                  <Link href={`/category/${category.attributes.slug}`}>
                    <a className="uk-link-reset">{category.attributes.name}</a>
                  </Link>
                </li>
              )
            })}*/}
          <li key="home">
            <Link href={`/`}>
              <a className="uk-link-reset">Home</a>
            </Link>
          </li>
          <li key="about">
            <Link href={`/about`}>
              <a className="uk-link-reset">About</a>
            </Link>
          </li>
          
          <li key="news">
            <Link href={`/news`}>
              <a className="uk-link-reset">News</a>
            </Link>
          </li>
          <li key="projects">
            <Link href={`/projects`}>
              <a className="uk-link-reset">Projects</a>
            </Link>

            <ul className="navbar-submenu">
              {projects.map((project, i) => {
                return (
                  <Link
                    key={project.attributes.slug}
                    href={`/project/${project.attributes.slug}`}
                  >
                    <a key={project.attributes.slug}>
                      <li>{project.attributes.title}</li>
                    </a>
                  </Link>
                )
              })}
            </ul>
          </li>

           <li key="get-involved">
            <Link href={`/get-involved`}>
              <a className="uk-link-reset">Get Involved</a>
            </Link>
          </li>
            <li key="contacts">
            <Link href={`/contacts`}>
              <a className="uk-link-reset">Contacts</a>
            </Link>
          </li>

          
        </ul>
      </div>
    </div>
  )
}

export default Nav
