import React, { lazy } from 'react'
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Progress,
  Row
} from 'reactstrap'
import CIcon from '@coreui/icons-react'

const Widget01 = lazy(() => import('../views/Widgets/Widget01'));
const Widget02 = lazy(() => import('../views/Widgets/Widget02'));
const Widget03 = lazy(() => import('../views/Widgets/Widget03'));
const Widget04 = lazy(() => import('../views/Widgets/Widget04'));

const Dashboard = () => {
  return (
    <>
      <Row>
        <Col sm="6" md="3">
            <Widget04 icon="icon-people" color="info" header="3" value="3" invert>Portfolios</Widget04>
          </Col>
          <Col sm="6" md="3">
            <Widget04 icon="icon-user-follow" color="success" header="25" value="25" invert>Projects</Widget04>
          </Col>
          <Col sm="6" md="3">
            <Widget04 icon="icon-basket-loaded" color="warning" header="16" value="16" invert>Jobs Applied</Widget04>
          </Col>
          <Col sm="6" md="3">
            <Widget04 icon="icon-pie-chart" color="primary" header="13" value="13" invert>Companies Applied</Widget04>
          </Col>

      </Row>
      <Card>

      <CardBody>
          <Row>
            <Col sm="5">
              <h4 id="traffic" className="card-title mb-0">About Me</h4>
            </Col>
            <Col sm="7" className="d-none d-md-block">
              <Button color="light" className="float-right">
                Edit...
              </Button>
            </Col>
          </Row>
        </CardBody>

        <CardBody>
                <div className="mt-40">
                  <p>Years of experience in web development and enterprise scale applications. Lead teams in various large companies
                    and startups producing over 25% growth in business year-over-year. Expertise in frontend and backend technologies such as Python, JavaScript, Angular, React, AWS and GCP.</p>
                </div>
        </CardBody>
        <CardFooter>
          <Row className="text-center">
            <Col md sm="12" className="mb-sm-2 mb-0">
              <div className="text-muted">Languages</div>
              <div><strong>Python</strong></div>
              <div><strong>Java</strong></div>
              <div><strong>JavaScript</strong></div>
              <div><strong>C#</strong></div>
              <Progress
                className="progress-xs mt-2"
                precision={1}
                color="success"
                value={100}
              />
            </Col>
            <Col md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
              <div className="text-muted">Frameworks</div>
              <div><strong>Django</strong></div>
              <div><strong>Flask</strong></div>
              <div><strong>React</strong></div>
              <div><strong>Angular</strong></div>
              <div><strong>.NET Core</strong></div>
              <div><strong>MVC</strong></div>
              <div><strong>MTV</strong></div>
              <Progress
                className="progress-xs mt-2"
                precision={1}
                color="info"
                value={100}
              />
            </Col>
            <Col md sm="12" className="mb-sm-2 mb-0">
              <div className="text-muted">Databases</div>
              <div><strong>MySQL</strong></div>
              <div><strong>JSQLiteava</strong></div>
              <div><strong>MongoDb</strong></div>
              <div><strong>PostgreSQL</strong></div>
              <Progress
                className="progress-xs mt-2"
                precision={1}
                color="warning"
                value={100}
              />
            </Col>
            <Col md sm="12" className="mb-sm-2 mb-0">
              <div className="text-muted">Cloud</div>
              <div><strong>AWS</strong></div>
              <div><strong>GCP</strong></div>
              <div><strong>Azure</strong></div>
              <Progress
                className="progress-xs mt-2"
                precision={1}
                color="danger"
                value={100}
              />
            </Col>
            <Col md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
              <div className="text-muted">Other tools</div>
              <div><strong>Git</strong></div>
              <div><strong>Jira</strong></div>
              <div><strong>TDD</strong></div>
              <div><strong>CI/CD</strong></div>
              <Progress
                className="progress-xs mt-2"
                precision={1}
                value={100}
              />
            </Col>
          </Row>
        </CardFooter>
      </Card>

      {/* Projects */}
      <Card>
        <CardBody>
          <Row>
            <Col sm="5">
              <h4 id="traffic" className="card-title mb-0">Projects</h4>
            </Col>
            <Col sm="7" className="d-none d-md-block">
              <Button color="light" className="float-right">
                More...
              </Button>
            </Col>
          </Row>
        </CardBody>
        <CardFooter>
          <Row className="text-center">
          </Row>
        </CardFooter>
      </Card>

      <Row>
        <Col>
          <Card>
            <CardBody>
              <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                <thead className="thead-light">
                  <tr>
                      <th className="text-center">Job Title</th>
                      <th className="text-center">Company</th>
                      <th className="text-center">Application Date</th>
                      <th className="text-center">Portfolio</th>
                      <th className="text-center">Salary</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div>Full Stack Developer</div>

                    </td>
                    <td className="text-center">
                      Google
                      <CIcon height={25} name="cib-google" />
                    </td>
                    <td className="text-center">
                        <div>May 12, 2020</div>
                    </td>
                    <td className="text-center">
                      <div>Full Stack Developer</div>
                    </td>
                    <td>
                      <div className="small text-muted">Est.</div>
                      <strong>$82,000</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div>Frontend engineer</div>

                    </td>
                    <td className="text-center">
                      Microsoft
                      <CIcon height={25} name="cib-microsoft" />
                    </td>
                    <td className="text-center">
                      <div>Apr 14, 2020</div>
                    </td>
                    <td className="text-center">
                    <div>Full Stack Developer</div>
                    </td>
                    <td>
                      <div className="small text-muted">Est.</div>
                      <strong>$93,000</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div>Backend developer</div>

                    </td>
                    <td className="text-center">
                      LinkedIn
                      <CIcon height={25} name="cib-linkedin" />
                    </td>
                    <td className="text-center">
                      <div>$102,000</div>
                    </td>
                    <td className="text-center">
                    <div>Full Stack Developer</div>
                    </td>
                    <td>
                      <div className="small text-muted">Est.</div>
                      <strong>$105,000</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div>Cloud architect</div>
                    </td>
                    <td className="text-center">
                      IBM
                      <CIcon height={25} name="cib-yahoo" />
                    </td>
                    <td className="text-center">
                      <div>Mar 17, 2020</div>
                    </td>
                    <td className="text-center">
                    <div>Solution Architect</div>
                    </td>
                    <td>
                      <div className="small text-muted">Est.</div>
                      <strong>$95,000</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div>Solution Architect</div>
      
                    </td>
                    <td className="text-center">
                      Facebook
                      <CIcon height={25} name="cib-facebook" />
                    </td>
                    <td className="text-center">
                      <div>Mar 6, 2020</div>
                    </td>
                    <td className="text-center">
                    <div>Solution Architect</div>
                    </td>
                    <td>
                      <div className="small text-muted">Est.</div>
                      <strong>$110,000</strong>
                    </td>
                  </tr>
                </tbody>
              </table>

            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Dashboard
