import React, { useState, useEffect } from 'react'
import {
  Button,
  Card,
  CardHeader,
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import PortfolioForm from './PortfolioForm';
import PortfolioEdit from './PortfolioEdit';

const Portfolio = (props) => {
    const defaultPortfolio = {
        id: '',
        name: '',
        title: '',
        portfolioSummary: ''
    }
    const [portfolios, setPortfolios] = useState([]);
    const [inCreateMode, setInCreateMode] = useState(false);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('access_token')
        console.log("Portfolio: access token: ", token)
        fetch('/portfolio', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'JWT ' +  localStorage.getItem('access_token')
            },
            // body:  JSON.stringify()
        }).then(resp => resp.json()).then(data => {
            console.log("portfolios: fetch: data = ", data)
            setPortfolios(data)
        }).catch(error => console.log('error ->', error))
    }, []);

    const toggle = () => setModal(!modal);

    const handlePortfolioChange = (id, name, value) => {
        setPortfolios({...portfolios, [name]: value});
    }

    const createPortfolio = async (pfolio) => {
        console.log("createPortfolio: pfolio = ", pfolio)
        await fetch('/portfolio', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'JWT ' +  localStorage.getItem('access_token')
            },
            body:  JSON.stringify(pfolio)
        }).then(resp => resp.json()).then(data => {
            const [...newPortfolio] = portfolios;
            newPortfolio.push(data);
            setPortfolios(newPortfolio)
            toggle()
        }).catch(error => console.log('Error creating portfolio ->', error))
    }
        
    const updatePortfolio = async (newPortfolio) => {
        console.log("updatePortfolio: newPortfolio = ", newPortfolio)
        await fetch('/portfolio/', {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'JWT ' +  localStorage.getItem('access_token')
            },
            body:  JSON.stringify(newPortfolio.id)
        }).then(resp => resp.json()).then(data => {
            setPortfolios([...portfolios], data)
        }).catch(error => console.log('Error updating portfolio ->', error))
    }

    const deletePortfolio = async (id) => {
        console.log("deletePortfolio: id = ",id)
        await fetch('/portfolio', {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'JWT ' +  localStorage.getItem('access_token')
            },
            body:  JSON.stringify(id)
        }).then(resp => resp.json()).then(data => {
            setPortfolios(portfolios.filter(folio => folio.id != id));
        }).catch(error => console.log('Error deleting portfolio ->', error))
    }

    const handleCreateClick = () => {
        setInCreateMode(true);
    }

    const handleCancelClick = () => {
        setInCreateMode(false);
    }

    return (
        <>
        <Row>
            <Col>
                <Card>
                    <CardHeader>
                        <Row>
                            <Col sm="5">
                                Portfolios
                            </Col>
                            <Col sm="7" className="d-none d-md-block">
                                <Button onClick={toggle} className="bg-info float-right">New</Button>
                                <Modal isOpen={modal} toggle={toggle}>
                                    <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                                        <ModalBody>
                                            <PortfolioForm
                                                portfolio={defaultPortfolio}
                                                onFormSubmit={createPortfolio}
                                                onCancelClick={toggle}>
                                            </PortfolioForm>
                                        </ModalBody>                        
                                </Modal>
                            </Col>
                        </Row>                
                    </CardHeader>
                    {/* {
                        inCreateMode ? (
                            <Card>
                                <PortfolioForm
                                    portfolio={defaultPortfolio}
                                    onFormSubmit={createPortfolio}
                                    onCancelClick={handleCancelClick}>
                                </PortfolioForm>
                            </Card>
                        ) : ( */}
                            <PortfolioEdit portfolios={portfolios} onPortfolioChange={handlePortfolioChange} onClickUpdate={updatePortfolio} onClickDelete={deletePortfolio}/>
                        {/* )} */}
                </Card>
            </Col>
        </Row>
        </>
    )
}

export default Portfolio;