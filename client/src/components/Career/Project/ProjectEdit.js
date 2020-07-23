import React, { useState } from 'react'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Label,
  ListGroup,
  ListGroupItem,
  Row,
  TabContent,
  TabPane
} from 'reactstrap';
import ProjectForm from '../Project/ProjectForm';

const ProjectEdit = (props) => {
    const [inEditMode, setInEditMode] = useState(false);
    const [activeTab, setActiveTab] = useState('1')

    const toggle = tab => {
        let indx = (tab).toString();
        if (activeTab !== indx) setActiveTab(indx);
    }

    const enterEditMode = () => {
        setInEditMode(true);
    }

    const leaveEditMode = () => {
        setInEditMode(false);
    }

    const handleUpdate = (project) => {
        leaveEditMode();
        props.onClickUpdate(project);
    }

    const handleDelete = (e, id) => {
        props.onClickDelete(id);
    }

    return (
        <Card>
            <CardBody>
                {
                    !props.projects.length ? (
                        <h3>No projects available. Click on New to add one.</h3>
                    ) : (
                        <Row>
                            <Col md="5">
                                <ListGroup id="list-tab" role="tablist" >
                                    {
                                        props.projects.map((proj, i) => (
                                            <Col key={i}>
                                                <CardHeader key={i}>
                                                    <Row className="row align-items-center">
                                                        <Col sm="8">
                                                            <ListGroupItem key={i} onClick={() => { toggle(i) }} action active={activeTab === {i}} >{proj.name}</ListGroupItem>
                                                        </Col>
                                                        <Col sm="4">
                                                            <Button onClick={enterEditMode} className="mr-2 bg-warning"><i className="fa fa-edit"></i></Button>
                                                            <Button onClick={e=>handleDelete(e, proj.id)} className="bg-danger"><i className="fa fa-trash"></i></Button>
                                                        </Col>
                                                    </Row>
                                                </CardHeader>
                                            </Col>
                                        ))
                                    } 
                                </ListGroup>
                            </Col>
                            <Col md="7">
                                <TabContent activeTab={activeTab}>
                                    {
                                        props.projects.map((proj, i) => (
                                            <TabPane key={i} tabId={i.toString()}>                              
                                                    <ProjectForm
                                                        project={proj}
                                                        onCancelClick={leaveEditMode}
                                                        onFormSubmit={handleUpdate}
                                                        editMode={inEditMode}>
                                                    </ProjectForm>
                                        </TabPane>
                                        ))
                                    }
                                </TabContent>
                            </Col>
                        </Row>
                    )
                }
            </CardBody>
        </Card>
    )
}

export default ProjectEdit;