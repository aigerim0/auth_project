import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../components/Loading'
import { getNews, newsLoading } from '../../redux/action/blogActions'

const Blog = () => {
  const dispatch = useDispatch()
  const { news, isLoading } = useSelector((s) => s.blog)
  const auth = useSelector((s) => s.user.auth)
  useEffect(() => {
    dispatch(getNews())
    return () => {
      dispatch(newsLoading())
    }
  }, [])

  if (isLoading) {
    return <Loading />
  }
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2>News</h2>
        {auth && (
          <Link
            to="/create-post"
            className="bg-indigo-700 hover:bg-indigo-500 text-white ml-4 py-2 px-3 rounded-lg"
          >
            Create post
          </Link>
        )}
      </div>

      {news.map((item) => (
        <div
          className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20"
          key={item._id}
        >
          <div>
            <Link to={`/news/${item._id}`}>
              <h2 className="text-gray-800 text-3xl font-semibold">
                {' '}
                {item.title}
              </h2>
            </Link>
            <p className="mt-2 text-gray-600">
              {item.description.length > 49
                ? `${item.description.split(' ').slice(0, 50).join(' ')}...`
                : item.description}
            </p>
          </div>
          <div className="flex justify-end mt-4 ">
            <Link
              to={`/user/${item?.user?._id}`}
              class="text-xl font-medium text-indigo-500"
            >
              {item?.user?.name}
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Blog
