import React, {useState} from 'react';
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
import Select from 'react-select'
import 'react-select/dist/react-select.min.css';
import ImageUploader from "react-images-upload";


const ProjectForm = (props) => {
    const [project, setProject] = useState({...props.project});
    const { editMode } = props;
    const [teamMember, setTeamMember] = useState();
    const [files, setFiles] = useState([]);

    const saveProjectList = (value) => {
        setProject(value);
    }

    const handleChange = (e) => {
        setProject({...project, [e.target.name]: e.target.value});
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

    const onDrop = picture => {
        console.log("onDrop: picture = ", picture)
        setFiles([...files, picture]);
    };

    const handleCancel = (e) => {
        e.preventDefault();
        props.onCancelClick();
    }

    return (
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
                            {/* <Col sm="5">
                                <Input type="text" value={teamMember || ''} name="teamMember" placeholder="Enter name" onChange={(e)=>{setTeamMember(e.target.value)}}/>
                            </Col>
                            <Col sm="1">
                                <Button onClick={addTeamMember}  size="sm">Add</Button>
                            </Col> */}
                            <Col sm="6">
                                {/* <ListGroup>
                                    {
                                        project.members && project.members.map((member, i) => (
                                            <ListGroupItem key={i}>{member}</ListGroupItem>
                                            ))
                                        }
                                </ListGroup> */}
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
    )
}
export default ProjectForm;