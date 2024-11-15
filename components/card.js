import React from "react"
import Link from "next/link"
import NextImage from "./image"
import ReactMarkdown from "react-markdown"

const Card = ({ article }) => {
  return (
    <Link href={`/article/${article.attributes.slug}`}>
      <a className="uk-link-reset">
        <div className="uk-card uk-card-muted">
          <div className="uk-card-media-top">
            <NextImage
              imageurl={article.attributes.imageurl}
              width={200}
              height={150}
            />
          </div>
          <div className="uk-card-body uk-text-left">
            <p id="category" className="uk-text-uppercase">
              {/* article.attributes.category.name */}
            </p>
            <h3 id="title" className="uk-text-large">
              {article.attributes.title}
            </h3>
              <ReactMarkdown
              source={article.attributes.description}
              escapeHtml={false}
            />  
          </div>
        </div>
      </a>
    </Link>
  )
}

export default Card

//       {/* image={article.attributes.image} */}
