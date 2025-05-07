import styles from "./Home.module.css";
import { posts } from '../../data/posts'
import { Link } from "react-router-dom";

const Home = () => {

  return (
    <ul className={styles.postsList}>
      {posts.map((item) => {
        return (
          <li key={item.id} className={styles.post}>
            <Link to={`/posts/${item.id}`}>
            <div className={styles.head}>
              <p className={styles.date}>{new Date(item.createdAt).toLocaleDateString()}</p>
              <ul className={styles.category}>
                {item.categories.map((category, i) => {
                  return (
                    <li key={i}>{category}</li>
                  )
                })}
              </ul>
            </div>
            <p className={styles.title}>{item.title}</p>
            <p dangerouslySetInnerHTML={{ __html: item.content.slice(0,60) + `...` }} className={styles.text} />
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default Home;



