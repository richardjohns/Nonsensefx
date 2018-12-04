import React, { PureComponent } from 'react'

export default class BlogPost extends PureComponent {
  static getInitialProps = async ({ query: { slug } }) => {
    const title = slug
    return { title }
  }

  render() {
    const { title } = this.props

    return (
      <div>
        <h1>{title}</h1>
      </div>
    )
  }
}