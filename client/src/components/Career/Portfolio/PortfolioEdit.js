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
import PortfolioForm from './PortfolioForm';

const PortfolioEdit = (props) => {
    console.log("PortfolioEdit: props = ", props)
    props.portfolios.map(f => {
        console.log("in MAP: f.name = ", f.name)
    })
    const [inEditMode, setInEditMode] = useState(false);
    const [activeTab, setActiveTab] = useState('1')
    const [proj, setProj] = React.useState('Python')

    const projectNames = [
        { value: 'Python', label: 'Python/Flask' },
        { value: 'Java', label: 'Java/Springboot' },
        { value: 'MERN', label: 'MERN' },
        { value: 'Ruby', label: 'Ruby on Rails' },
        { value: 'C#', label: 'C#/.NET' },
    ];

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

    const handleValueChange = (id, name, value) => {
        console.log("PortfolioEdit: handleValueChange, id = ", id)
        console.log("PortfolioEdit: handleValueChange, name = ", name)
        console.log("PortfolioEdit: handleValueChange, value = ", value)
        props.onPortfolioChange(id, name, value);
    }

    const handleUpdate = (portfolio) => {
        leaveEditMode();
        props.onClickUpdate(portfolio);
    }

    const handleDelete = (e, id) => {
        props.onClickDelete(id);
    }

    return (
        <Card>
            <CardBody>
                <Row>
                    <Col xs="4">
                        <ListGroup id="list-tab" role="tablist" >
                            {
                               props.portfolios.map((pfolio, i) => (
                                    <CardHeader key={i}>
                                        <Row className="row align-items-center">
                                            <Col sm="8">
                                                <ListGroupItem key={i} onClick={() => { toggle(i) }} action active={activeTab === {i}} >{pfolio.name}</ListGroupItem>
                                            </Col>
                                            <Col sm="4">
                                                <Button onClick={enterEditMode} className="mr-2 bg-warning"><i className="fa fa-edit"></i></Button>
                                                <Button onClick={e=>handleDelete(e, pfolio.id)} className="bg-danger"><i className="fa fa-trash"></i></Button>
                                            </Col>
                                        </Row>
                                    </CardHeader>
                                ))
                            } 
                        </ListGroup>
                    </Col>
                    <Col xs="8">
                        <TabContent activeTab={activeTab}>
                            {
                                props.portfolios.map((pfolio, i) => (
                                    <TabPane key={i} tabId={i.toString()}>
                                    <Card>
                                        <CardHeader>
                                        {pfolio.name}
                                        </CardHeader>
                                            <CardBody>
                                                {
                                                    inEditMode ? (
                                                        <PortfolioForm
                                                            portfolio={pfolio}
                                                            onValueChange={handleValueChange}
                                                            onCancelClick={leaveEditMode}
                                                            onFormSubmit={handleUpdate}>
                                                        </PortfolioForm>
                                                    ) : (
                                                        <CardBody>
                                                            <Row>
                                                                <Label >Job Title</Label>
                                                                <p>{pfolio.title}</p>
                                                            </Row>
                                                            <Row>
                                                                <h3>Summary</h3>
                                                                <p>{pfolio.portfolioSummary}</p>
                                                            </Row>
                                                            <Row>
                                                                <h3>Projects</h3>
                                                                {
                                                                    projectNames.map((proj,i) => 
                                                                        <Col key={i}>{proj.value}</Col>
                                                                    )
                                                                }
                                                            </Row>
                                                        </CardBody>
                                                    )
                                                }
                                            </CardBody>
                                    </Card>
                                </TabPane>
                                ))
                            }
                        </TabContent>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}

export default PortfolioEdit;