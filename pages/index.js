import { useState, useEffect } from "react";
import axios from "axios";
import CourseCard from "../components/card/CourseCard";

const Index = () => {
  

  
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async() => {
      const {data} = await axios.get("/api/courses");
      setCourses(data);
      console.log(data);
    }
    fetchCourses();
  },[])

  
  

  return (
    <>
      <h1 className="jumbotron text-center bg-primary square">
        Online Education Marketplace
      </h1>
      <div className="container-fluid">
        <div className="row">
          {courses.map((course) => <div key={course._id} className="col-md-4">{
          <CourseCard course={course} />}</div> )}
        </div>
      </div>
    </>
  );
}

/*
export async function getServerSideProps() {
  const { data } = await axios.get(`${process.env.API}/courses`);
  // console.log("DATA LENGTH =====> ", data.length);
  return {
    props: {
      courses: data,
    },
  };
}
*/


export default Index;
