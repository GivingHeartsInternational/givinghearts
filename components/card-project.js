import React from "react"
import Link from "next/link"
import NextImage from "./image"
import ReactMarkdown from "react-markdown"

const CardProject = ({ project }) => {
  return (
    <Link href={`/project/${project.attributes.slug}`}>
      <a className="uk-link-reset">
        <div className="uk-card uk-card-muted">
          <div className="uk-card-media-top">
            <NextImage
              imageurl={project.attributes.imageurl}
              width={200}
              height={150}
            />
          </div>
          <div className="uk-card-body uk-text-left">
            <p id="category" className="uk-text-uppercase">
              {/* project.attributes.category.name */}
            </p>
            <h3 id="title" className="uk-text-large">
              {project.attributes.title}
            </h3>
                 <ReactMarkdown
              source={project.attributes.description}
              escapeHtml={false}
            /> 
 
          </div>
        </div>
      </a>
    </Link>
  )
}

export default CardProject
//   imageurl={project.attributes.imageurl}
