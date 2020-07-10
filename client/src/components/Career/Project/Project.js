import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
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
import ServerApi from '../../../api/ServerAPI';

const Project = (props) => {
    const [projects, setProjects] = useState([]);
    const [inCreateMode, setInCreateMode] = useState(false);

    let api = new ServerApi();

    useEffect(() => {
      api.get('/project')
      .then(resp => resp.json()).then(data => {
        setProjects(data)
      }).catch(error => console.log('Error getting projects ->', error))
    }, []);

      
    const updateProject = (newProject) => {
        api.update('/project/', newProject.id, newProject)
        .then(resp => resp.json())
        .then(newProject => {
            const newProjects = projects.map(folio => {
                if (folio.id == newProject.id) {
                    return Object.assign({}, newProject)
                } else {
                    return folio;
                }
            });
            setProjects(newProjects);
        })
    }

    const deleteProject = async (id) => {
        api.delete('/project/', id)
        .then(resp => {
            if (resp.status == 204) {
                setProjects(projects.filter(folio => folio.id != id));
            }
        }).catch(error => console.log('Error deleting project ->', error))
    }

    const handleCreateClick = () => {
      setInCreateMode(true);
    }

    const handleCancel = () => {

    }

    return (
      <>
        {
            inCreateMode && <Redirect to="/career/projectNew"/>
        }
        <div className="animated fadeIn">
            <Row>
                <Col>
                    <Card>
                        <CardHeader>
                            <Row>
                                <Col sm="5">
                                    <h3>Projects</h3>
                                </Col>
                                <Col sm="7" className="d-none d-md-block">
                                    <Button onClick={handleCreateClick} className="bg-info float-right">New</Button>
                                </Col>
                            </Row>                
                        </CardHeader>
                        {/* <ProjctEdit portfolios={portfolios} onClickUpdate={updatePortfolio} onClickDelete={deletePortfolio} onCancelClick={handleCancel}/> */}
                    </Card>
                </Col>
            </Row>
        </div>
      </>
    )
}

export default Project;