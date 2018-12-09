import React, { PureComponent } from 'react'
import BlockContent from '@sanity/block-content-to-react'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../client'
const builder = imageUrlBuilder(client)
function urlFor(source) {
  return builder.image(source)
}
const BlogPost = ({ title = 'No title', name = 'No name', categories = [], authorImage = {}, body = [] }) => (
  <div>
    <h1>{title}</h1>
    <span>By {name}.</span>
    {categories && (
      <ul>Posted in
        { categories.map(category => (
          <li key={category}>{category}</li>
        ))}
      </ul>
      )
    }
    <div>
      <img src={urlFor(authorImage).width(50).url()} />
    </div>
    <BlockContent
      blocks={body}
      imageOptions={{w: 320, h: 240, fit: 'max'}}
      projectId={client.clientConfig.projectId}
      dataset={client.clientConfig.dataset}
    />
  </div>
)

BlogPost.getInitialProps = async ({ query: { slug } }) => {
  const document = await client.fetch(`*[_type == "post" && slug.current == $slug][0]{
      title,
      "name": author->name,
      "categories": categories[]->title,
      "authorImage": author->image,
      body
    }`, { slug })
  return document
}

export default BlogPost