import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Comments from "../components/Comments"
import CommentForm from "../components/CommentForm"

const Post = props => {
  const {
    data: {
      wpgraphql: { post },
    },
  } = props
  const { title, content, author, categories, tags } = post
  return (
    <Layout>
      <SEO title={title} />
      <h1>{title}</h1>
      <ul className="post meta">
        <li>
          Author: <Link to={`/user/${author.slug}`}>{author.name}</Link>
        </li>
        <li>
          Categories:
          <ul>
            {categories.nodes.map(category => (
              <li>
                <Link to={`/blog/category/${category.slug}`}>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </li>
        <li>
          Tags:{" "}
          {tags.nodes.length > 0 ? (
            <ul>
              {tags.nodes.map(tag => (
                <li>
                  <Link to={`/blog/tag/${tag.slug}`}>{tag.name}</Link>
                </li>
              ))}
            </ul>
          ) : (
            "none"
          )}
        </li>
      </ul>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
      <Comments post={post} />
      <CommentForm />
    </Layout>
  )
}

export default Post

export const pageQuery = graphql`
  fragment CommentFields on WPGraphql_Comment {
    date
    id
    author {
      ... on WPGraphql_CommentAuthor {
        id
        email
        name
        url
      }
    }
    commentId
    content(format: RENDERED)
  }

  query GET_POST($id: ID!) {
    wpgraphql {
      post(id: $id) {
        title
        content
        uri
        author {
          name
          nickname
          slug
        }
        categories {
          nodes {
            slug
            name
          }
        }
        tags {
          nodes {
            slug
            name
          }
        }
        comments {
          nodes {
            ...CommentFields
            children {
              nodes {
                ...CommentFields
              }
            }
          }
        }
      }
    }
  }
`
