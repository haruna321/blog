import styles from "./PostDetail.module.css";
import { posts } from '../../data/posts'
import { useParams } from "react-router-dom";
import { TPostParams } from "../../types";

const PostDetail = () => {

  const { id } = useParams<TPostParams>();
  const post = posts.find((item) => item.id === Number(id));
  if (!post) return <p className="">記事が見つかりません</p>;

  return (
    <section className={styles.wrapper}>
      <img className={styles.image} src={post.thumbnailUrl} alt={post.title} width={800} height={400} />
      <div className={styles.body}>
        <div className={styles.head}>
          <p className={styles.date}>{new Date(post.createdAt).toLocaleDateString()}</p>
          <ul className={styles.category}>
            {post.categories.map((category, i) => {
              return (
                <li key={i}>{category}</li>
              )
            })}
          </ul>
        </div>
        <p className={styles.title}>{post.title}</p>
        <p dangerouslySetInnerHTML={{ __html: post.content}} className={styles.text} />
      </div>
    </section>
  )
}

export default PostDetail;



