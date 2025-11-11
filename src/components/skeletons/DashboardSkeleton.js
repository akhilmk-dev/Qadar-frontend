import React from 'react';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const DashboardSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
      <Container className="my-4 page-content container-fluid">
        {/* Header */}
        <h4 className="mb-2">
          <Skeleton width={180} height={24} />
        </h4>
        <p className="text-muted mb-4">
          <Skeleton width={120} height={16} />
        </p>

        {/* Stats cards */}
        <Row className="mb-1">
          {[1, 2, 3, 4].map((i) => (
            <Col md="3" key={i} className="mb-2">
              <Card className="shadow-sm" style={{ height: '150px' }}>
                <CardBody className="d-flex flex-column align-items-start justify-content-start py-4">
                  <Skeleton width={80} height={30} style={{ marginBottom: '10px' }} />
                  <Skeleton width={120} height={15} />
                  <div
                    className=""
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      background: 'linear-gradient(90deg, #ececec 25%, #f5f5f5 50%, #ececec 75%)',
                      backgroundSize: '200% 100%',
                      animation: 'wave 1.6s linear infinite',
                      marginBottom:'30px'
                    }}
                  />
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Charts */}
        <Row>
          {/* Line chart */}
          <Col md="6" className="mb-3">
            <Card className="shadow-sm">
              <CardBody style={{ height: '500px', paddingBottom: '50px' }}>
                <h5 className="mb-3">
                  <Skeleton width={150} height={20} />
                </h5>
                <Skeleton height={400} width="100%" />
              </CardBody>
            </Card>
          </Col>

          {/* Pie chart */}
          <Col md="6" className="mb-3">
            <Card className="shadow-sm">
              <CardBody style={{ height: '500px' }}>
                <h5 className="mb-3">
                  <Skeleton width={180} height={20} />
                </h5>
                <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                  <div
                    style={{
                      width: '250px',
                      height: '250px',
                      borderRadius: '50%',
                      background: 'linear-gradient(90deg, #ececec 25%, #f5f5f5 50%, #ececec 75%)',
                      backgroundSize: '200% 100%',
                      animation: 'wave 1.6s linear infinite',
                    }}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Wave animation */}
      <style jsx="true">{`
        @keyframes wave {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </SkeletonTheme>
  );
};

export default DashboardSkeleton;
