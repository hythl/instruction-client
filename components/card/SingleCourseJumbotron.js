import { Badge, Button } from "antd";
import { currencyFormatter } from "../../utils/helper";
import ReactPlayer from 'react-player';
import {LoadingOutlined, SafetyOutlined, UserAddOutlined} from "@ant-design/icons"

const SingleCourseJumbotron = ({course, showModal, setShowModal, preview, setPreview, handleFreeEnrollment, handlePaidEnrollment, loading, user, enrolled, setEnrolled}) => {
    return(
        <div className="container-fluid">
            <div className="row">
                <div className="jumbotron bg-primary square">
                    <div className="row">
                        <div className="col-md-8">
                            <h1 className="text-light font-weight-bold">{course.name}</h1>
                            <p className="lead">
                                {course.description && course.description.substring(0, 160)}...
                            </p>
                            <Badge count={course.category} style={{backgroundColor:'#03a9f4'}} className="pb-4 mr-2" />
                            <p>created by {course.instructor.name}</p>
                            <p>Last updated {new Date(course.updatedAt).toLocaleDateString()}</p>
                            <h4 className="text-light">{
                                course.paid ? currencyFormatter({
                                    amount: course.price,
                                    currency: 'usd'
                                }) : "Free"
                            }</h4>
                         </div>
                        <div className="col-md-4">
                            {course.lesson[0].video && course.lesson[0].video.Location ? (
                            <div onClick={() => {
                                setPreview(course.lesson[0].video.Location)
                                setShowModal(! showModal)
                            }}>
                                <ReactPlayer className="react-player-div" url={course.lesson[0].video.Location} width="100%" height={"225px"} light={course.image.Location}/>
                            </div> ): (
                                <>
                                    <img src={course.image.Location} alt={course.name} className="img img-fluid" />
                                </>
                            )}

                            {loading ? (
                                <div className="d-flex justify-content-center"> 
                                    <LoadingOutlined className="h1 text-danger" />
                                </div>
                            ) : (<Button className="mb-3 mt-3" type="danger" block shape="round" icon={<SafetyOutlined />} size="large" disabled={loading} onClick={course.paid ? handlePaidEnrollment : handleFreeEnrollment}> {user ? enrolled.status ? "Go to course": "Enroll" : "Login to Enroll"} </Button>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleCourseJumbotron;