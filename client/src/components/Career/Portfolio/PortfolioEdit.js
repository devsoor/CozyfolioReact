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
        // props.onCancelClick();
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
                {
                    !props.portfolios.length ? (
                        <h3>No portfolios available. Click on New to add one.</h3>
                    ) : (
                        <Row>
                            <Col md="5">
                                <ListGroup id="list-tab" role="tablist" >
                                    {
                                        props.portfolios.map((pfolio, i) => (
                                            <Col key={i}>
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
                                            </Col>
                                        ))
                                    } 
                                </ListGroup>
                            </Col>
                            <Col md="7">
                                <TabContent activeTab={activeTab}>
                                    {
                                        props.portfolios.map((pfolio, i) => (
                                            <TabPane key={i} tabId={i.toString()}>
                                            <Card>
                                                <CardHeader>
                                                    {pfolio.name}
                                                </CardHeader>
                                                    <CardBody>                                
                                                        <PortfolioForm
                                                            portfolio={pfolio}
                                                            onCancelClick={leaveEditMode}
                                                            onFormSubmit={handleUpdate}
                                                            editMode={inEditMode}>
                                                        </PortfolioForm>
                                                    </CardBody>
                                            </Card>
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

export default PortfolioEdit;