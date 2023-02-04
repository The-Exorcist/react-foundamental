import React, { useEffect, useState, useRef } from "react";
import PostService from "../API/PostService";
import PostFilter from "../components/PostFilter"
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import MyButton from "../components/UI/button/MyButton";
import Loader from "../components/UI/Loader/Loader";
import MyModal from "../components/UI/MyModal/MyModal";
import Pagination from "../components/UI/pagination/Pagination";
import MySelect from "../components/UI/select/MySelect";
import { useFetching } from "../hooks/useFetching";
import { useObserver } from "../hooks/useObserver";
import { usePosts } from "../hooks/usePost";
import { getPageCount } from "../utils/pages";


function Posts() {
    const [posts, setPosts] = useState([
        // { id: 1, title: 'Javascript', body: 'JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS. As of 2022, 98% of websites use JavaScript on the client side for webpage behavior, often incorporating third-party libraries' },
        // { id: 2, title: 'Python', body: 'Python is a high-level, general-purpose programming language. Its design philosophy emphasizes code readability with the use of significant indentation. Python is dynamically typed and garbage-collected. It supports multiple programming paradigms, including structured, object-oriented and functional programming.' },
        // { id: 3, title: 'C++', body: 'C++ is a high-level general-purpose programming language created by Danish computer scientist Bjarne Stroustrup as an extension of the C programming language, or "C with Classes".' },
        // { id: 4, title: 'Ruby', body: 'Ruby is an interpreted, high-level, general-purpose programming language which supports multiple programming paradigms. It was designed with an emphasis on programming productivity and simplicity. In Ruby, everything is an object, including primitive data types. It was developed in the mid-1990s by Yukihiro "Matz" Matsumoto in Japan.' },
        // { id: 5, title: 'Java', body: 'Java is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible.' },
        // { id: 6, title: 'aa', body: 'dd' },
    ]);

    const [filter, setFilter] = useState({ sort: '', query: '' });
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query);
    const lastElement = useRef();

    const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page);
        setPosts([...posts, ...response.data]);
        const totalCount = response.headers['x-total-count'];
        setTotalPages(getPageCount(totalCount, limit));
    })

    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        setPage(page + 1);
    })

    useEffect(() => {
        fetchPosts(limit, page);
    }, [limit, page]);

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false)
    }

    // Получаем пост из дочернего компонента
    const removePost = (post) => {
        setPosts(posts.filter((p) => {
            return p.id !== post.id;
        }));
    }

    const changePage = (page) => {
        setPage(page);
    }

    return (
        <div className="App">
            <MyButton onClick={() => { setModal(true) }}>Create</MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost} />
            </MyModal>
            <hr style={{ margin: '15px 0' }} />
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />

            <MySelect
                options={[
                    { value: 5, name: '5' },
                    { value: 10, name: '10' },
                    { value: 25, name: '25' },
                    { value: -1, name: 'Show all' },
                ]}
                value={limit}
                onChange={(value) => {
                    return setLimit(value)
                }}
                defaultValue="Amount elements on page"
            />


            {postError &&
                <h2>Error: {postError}</h2>
            }
            <PostList remove={removePost} posts={sortedAndSearchPosts} title={"List items"} />
            <div ref={lastElement} style={{ height: '20px', backgroundColor: 'red' }} />
            {isPostsLoading &&
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px' }}><Loader /></div>
            }

            <Pagination
                totalPages={totalPages}
                page={page}
                changePage={changePage}
            />
        </div >
    );
}

export default Posts;
