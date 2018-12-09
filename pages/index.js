import React, { PureComponent } from 'react'
import BlockContent from '@sanity/block-content-to-react'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../client'
import { Link } from '../../routes'

const builder = imageUrlBuilder(client)
function urlFor(source) {
  return builder.image(source)
}


export default class Index extends PureComponent {
    static async getInitialProps() {
        const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0]{
            title,
            "name": author->name,
            "categories": categories[]->title,
            "authorImage": author->image,
            body
          }`, { slug })
        return post
    }

  render() {
    { title, name, categories, authorImage, body } = this.props.post
    return (
        <div>
            <div>Home page</div>
            <Link route={`/blog/${this.props.post.slug}`}>
                <a>View Index of Blogs - {this.props.post.slug}</a>
            </Link>
        </div>
    )
  }
}

