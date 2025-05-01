import './App.css'
import { posts } from './data/posts'

const PostList = () => {

  return (
    <ul className='postsList'>
      {posts.map((item) => {
        return (
          <li key={item.id} className='post'>
            <div className='head'>
              <p className='date'>{new Date(item.createdAt).toLocaleDateString()}</p>
              <ul className='category'>
                {item.categories.map((category, i) => {
                  return (
                    <li key={i}>{category}</li>
                  )
                })}
              </ul>
            </div>
            <p className='title'>{item.title}</p>
            <p dangerouslySetInnerHTML={{ __html: item.content.slice(0,60) + `...` }} className='text' />
          </li>
        )
      })}
    </ul>
  )
}

export default PostList;



