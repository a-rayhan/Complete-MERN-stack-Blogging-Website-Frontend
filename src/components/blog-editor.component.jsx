import { Link, useNavigate } from 'react-router-dom';
import logo from '../imgs/logo.png';
import defaultBanner from '../imgs/blog banner.png';
import AnimationWrapper from '../common/page-animation';
import { useContext, useEffect } from 'react';
import { EditorContext } from '../pages/editor.pages';
import EditorJS from '@editorjs/editorjs';
import { tools } from './tools.component';
import { Toaster, toast } from "react-hot-toast";
import { UserContext } from '../App';
import axios from 'axios';

const BlogEditor = () => {

    let { userAuth: { access_token } } = useContext(UserContext);

    let navigate = useNavigate();

    let { blog, blog: { title, banner, content, tags, des }, setBlog, textEditor, setTextEditor, editorState, setEditorState } = useContext(EditorContext);

    const handleBannerUpload = (e) => {

        let img = e.target.files[0];
        console.log(img);
    }

    const handleTitleKeyDown = (e) => {
        if (e.keyCode == 13) {
            e.preventDefault();
        }
    }

    const handleTitleChange = (e) => {
        let input = e.target;

        input.style.height = 'auto';
        input.style.height = input.scrollHeight + "px";

        setBlog({ ...blog, title: input.value })
    }

    useEffect(() => {
        if (!textEditor.isReady) {
            setTextEditor(new EditorJS({
                holderId: "textEditor",
                data: content,
                tools: tools,
                placeholder: "Let's write an awesome story!"
            }))
        }
    }, [])


    const handlePublishEvent = () => {
        if (!title.length) {
            return toast.error("Write blog title to publish it")
        }

        if (textEditor.isReady) {
            textEditor.save().then(data => {

                if (data.blocks.length) {
                    setBlog({ ...blog, content: data });
                    setEditorState("publish")
                } else {
                    return toast.error("Write something in your blog to publish it")
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    const handleSaveDraft = (e) => {
        if (e.target.className.includes("disable")) {
            return;
        }

        if (!title.length) {
            toast.error("Write blog title before saving it as a draft")
        }

        let loadingToast = toast.loading("Saving Draft...")

        e.target.classList.add("disable");

        if (textEditor.isReady) {
            textEditor.save().then(content => {
                let blogObj = {
                    title, banner, des, content, tags, draft: true
                }

                axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/create-blog", blogObj, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
                })
                    .then(() => {
                        e.target.classList.remove("disable");

                        toast.dismiss(loadingToast);
                        toast.success("Saved")

                        setTimeout(() => {
                            navigate("/")
                        }, 500)
                    })
                    .catch(({ response }) => {
                        e.target.classList.remove("disable");

                        toast.dismiss(loadingToast);

                        return toast.error(response.data.error);
                    })
            })
        }
    }

    return (
        <>

            <Toaster />

            <nav className='navbar'>
                <Link to='/' className="w-10 flex-none">
                    <img src={logo} alt="" className='w-full' />
                </Link>

                <p className='max-md:hidden text-black line-clamp-1 w-full'>
                    {title.length ? title : "New Blog"}
                </p>

                <div className='flex gap-4 ml-auto'>
                    <button
                        onClick={handlePublishEvent}
                        className='btn-dark py-2'>
                        Publish
                    </button>

                    <button
                        onClick={handleSaveDraft}
                        className='btn-light py-2'
                    >
                        Save Draft
                    </button>
                </div>
            </nav>

            <AnimationWrapper>
                <section>
                    <div className='mx-auto max-w-[900px] w-full'>

                        <div className='relative aspect-video hover:opacity-80 bg-white border-4 border-grey'>
                            <label htmlFor='uploadBanner'>

                                <img src={defaultBanner} className='z-20' alt="" />

                                <input
                                    id='uploadBanner'
                                    type="file"
                                    accept='.png, .jpg, .jpeg'
                                    hidden
                                    onChange={handleBannerUpload}
                                />
                            </label>
                        </div>

                        <textarea
                            defaultValue={title}
                            placeholder='Blog Title'
                            className='text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40'
                            onKeyDown={handleTitleKeyDown}
                            onChange={handleTitleChange}
                        ></textarea>

                        <hr className='w-full opacity-10 my-5' />

                        <div id='textEditor' className='font-gelasio'></div>

                    </div>
                </section>
            </AnimationWrapper>
        </>
    );
};

export default BlogEditor;