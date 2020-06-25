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
    const [portfolios, setPortfolios] = useState({});
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
        if(activeTab !== tab) setActiveTab(tab);
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
                            <ListGroupItem className={classnames({ active: activeTab === '1' })} onClick={() => { toggle('1'); }} >Full Stack Developer</ListGroupItem>
                            <ListGroupItem className={classnames({ active: activeTab === '2' })} onClick={() => { toggle('2'); }} >Frontend Developer</ListGroupItem>
                            <ListGroupItem className={classnames({ active: activeTab === '3' })} onClick={() => { toggle('3'); }} >Backend developer</ListGroupItem>
                            <ListGroupItem className={classnames({ active: activeTab === '4' })} onClick={() => { toggle('4'); }} >Solution Architect</ListGroupItem>
                        </ListGroup>
                        </Col>
                        <Col xs="8">
                        <TabContent activeTab={activeTab}>
                            <TabPane tabId="1">
                                <Card>
                                    <CardHeader>
                                    Full Stack Developer
                                    </CardHeader>
                                        <CardBody>
                                            <Form action="" method="post">
                                                <FormGroup>
                                                    <Label htmlFor="portfolio-name1">Name</Label>
                                                    <Input type="text" id="portfolio-name1" name="portfolio-name" placeholder="Enter Name.."/>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label htmlFor="portfolio-title1">Job Title</Label>
                                                    <Input type="text" id="portfolio-title1" name="portfolio-title" placeholder="Enter Job Title.."/>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label htmlFor="portfolio-projects1">Projects</Label>
                                                    <Select
                                                        id="portfolio-projects1"
                                                        name="portfolio-projects1"
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
                            <TabPane tabId="2">
                                <Card>
                                    <CardHeader>
                                    Frontend Developer
                                    </CardHeader>
                                        <CardBody>
                                            <Form action="" method="post">
                                                <FormGroup>
                                                    <Label htmlFor="portfolio-name2">Name</Label>
                                                    <Input type="text" id="portfolio-name2" name="portfolio-name" placeholder="Enter Name.."/>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label htmlFor="portfolio-title2">Job Title</Label>
                                                    <Input type="text" id="portfolio-title2" name="portfolio-title" placeholder="Enter Job Title.."/>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label htmlFor="portfolio-projects">Projects</Label>
                                                    <Select
                                                        id="portfolio-projects2"
                                                        name="portfolio-projects2"
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
                            <TabPane tabId="3">
                                <Card>
                                    <CardHeader>
                                    Backend Developer
                                    </CardHeader>
                                        <CardBody>
                                            <Form action="" method="post">
                                                <FormGroup>
                                                    <Label htmlFor="portfolio-name3">Name</Label>
                                                    <Input type="text" id="portfolio-name3" name="portfolio-name" placeholder="Enter Name.."/>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label htmlFor="portfolio-title3">Job Title</Label>
                                                    <Input type="text" id="portfolio-title3" name="portfolio-title" placeholder="Enter Job Title.."/>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label htmlFor="portfolio-projects3">Projects</Label>
                                                    <Select
                                                        name="portfolio-projects3"
                                                        id="portfolio-projects3"
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
                            <TabPane tabId="4">
                                <Card>
                                    <CardHeader>
                                    Solution Architect
                                    </CardHeader>
                                        <CardBody>
                                            <Form action="" method="post">
                                                <FormGroup>
                                                    <Label htmlFor="portfolio-name4">Name</Label>
                                                    <Input type="text" id="portfolio-name4" name="portfolio-name" placeholder="Enter Name.."/>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label htmlFor="portfolio-title4">Job Title</Label>
                                                    <Input type="text" id="portfolio-title4" name="portfolio-title" placeholder="Enter Job Title.."/>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label htmlFor="portfolio-projects4">Projects</Label>
                                                    <Select
                                                        id="portfolio-projects4"
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