import React, {useState} from 'react';
import {
    Button,
    Card,
    CardBody,
    Col,
    Form,
    FormGroup,
    Input,
    Label
  } from 'reactstrap';
import Select from 'react-select'
import 'react-select/dist/react-select.min.css';

const PortfolioForm = (props) => {

    const projectNames = [
        { value: 'Python', label: 'Python/Flask' },
        { value: 'Java', label: 'Java/Springboot' },
        { value: 'MERN', label: 'MERN' },
        { value: 'Ruby', label: 'Ruby on Rails' },
        { value: 'C#', label: 'C#/.NET' },
    ];
    const [proj, setProj] = useState('Python')
    // const { id, name, title, portfolioSummary } = props.portfolio;
    const [pfolio, setPfolio] = useState(props.portfolio);

    const handleChange = (e) => {
        console.log("PortfolioForm:handleChange, e.target.name = ", e.target.name)
        console.log("PortfolioForm:handleChange, e.target.value = ", e.target.value)
        setPfolio({...pfolio, [e.target.name]: e.target.value});
        // props.onValueChange(id, e.target.name, e.target.value);
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        props.onFormSubmit(pfolio);
    }
    return (
        <Card>
            <CardBody>
                <Form onSubmit={handleFormSubmit}>
                    <FormGroup>
                        <Label >Name</Label>
                        <Input type="text" value={pfolio.name || ''} name="name" placeholder="Enter Name.." onChange={handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label >Job Title</Label>
                        <Input type="text" value={pfolio.title || ''} name="title" placeholder="Enter Job Title.." onChange={handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Summary</Label>
                        <Input type="text" value={pfolio.portfolioSummary || ''} name="portfolioSummary" placeholder="Enter Summary.." onChange={handleChange}/>
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
                    <Button type="submit" size="sm" color="primary">Submit</Button> <Button type="cancel" size="sm" color="danger" onClick={props.onCancelClick}>Cancel</Button>
                </Form>
            </CardBody>
        </Card>
    )
}
export default PortfolioForm;