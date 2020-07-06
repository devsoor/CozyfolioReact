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
import PortfolioForm from './PortfolioForm';
import PortfolioEdit from './PortfolioEdit';
import { useAuth } from "../../../Auth/Context";

const Portfolio = (props) => {
    const { authTokens } = useAuth();

    const defaultPortfolio = {
        id: '',
        name: '',
        title: '',
        portfolioSummary: ''
    }
    const [portfolios, setPortfolios] = useState([]);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        fetch('/portfolio', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'JWT ' +  authTokens
            },
            // body:  JSON.stringify()
        }).then(resp => resp.json()).then(data => {
            setPortfolios(data)
        }).catch(error => console.log('error ->', error))
    }, []);

    const toggle = () => setModal(!modal);

    const handlePortfolioChange = (id, name, value) => {
        setPortfolios({...portfolios, [name]: value});
    }

    const createPortfolio = async (pfolio) => {
        await fetch('/portfolio', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'JWT ' +  authTokens
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
        await fetch('/portfolio/' + newPortfolio.id, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'JWT ' +  authTokens
            },
            body:  JSON.stringify(newPortfolio)
        }).then(resp => resp.json())
        .then(newPortfolio => {
            const newPortfolios = portfolios.map(folio => {
                if (folio.id == newPortfolio.id) {
                    return Object.assign({}, newPortfolio)
                } else {
                    return folio;
                }
            });
            setPortfolios(newPortfolios);
        })

    }

    const deletePortfolio = async (id) => {
        await fetch('/portfolio/' + id, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'JWT ' +  authTokens
            },
            // body:  JSON.stringify(id)
        }).then(resp => {
            if (resp.status == 204) {
                setPortfolios(portfolios.filter(folio => folio.id != id));
            }
        }).catch(error => console.log('Error deleting portfolio ->', error))
    }

    return (
        <div className="animated fadeIn">
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
                    <PortfolioEdit portfolios={portfolios} onPortfolioChange={handlePortfolioChange} onClickUpdate={updatePortfolio} onClickDelete={deletePortfolio}/>
                </Card>
            </Col>
        </Row>
        </div>
    )
}

export default Portfolio;