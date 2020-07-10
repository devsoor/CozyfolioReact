import React, { useState, useEffect } from 'react'
import {
  Button,
  Card,
  CardHeader,
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap';
import PortfolioForm from './PortfolioForm';
import PortfolioEdit from './PortfolioEdit';
import ServerApi from '../../../api/ServerAPI';

const Portfolio = (props) => {
    const defaultPortfolio = {
        id: '',
        name: '',
        title: '',
        portfolioSummary: '',
        project: []
    }
    const [portfolios, setPortfolios] = useState([]);
    const [modal, setModal] = useState(false);
    let api = new ServerApi();

    useEffect(() => {
        api.get('/portfolio')
        .then(resp => resp.json()).then(data => {
            setPortfolios(data)
        }).catch(error => console.log('error ->', error))
    }, []);

    const toggle = () => setModal(!modal);

    const createPortfolio = (pfolio) => {
        api.create('/portfolio', pfolio)
        .then(resp => resp.json()).then(data => {
            const [...newPortfolio] = portfolios;
            newPortfolio.push(data);
            setPortfolios(newPortfolio)
            toggle()
        }).catch(error => console.log('Error creating portfolio ->', error))
    }
        
    const updatePortfolio = (newPortfolio) => {
        api.update('/portfolio/', newPortfolio.id, newPortfolio)
        .then(resp => resp.json())
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
        api.delete('/portfolio/', id)
        .then(resp => {
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
                                    <h3>Portfolios</h3>
                                </Col>
                                <Col sm="7" className="d-none d-md-block">
                                    <Button onClick={toggle} className="bg-info float-right">New</Button>
                                    <Modal isOpen={modal} toggle={toggle}>
                                        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                                            <ModalBody>
                                                <PortfolioForm
                                                    portfolio={defaultPortfolio}
                                                    onFormSubmit={createPortfolio}
                                                    onCancelClick={toggle}
                                                    editMode={true}>
                                                </PortfolioForm>
                                            </ModalBody>                        
                                    </Modal>
                                </Col>
                            </Row>                
                        </CardHeader>
                        <PortfolioEdit portfolios={portfolios} onClickUpdate={updatePortfolio} onClickDelete={deletePortfolio} onCancelClick={toggle}/>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Portfolio;