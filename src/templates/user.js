import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import ArchivePosts from "../components/ArchivePosts"
import SEO from "../components/seo"

const UserTemplate = props => {
  const {
    data: {
      wpgraphql: { user },
    },
  } = props
  const { name, posts, description } = user
  return (
    <Layout>
      <SEO title={`Author: ${name}`} />
      <h1>Author: {name}</h1>
      <p>{description}</p>
      <ArchivePosts posts={posts} />
    </Layout>
  )
}

export default UserTemplate

export const pageQuery = graphql`
  query GET_USER($id: ID!) {
    wpgraphql {
      user(id: $id) {
        id
        name
        nickname
        description
        avatar {
          url
          size
        }
        posts {
          nodes {
            postId
            title(format: RENDERED)
            slug
          }
        }
      }
    }
  }
`
