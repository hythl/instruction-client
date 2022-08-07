import {useState, useEffect, useContext} from "react";
import axios from 'axios'
import {useRouter} from 'next/router';
import { Badge } from "antd";
import { currencyFormatter } from "../../utils/helper";
import ReactPlayer from 'react-player';
import SingleCourseJumbotron from "../../components/card/SingleCourseJumbotron";
import PreviewModal from "../../components/modal/PreviewModal";
import SingleCourseLessons from "../../components/card/SingleCourseLessons";
import {Context} from "../../context"
import {toast} from "react-toastify"

const SingleCourse = () => {
  const router = useRouter();
  const {slug} = router.query;
  const [course, setCourse] = useState({
    category: "",
    createdAt: "",
    description: "",
    image: {},
    instructor: {},
    lesson: [{video:{}}],
    name:"",
    paid:false,
    price:0,
    published: false,
    slug:"",
    updatedAt:""
  })

  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const {state: {user}} = useContext(Context);
  const [enrolled, setEnrolled] = useState({})

  const handlePaidEnrollment = () => {

  }

  const handleFreeEnrollment = async (e) => {
    e.preventDefault();
    try {
      if(! user) router.push('/login');
      if(enrolled.status) return router.push(`/user/course/${enrolled.course.slug}`);
      setLoading(true);
      const {data} = await axios.post(`/api/free-enrollment/${course._id}`);
      toast(data.message);
      setLoading(false);
      router.push(`/user/course/${data.course.slug}`)
    }catch(err) {
      toast("Enrollment failed. Try again");
      setLoading(false);
    }
  }

  useEffect(() =>{
    getSingleCourse();
  },[user])

  const checkEnrollment = async (id) => {
    const {data} = await axios.get(`/api/check-enrollment/${id}`);
    setEnrolled(data);
  }

  const getSingleCourse =  async () => {
    const {data} = await axios.get(`/api/course/${slug}`);
    setCourse(data);
    if(user && data._id) checkEnrollment(data._id);
}
   
  return (
      <>
        <SingleCourseJumbotron course={course} showModal={showModal} setShowModal={setShowModal} preview={preview} setPreview={setPreview} loading={loading} handlePaidEnrollment={handlePaidEnrollment} handleFreeEnrollment={handleFreeEnrollment} user={user} enrolled={enrolled} setEnrolled={setEnrolled}/>
        <PreviewModal showModal={showModal} setShowModal={setShowModal} preview={preview}/>
        {course.lesson && (
            <SingleCourseLessons lessons={course.lesson} setPreview={setPreview} showModal={showModal} setShowModal={setShowModal}/>
        )}
      </>
  )
};

/*
export async function getServerSideProps({query}) {
    const {data} = await axios.get(`${process.env.API}/course/${query.slug}`);
    return {
        props: {
            course: data
        }
    }
}
*/

export default SingleCourse;