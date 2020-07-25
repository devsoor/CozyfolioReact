import React, {useState} from 'react';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Form,
    FormGroup,
    InputGroup,
    Input,
    Label,
    ListGroup,
    ListGroupItem,
    Row
  } from 'reactstrap';
import Select from 'react-select'
import 'react-select/dist/react-select.min.css';
import ImageUploader from "react-images-upload";
// import MemberForm from './MemberForm';
// import PictureForm from './PictureForm';

const ProjectForm = (props) => {
    const [project, setProject] = useState({...props.project});
    console.log("ProjectForm: project = ", project)
    const { editMode } = props;
    const [teamMember, setTeamMember] = useState();
    const [members, setMembers] = useState([]);
    const [pictures, setPictures] = useState([]);
    !members.length && project.members && project.members.map(member => {
        members.push(member.name);
    })
    !pictures.length && project.pictures && project.pictures.map(pic => {
        pictures.push(pic.picfile);
    })
    
    const saveProjectList = (value) => {
        setProject(value);
    }
    
    const handleChange = (e) => {
        setProject({...project, [e.target.name]: e.target.value});
    }
    
    const handleFormSubmit = (event) => {
        event.preventDefault();    
        console.log("ProjectForm: handleFormSubmit: project = ", project)   
        props.onFormSubmit(project);
    }
    
    const addTeamMember = () => {
        members.push(teamMember);
        setTeamMember('');
        setProject({...project, members})
    }
    
    const handleUpdateMember = (e) => {
        const members = project.members;
        members.map(member => {
            if (member.name == e.target.name) {
                member.name = e.target.value;
            }
        })
        setProject({...project, members});
        
    }
    
    const onDrop = pics => {
        console.log("onDrop: pics = ", pics)
        pics.map(file => {
            // pictures.push({'picfile':file.name});
            pictures.push(file.name)
        });
        setProject({...project, pictures});

    };

    const deleteTeamMember = (e, name) => {
        const members = project.members.filter(member => member.name != name);
        setProject({...project, members});
    }
    
    const deletePicture = (e, picfile) => {
        const pictures = project.pictures.filter(pic => pic.picfile != picfile);
        setProject({...project, pictures});
    }

    const handleCancel = (e) => {
        e.preventDefault();
        props.onCancelClick();
    }

    return (
        <Form onSubmit={handleFormSubmit}>
            <fieldset disabled={!editMode}>
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
                    <CardBody>
                        <Row>
                            <Col sm="11" >
                                <Input type="text" value={teamMember || ''} name="teamMember" placeholder="Enter Name.." onChange={(e)=>{setTeamMember(e.target.value)}}/>
                            </Col>
                            <Col sm="1">
                                <Button onClick={addTeamMember} color="primary">Add</Button>
                            </Col>
                        </Row>
                    </CardBody>
                    {
                        members && members.map((member, i) => (
                            <Col key={i}>
                                <CardHeader>
                                    <Row className="row align-items-center p-0">
                                        <Col sm="11">
                                            <InputGroup key={i}>
                                                <Input type="text" name={member} value={member} onChange={handleUpdateMember}/>
                                            </InputGroup>
                                        </Col>
                                        <Col sm="1">
                                            <Button onClick={e=>deleteTeamMember(e, member)} className="bg-danger"><i className="fa fa-trash"></i></Button>
                                        </Col>
                                    </Row>
                                </CardHeader>
                            </Col>
                            ))
                    }
                </FormGroup>
                <FormGroup>
                    <h4>Pictures</h4>
                    <ImageUploader
                        {...props}
                        withIcon={true}
                        onChange={onDrop}
                        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                        maxFileSize={5242880}
                    />
                    <ListGroup>
                        {
                            pictures && pictures.map((pic, i) => (
                                <Col key={i}>
                                    <CardHeader>
                                        <Row className="row align-items-center">
                                            <Col sm="11">
                                                <ListGroupItem key={i}>{pic}</ListGroupItem>
                                            </Col>
                                            <Col sm="1">
                                                <Button onClick={e=>deletePicture(e, pic)} className="bg-danger"><i className="fa fa-trash"></i></Button>
                                            </Col>
                                        </Row>
                                    </CardHeader>
                                </Col>
                            ))
                        }
                    </ListGroup>
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
            </fieldset>
        </Form>
    )
}
export default ProjectForm;