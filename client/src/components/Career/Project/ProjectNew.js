import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import ImageUploader from "react-images-upload";
import {
    Button,
    Card,
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

    const handleKeyDown = (e) => {
        console.log("handleKeyDown: e = ", e.target.value)
        if (e.key === 'Enter') {
            setTeamMember({[e.target.name]: e.target.value});
        }
    }

    const createProject = () => {
        console.log("createProject: project = ", project)
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
        console.log("addTeamMember: project = ", project)
        setTeamMember('');
    }

    const onDrop = picture => {
        console.log("onDrop: picture = ", picture)
        setFiles([...files, picture]);
    };

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
                            <Label>Name</Label>
                            <Input type="text" value={project.name || ''} name="name" placeholder="Enter Name.." onChange={handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Description</Label>
                            <Input type="textarea" value={project.summary || ''} name="summary" rows="5" placeholder="Enter project description here" onChange={handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Technologies used</Label>
                            <Input type="text" value={project.techUsed || ''} name="techUsed" placeholder="Enter Technologies.." onChange={handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Team members</Label>
                            <Row>
                                <Col sm="5">
                                    <Input type="text" value={teamMember || ''} name="teamMember" placeholder="Enter name" onChange={(e)=>{setTeamMember(e.target.value)}}/>
                                </Col>
                                <Col sm="1">
                                    <Button onClick={addTeamMember}  size="sm">Add</Button>
                                </Col>
                                <Col sm="6">
                                    <ListGroup>
                                        {
                                            project.members && project.members.map((member, i) => (
                                                <ListGroupItem key={i}>{member}</ListGroupItem>
                                                ))
                                            }
                                    </ListGroup>
                                </Col>
                        </Row>
                        <FormGroup>
                            <ImageUploader
                                {...props}
                                withIcon={true}
                                onChange={onDrop}
                                imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                                maxFileSize={5242880}
                            />
                        </FormGroup>
                        </FormGroup>
                        <FormGroup>
                            <Label>Process</Label>
                            <Input type="textarea" value={project.process || ''} name="process" rows="5" placeholder="Enter process description here" onChange={handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Github</Label>
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