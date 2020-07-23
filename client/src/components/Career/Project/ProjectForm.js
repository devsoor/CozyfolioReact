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
    const [files, setFiles] = useState([]);
    
    const saveProjectList = (value) => {
        setProject(value);
    }
    
    const handleChange = (e) => {
        setProject({...project, [e.target.name]: e.target.value});
        console.log("handleChange: project = ", project)
    }
    
    const handleFormSubmit = (event) => {
        event.preventDefault();        
        props.onFormSubmit(project);
    }
    
    const addTeamMember = () => {
        project.members.push(teamMember);
        console.log("addTeamMember: project = ", project)
        setTeamMember('');
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

    const addPictures = (files) => {
        setFiles(files);
    }

    const onDrop = picture => {
        console.log("onDrop: picture = ", picture)
        setFiles([...files, picture]);
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
                        project.members && project.members.map((member, i) => (
                            <Col key={i}>
                                <CardHeader>
                                    <Row className="row align-items-center p-0">
                                        <Col sm="11">
                                            <InputGroup key={i}>
                                                <Input type="text" id={member.id} name={member.name} value={member.name} onChange={handleUpdateMember}/>
                                            </InputGroup>
                                        </Col>
                                        <Col sm="1">
                                            <Button onClick={e=>deleteTeamMember(e, member.name)} className="bg-danger"><i className="fa fa-trash"></i></Button>
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
                            project.pictures && project.pictures.map((pic, i) => (
                                <Col key={i}>
                                    <CardHeader>
                                        <Row className="row align-items-center">
                                            <Col sm="11">
                                                <ListGroupItem key={i}>{pic.picfile}</ListGroupItem>
                                            </Col>
                                            <Col sm="1">
                                                <Button onClick={e=>deletePicture(e, pic.picfile)} className="bg-danger"><i className="fa fa-trash"></i></Button>
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