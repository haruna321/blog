import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { TPostsData } from "../../types";

const Home = () => {

  const [posts, setPosts] = useState<TPostsData[]>([]);
  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch("https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts");
      const data = await res.json();
      setPosts(data.posts);
    };
    fetcher();
  }, []);

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



