import { useRouter } from "next/router";
import { useState, useEffect, createElement } from "react";
import axios from "axios";
import StudentRoute from "../../../components/routes/StudentRoute";
import {Button, Menu, Avatar} from 'antd'
import ReactPlayer from 'react-player';
import ReactMarkdown from "react-markdown";
import { PlayCircleOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const SingleCourse = () => {
    const [loading, setLoading] = useState(false);
    const [course, setCourse] = useState({lesson:[]})
    const [clicked, setClicked] = useState(-1);
    const [collapsed, setCollapsed] = useState(false);

    const router = useRouter();
    const {slug} = router.query;
    const {Item} = Menu;

    useEffect(() => {
        if(slug) loadCourse();
    },[slug])

    const loadCourse = async() => {
        const {data} = await axios.get(`/api/user/course/${slug}`);
        setCourse(data)
    }

    return (
        <StudentRoute>
            <div className="row">
                <div style={{maWidth:320}}>
                    <Button onClick={() => setCollapsed(! collapsed)} className="text-primary mt-1 btn-block mb-2">
                        {createElement(collapsed ? MenuUnfoldOutlined: MenuFoldOutlined) }
                        {!collapsed && "Lessons"}
                    </Button>
                    <Menu
                    defaultSelectedKeys={[clicked]}
                    inlineCollapsed={collapsed}
                    style={{ height: "80vh", overflow: "scroll" }}
                >
                    {course.lesson.map((lesson, index) => (
                    <Item
                        onClick={() => setClicked(index)}
                        key={index}
                        icon={<Avatar>{index + 1}</Avatar>}
                    >
                        {lesson.title.substring(0, 30)}
                    </Item>
                    ))}
                </Menu>
                </div>

                <div className="col">
                    {clicked !== -1 ? (
                        <>
                        {course.lesson[clicked].video &&
                            course.lesson[clicked].video.Location && (
                            <>
                                <div className="wrapper">
                                <ReactPlayer
                                    className="player"
                                    url={course.lesson[clicked].video.Location}
                                    width="100%"
                                    height="100%"
                                    controls
                                />
                                </div>
                            </>
                            )}
                            <ReactMarkdown
                                children={course.lesson[clicked].content}
                                className="single-post"
                            />
                        </>
                    ) : (
                        <div className="d-flex justify-content-center p-5">
                        <div className="text-center p-5">
                            <PlayCircleOutlined className="text-primary display-1 p-5" />
                            <p className="lead">Clcik on the lessons to start learning</p>
                        </div>
                        </div>
                    )}
                </div>
            </div>
        </StudentRoute>
    )
}

export default SingleCourse;