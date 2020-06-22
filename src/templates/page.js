import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Page = props => {
  const {
    data: {
      wpgraphql: { page },
    },
  } = props
  const { title, content } = page
  return (
    <Layout>
      <SEO title={title} />
      <h1>{title}</h1>
      {title !== "Home" ? (
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      ) : (
        <div>
          <h3>
            Welcome to the Hellbros page that has been converted into a static
            Gatsby Site by querying all of its data from Wordpress using
            Graphql.
          </h3>
        </div>
      )}
    </Layout>
  )
}

export default Page

export const pageQuery = graphql`
  query GET_PAGE($id: ID!) {
    wpgraphql {
      page(id: $id) {
        title
        content
        uri
      }
    }
  }
`
