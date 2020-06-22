import React from "react"
import { graphql, Link } from "gatsby"
import Pagination from "../components/Pagination"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Posts = props => {
  const {
    data: {
      wpgraphql: { posts },
    },
    pageContext: { pageNumber, hasNextPage },
  } = props

  const currentPage = pageNumber ? `- Page ${pageNumber}` : ``
  return (
    <Layout>
      <SEO title={"Blog Archive"} />
      <h1>Hellbros News {currentPage}</h1>
      <div className="blog-posts">
        {posts.nodes.map(post => (
          <div key={post.id} className="blog-post">
            <h2 key={post.id}>
              <Link to={post.slug}>{post.title}</Link>
            </h2>
            <img
              src={post.featuredImage.mediaItemUrl}
              alt={post.featuredImage.altText}
            />
          </div>
        ))}
      </div>
      <Pagination pageNumber={pageNumber} hasNextPage={hasNextPage} />
    </Layout>
  )
}

export default Posts

export const pageQuery = graphql`
  query GET_POSTS($ids: [ID]) {
    wpgraphql {
      posts(where: { in: $ids }) {
        nodes {
          title
          id
          slug
          featuredImage {
            link
            id
            altText
            mediaItemUrl
          }
        }
      }
    }
  }
`
