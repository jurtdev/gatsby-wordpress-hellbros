import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import { createLocalLink } from "../utils"

const MAIN_MENU_QUERY = graphql`
  fragment MenuFields on WPGraphql_MenuItem {
    id
    label
    url
  }
  query GET_MENU_ITEMS {
    wpgraphql {
      menuItems(where: { location: MAIN_MENU }) {
        nodes {
          ...MenuFields
          childItems {
            nodes {
              ...MenuFields
            }
          }
        }
      }
    }
  }
`

const renderChildMenu = item => {
  return <ul>{item.childItems.nodes.map(child => renderMenuItem(child))}</ul>
}

const renderMenuItem = item => {
  let hasChild = false
  if (item.childItems && item.childItems.nodes.length) {
    hasChild = true
  }

  return item.label !== "Tour" &&
    item.label !== "EPK" &&
    item.label !== "Shows" &&
    item.label !== "Contact" &&
    item.label !== "Store" &&
    item.label !== "Photos" &&
    item.label !== "NEWS" ? (
    <li key={item.id}>
      <Link to={createLocalLink(item.url)}>{item.label}</Link>
      {hasChild && renderChildMenu(item)}
    </li>
  ) : null
}

const mainMenu = props => {
  return (
    <StaticQuery
      query={MAIN_MENU_QUERY}
      render={({
        wpgraphql: {
          menuItems: { nodes: menu },
        },
      }) => {
        const newMenu = [
          ...menu,
          {
            id: "666",
            label: "Blog",
            url: "/blog",
          },
        ]

        return (
          <nav>
            <ul className="main-menu">
              {newMenu.map(item => renderMenuItem(item))}
            </ul>
          </nav>
        )
      }}
    />
  )
}

export default mainMenu
