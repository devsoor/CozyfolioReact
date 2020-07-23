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
    const [proj, setProj] = useState([])
    // console.log("PortfolioForm: props.portfolio = ", props.portfolio)
    const [pfolio, setPfolio] = useState({...props.portfolio});
    const { editMode } = props;

    const saveProjectList = (value) => {
        setProj(value);
    }

    const handleChange = (e) => {
        setPfolio({...pfolio, [e.target.name]: e.target.value});
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();        
        // console.log("PortfolioForm: handleFormSubmit, proj = ", proj)
        // setPfolio([...pfolio, {project:proj}])
        // console.log("PortfolioForm: handleFormSubmit, pfolio = ", pfolio)
        props.onFormSubmit(pfolio);
    }

    const handleCancel = (e) => {
        e.preventDefault();
        props.onCancelClick();
    }

    return (
        <Card>
            <CardBody>
                <Form onSubmit={handleFormSubmit}>
                    <fieldset disabled={!editMode}>
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
                                name="project"
                                value={proj}
                                options={projectNames}
                                onChange={saveProjectList}
                                placeholder="Select project name"
                                multi
                            />
                        </FormGroup>
                        <Button type="submit" size="sm" color="primary">Submit</Button> <Button type="cancel" size="sm" color="danger" onClick={handleCancel}>Cancel</Button>
                    </fieldset>
                </Form>
            </CardBody>
        </Card>
    )
}
export default PortfolioForm;