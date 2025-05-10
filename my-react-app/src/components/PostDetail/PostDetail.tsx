import styles from "./PostDetail.module.css";
import { useParams } from "react-router-dom";
import { TPostParams, TPostsData } from "../../types";
import { useEffect, useState } from "react";

const PostDetail = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState<TPostsData | null>(null);
  const { id } = useParams<TPostParams>();

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(`https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`);
      const data = await res.json();
      setPost(data.post);
      setIsLoading(false);
    };
    fetcher();
  }, [id]);

  if (isLoading) return <p>読み込み中...</p>
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



