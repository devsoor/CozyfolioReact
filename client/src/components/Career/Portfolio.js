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
} from 'reactstrap'
import axios from 'axios';
import CIcon from '@coreui/icons-react'
import Select from 'react-select'
import 'react-select/dist/react-select.min.css';
import classnames from 'classnames';


const Portfolio = (props) => {
    const projectNames = [
        { value: 'Python', label: 'Python/Flask' },
        { value: 'Java', label: 'Java/Springboot' },
        { value: 'MERN', label: 'MERN' },
        { value: 'Ruby', label: 'Ruby on Rails' },
        { value: 'C#', label: 'C#/.NET' },
    ];
    const [portfolios, setPortfolios] = useState([]);
    const [activeTab, setActiveTab] = useState('1')
    const [proj, setProj] = React.useState('Python')

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

    const toggle = tab => {
        let indx = (tab).toString();
        if (activeTab !== indx) setActiveTab(indx);
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
                            <ButtonGroup className="float-right">
                                <Button color="success"><CIcon name="cil-plus" />Add</Button>
                                <Button color="danger"><CIcon name="cil-minus" />Delete</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>                
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col xs="4">
                        <ListGroup id="list-tab" role="tablist">
                            {
                                portfolios.map((pfolio, i) => (
                                    <ListGroupItem key={i} onClick={() => { toggle(i) }} >{pfolio.name}</ListGroupItem>
                                ))
                            }
                       </ListGroup>
                        </Col>
                        <Col xs="8">
                        <TabContent activeTab={activeTab}>
                            {
                                portfolios.map((pfolio, i) => (
                                    <TabPane key={i} tabId={i.toString()}>
                                    <Card>
                                        <CardHeader>
                                        {pfolio.name}
                                        </CardHeader>
                                            <CardBody>
                                                <Form action="" method="post">
                                                    <FormGroup>
                                                        <Label >Job Title</Label>
                                                        <Input type="text" value={pfolio.title} name="portfolio-title" placeholder="Enter Job Title.."/>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label>Summary</Label>
                                                        <Input type="text" value={pfolio.portfolioSummary} name="portfolio-name" placeholder="Enter Name.."/>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label >Projects</Label>
                                                        <Select
                                                            name="portfolio-projects"
                                                            value={proj}
                                                            options={projectNames}
                                                            onChange={setProj}
                                                            multi
                                                        />
                                                    </FormGroup>
                                                </Form>
                                            </CardBody>
                                        <CardFooter>
                                            <Button type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</Button> <Button type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</Button>
                                        </CardFooter>
                                    </Card>
                                </TabPane>
                                ))
                            }
                        </TabContent>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            </Col>
        </Row>
        </>
    )
}

export default Portfolio;