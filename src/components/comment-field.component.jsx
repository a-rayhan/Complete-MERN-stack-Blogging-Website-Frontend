import { useContext, useState } from "react";
import { UserContext } from "../App";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { BlogContext } from "../pages/blog.page";

const CommentField = ({ action }) => {

    let { blog, setBlog, blog: { author: { _id: blog_author }, comments, comments: {results: commentsArr}, activity, activity: { total_comments, total_parent_comments } }, totalParentCommentsLoaded, setTotalParentCommentsLoaded } = useContext(BlogContext);

    let { userAuth: { access_token, username, fullname, profile_img } } = useContext(UserContext);

    const [comment, setComment] = useState("");

    const handleComment = () => {
        if (!access_token) {
            return toast.error("Login forst to leave a comment")
        }

        if (!comment.length) {
            return toast.error("Write something to leave a comment")
        }

        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/add-comment", { _id, blog_author, comment }, {
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        })
            .then(({ data }) => {
                setComment("");

                data.commented_by = { personal_info: { username, fullname, profile_img } }

                let newCommentArr;

                data.childrenLevel = 0;

                newCommentArr = [data, ...commentsArr];

                let parentCommentIncrementVal = 1;

                setBlog({ ...blog, comment: { ...comments, results: newCommentArr }, activity: { ...activity, total_comments: total_comments + 1, total_parent_comments: total_parent_comments + parentCommentIncrementVal } })

                setTotalParentCommentsLoaded(preval => preval + parentCommentIncrementVal);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <>

            <Toaster />

            <textarea
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                placeholder="Leave a comment..."
                className="input-box pl-5 placeholder:text-dark-grey resize-none h-[150px] overflow-auto"></textarea>

            <button
                onClick={handleComment}
                className="btn-dark mt-5 px-10">
                {action}
            </button>
        </>
    );
};

export default CommentField;