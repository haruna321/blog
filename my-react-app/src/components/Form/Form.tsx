import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./Form.module.css";

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  // 各項目のエラーメッセージ
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [commentErrorMessage, setCommentErrorMessage] = useState("");

  // 送信処理
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // エラーメッセージの初期化
    setNameErrorMessage("");
    setEmailErrorMessage("");
    setCommentErrorMessage("");


    // エラーのチェック
    const emptyName = name === "";
    const excessiveNameLength = name.length > 30;
    const emptyEmail = email === "";
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const emptyComment = comment === "";
    const insufficientCommnetLength = comment.length > 500;

    const enableSubmit =
    !excessiveNameLength &&
    !emptyName &&
    !emptyEmail &&
    validEmail &&
    !emptyComment &&
    !insufficientCommnetLength;

    if (emptyName) {
      setNameErrorMessage("名前を入力してください");
    } else if (excessiveNameLength) {
      setNameErrorMessage("名前は30文字以内で入力してください");
    }
    if (emptyEmail) {
      setEmailErrorMessage("メールアドレスを入力してください");
    } else if (!validEmail){
      setEmailErrorMessage("正しいメールアドレス形式で入力してください");
    }
    if (emptyComment) {
      setCommentErrorMessage("本文を入力してください");
    } else if (insufficientCommnetLength) {
      setCommentErrorMessage("本文は500文字以内で入力してください");
    }

    if (!enableSubmit) return;

    setIsSending(true);
    try {
      const res = await fetch("https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message: comment }),
      });
      if (!res.ok) throw new Error("送信失敗");

      alert("送信しました！");
      handleClear();
    } catch {
      alert("送信に失敗しました");
    } finally {
      setIsSending(false);
    }
  };

  // クリア
  const handleClear = () => {
    setName("");
    setEmail("");
    setComment("");
    setNameErrorMessage("");
    setEmailErrorMessage("");
    setCommentErrorMessage("");
  };

  // onChange
  const handleChangeName = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setName(e.target.value);
  };
  const handleChangeEmail = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setEmail(e.target.value);
  };
  const handleChangeComment = (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment(e.target.value);
  };

  return (
    <div className={styles.body}>
      <h1 className={styles.title}>問い合わせフォーム</h1>
      <form onSubmit={handleSubmit}>
        <dl>
          <dt><span>必須</span><label htmlFor="name">お名前</label></dt>
          <dd><input id="name" name="name" type="text" onChange={handleChangeName} value={name} disabled={isSending} />
          {nameErrorMessage && (
            <p className={styles.errorMessage}>
              {nameErrorMessage}
            </p>
          )}
          </dd>
        </dl>
        <dl>
          <dt><span>必須</span><label htmlFor="email">メールアドレス</label></dt>
          <dd><input id="email" name="email" type="email" onChange={handleChangeEmail} value={email} disabled={isSending} />
          {emailErrorMessage && (
            <p className={styles.errorMessage}>
              {emailErrorMessage}
            </p>
          )}
          </dd>
        </dl>
        <dl>
          <dt><span>必須</span><label htmlFor="message">本文</label></dt>
          <dd><textarea id="message" name="message" onChange={handleChangeComment} value={comment} disabled={isSending} />
          {commentErrorMessage && (
            <p className={styles.errorMessage}>
              {commentErrorMessage}
            </p>
          )}
          </dd>
        </dl>
        <div className={styles.buttonWrapper}>
          <button type="submit" disabled={isSending}>送信</button>
          <button type="button" onClick={handleClear}>クリア</button>
        </div>
      </form>
    </div>
  )
}

export default Form;