import React from "react"
import Card from "./card-project"

const ProjectList = ({ projects, type }) => {
  // const leftArticlesCount = Math.ceil(articles.length / 5)
  // const leftArticles = articles.slice(0, leftArticlesCount)
  //const rightArticles = articles.slice(leftArticlesCount, articles.length)

  return (
    <div className={`projects ${type}`}>
      <div className="uk-child-width-1-1@s" data-uk-grid="true">
        {/*
        <div>
          {leftArticles.map((article, i) => {
            return (
              <Card
                article={article}
                key={`article__left__${article.attributes.slug}`}
              />
            )
          })}
        </div>*/}
        <div>
          <div className="uk-child-width-1-3@m uk-grid-match" data-uk-grid>
            {projects.map((project, i) => {
              return (
                <Card
                  project={project}
                  key={`article__left__${project.attributes.slug}`}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectList
