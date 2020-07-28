import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import ImageUploader from "react-images-upload";
import {
    Card,
    CardBody,
  } from 'reactstrap';

import ProjectForm from './ProjectForm';
import ServerApi from '../../../api/ServerAPI';
import technologies from './technologies';

const ProjectNew = (props) => {
    const [toProjectPage, setToProjectPage] = useState(false);

    let api = new ServerApi();

    const createProject = (project) => {
        api.create('/project', project)
        .then(resp => resp.json()).then(data => {
            console.log("created project: data  = ", data)
        }).catch(error => console.log('Error creating project ->', error))
    }

    const handleFormSubmit = (project) => {
        createProject(project);
        setToProjectPage(true);
    }

    const handleCancel = (e) => {
        setToProjectPage(true);
    }

    return (
      <>
        {
            toProjectPage && <Redirect to="/career/projects"/>
        }
        <div className="animated fadeIn">
            <Card>
                <CardBody>
                    <ProjectForm
                        onCancelClick={handleCancel}
                        onFormSubmit={handleFormSubmit}
                        editMode={true}>
                    </ProjectForm>
                </CardBody>
            </Card>
        </div>
      </>
    )
}

export default ProjectNew;