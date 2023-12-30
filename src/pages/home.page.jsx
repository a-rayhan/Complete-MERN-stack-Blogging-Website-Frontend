import axios from "axios";
import AnimationWrapper from "../common/page-animation";
import InPageNavigation from "../components/inpage-navigation.component";
import { useEffect, useState } from "react";
import Loader from "../components/loader.component";

const HomePage = () => {

    const [blogs, setBlogs] = useState(null);

    const fetchLatestBlogs = () => {
        axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/latest-blogs")
            .then(data => {
                setBlogs(data.data.blogs);
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        fetchLatestBlogs();
    }, [])

    return (
        <AnimationWrapper>
            <section className="h-cover flex justify-center gap-10">

                {/* Home */}
                <div className="w-full">

                    <InPageNavigation routes={["home", "trending blogs"]} defaultHidden={["trending blogs"]}>


                        <>
                            {
                                blogs == null ? <Loader /> :
                                    blogs.map((blog, i) => {
                                        return <h1 key={i}>{blog.title}</h1>
                                    })
                            }
                        </>

                        <h1>
                            Trending blogs here
                        </h1>

                    </InPageNavigation>

                </div>


                {/* Trending blogs */}
                <div></div>

            </section>
        </AnimationWrapper>
    );
};

export default HomePage;