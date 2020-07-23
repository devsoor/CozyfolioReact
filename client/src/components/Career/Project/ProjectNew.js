import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import ImageUploader from "react-images-upload";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    ListGroup,
    ListGroupItem,
    Row
  } from 'reactstrap';
import ServerApi from '../../../api/ServerAPI';

const ProjectNew = (props) => {
    const defaultProject = {
        name: '',
        summary: '',
        techUsed: '',
        members: [],
        files: [],
        video: '',
        process: '',
        url: '',
    }
    const [project, setProject] = useState(defaultProject);
    const [teamMember, setTeamMember] = useState();
    const [files, setFiles] = useState([]);
    const [toProjectPage, setToProjectPage] = useState(false);

    let api = new ServerApi();

    const handleChange = (e) => {
        setProject({...project, [e.target.name]: e.target.value});
    }

    const createProject = () => {
        api.create('/project', project)
        .then(resp => resp.json()).then(data => {
            console.log("created project: data  = ", data)
        }).catch(error => console.log('Error creating project ->', error))
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();     
        console.log("handleFormSubmit: files = ", files)  
        if (files.length) {
            files[0].forEach(pic => {
                project.files.push(pic);
            });
            setProject({...project, files})
        }
        createProject();
        setToProjectPage(true);
    }

    const addTeamMember = () => {
        project.members.push(teamMember);
        setTeamMember('');
        console.log("addTeamMember: files = ", files)
        
    }

    const onDrop = picture => {
        console.log("onDrop: picture = ", picture)
        setFiles([...files, picture]);
        console.log("onDrop: files = ", files)
    };
    
    const deletePicture = (e, picfile) => {
        const f = files[0].filter(pic => pic.name != picfile);
        setFiles([f]);
    }

    const handleCancel = (e) => {
        setToProjectPage(true);
    }

    return (
      <>
        {
            toProjectPage && <Redirect to="/career/projects"/>
        }
        <div className="animated fadeIn">
            <Card>
                <CardBody>
                    <Form onSubmit={handleFormSubmit}>
                        <FormGroup>
                            <h4>Name</h4>
                            <Input type="text" value={project.name || ''} name="name" placeholder="Enter Name.." onChange={handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <h4>Description</h4>
                            <Input type="textarea" value={project.summary || ''} name="summary" rows="5" placeholder="Enter project description here" onChange={handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <h4>Technologies used</h4>
                            <Input type="text" value={project.techUsed || ''} name="techUsed" placeholder="Enter Technologies.." onChange={handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <h4>Team members</h4>
                            <Row>
                                <Col sm="12" md="6">
                                    <CardBody>
                                        <Row>
                                            <Col sm="5">
                                                <Input type="text" value={teamMember || ''} name="teamMember" placeholder="Enter name" onChange={(e)=>{setTeamMember(e.target.value)}}/>
                                            </Col>
                                            <Col sm="1">
                                                <Button onClick={addTeamMember}  size="sm">Add</Button>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                        <ListGroup>
                                            {
                                                project.members && project.members.map((member, i) => (
                                                        <ListGroupItem key={i}>{member}</ListGroupItem>
                                                    
                                                    ))
                                                }
                                        </ListGroup>
                                    
                                </Col>
                                <Col sm="12" md="6">
                                    <ImageUploader
                                        {...props}
                                        withIcon={true}
                                        onChange={onDrop}
                                        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                                        maxFileSize={5242880}
                                    />
                                                        <ListGroup>
                        {
                            files[0] && files[0].map((pic, i) => (
                                <Col key={i}>
                                    <CardHeader>
                                        <Row className="row align-items-center">
                                            <Col sm="11">
                                                <ListGroupItem>{pic.name}</ListGroupItem>
                                            </Col>
                                            <Col sm="1">
                                                <Button onClick={e=>deletePicture(e, pic.name)} className="bg-danger"><i className="fa fa-trash"></i></Button>
                                            </Col>
                                        </Row>
                                    </CardHeader>
                                </Col>
                            ))
                        }
                    </ListGroup>
                                </Col>
                            </Row>
                        </FormGroup>
            
                        <FormGroup>
                            <h4>Process</h4>
                            <Input type="textarea" value={project.process || ''} name="process" rows="5" placeholder="Enter process description here" onChange={handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <h4>Github</h4>
                            <Input type="text" value={project.url || ''} name="url" rows="5" placeholder="Enter Github URL" onChange={handleChange}/>
                        </FormGroup>
                        <Button type="submit" color="primary">Submit</Button> <Button type="cancel" color="danger" onClick={handleCancel}>Cancel</Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
      </>
    )
}

export default ProjectNew;