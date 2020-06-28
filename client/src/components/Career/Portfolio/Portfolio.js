import React, { useState, useEffect } from 'react'
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  Row,
  TabContent,
  TabPane
} from 'reactstrap';
import axios from 'axios';
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

    useEffect(() => {
        axios.defaults.xsrfCookieName = 'csrftoken'
        axios.defaults.xsrfHeaderName = 'X-CSRFToken'
        axios.get('/portfolios')
            .then(response => {
                console.log("useEffect: axios get response = ", response)
                setPortfolios(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    const handlePortfolioChange = (id, name, value) => {
        console.log("Portfolio: handlePortfolioChange, id = ", id)
        console.log("Portfolio: handlePortfolioChange, name = ", name)
        console.log("Portfolio: handlePortfolioChange, value = ", value)
        // find the object in portfolio array that needs to be replaced 
        setPortfolios({...portfolios, [name]: value});
    }

    const createPortfolio = (portfolio) => {
        console.log("createPortfolio: portfolio = ", portfolio)
        axios.post('/portfolios')
            .then(portfolio => setPortfolios([...portfolios], portfolio))
            .then(setInCreateMode(false))
            .catch(err => console.log(err))
    }
        
    const updatePortfolio = (newPortfolio) => {
        console.log("updatePortfolio: newPortfolio = ", newPortfolio)
        axios.put('/portfolios/' + newPortfolio.id)
        .then(response => setPortfolios([...portfolios], response.data))
        .catch(err => console.log(err))
    }

    const deletePortfolio = (id) => {
        axios.delete('/portfolios/' + id)
        .then(res => {
            setPortfolios(portfolios.filter(folio => folio.id != id));
            
        })
        .catch(err => {
            console.log("Error deleting portfolio. ", err);
        })
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
                                <Button onClick={handleCreateClick} className="bg-info float-right">New</Button>
                            </Col>
                        </Row>                
                    </CardHeader>
                    {
                        inCreateMode ? (
                            <Card>
                                <PortfolioForm
                                    portfolio={defaultPortfolio}
                                    onFormSubmit={createPortfolio}
                                    onCancelClick={handleCancelClick}>
                                </PortfolioForm>
                            </Card>
                        ) : (
                            <PortfolioEdit portfolios={portfolios} onPortfolioChange={handlePortfolioChange} onClickUpdate={updatePortfolio} onClickDelete={deletePortfolio}/>
                        )}
                </Card>
            </Col>
        </Row>
        </>
    )
}

export default Portfolio;