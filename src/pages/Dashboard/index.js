import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import axiosInstance from 'pages/Utility/axiosInstance';
import { FaUser } from "react-icons/fa";


// Chart.js setup
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const [dashboardDetails, setDashboardDetails] = useState();
  const fetchDashboardData = async () => {
    try {
      const response = await axiosInstance.get('V1/dashboard')
      console.log(response.data)
      setDashboardDetails(response?.data?.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchDashboardData()
  }, [])
  // Dummy data
  const stats = [
    { title: 'Active User Today', value: 1244 },
    { title: 'Readings Completed', value: 1244 },
    { title: 'Top Mood Selected', value: 1244 },
    { title: 'Subscription Selected', value: 1244 },
  ];

  const moodData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Mood',
        data: [20, 80, 78, 60, 75, 15, 50, 100, 30, 95, 75, 55],
        fill: false,
        borderColor: 'rgba(128, 90, 213, 1)',
        tension: 0.4,
      },
    ],
  };

  const readingUsageData = {
    labels: ['Coffee Cup', 'Palm', 'Dream'],
    datasets: [
      {
        data: [93.73, 215.52, 91.56],
        backgroundColor: ['#8c6dfd', '#ff8c8c', '#2ac9c9'],
        hoverOffset: 4,
      },
    ],
  };

  const readingUsageOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',      
        align: 'center', 
        labels: {       
          boxWidth: 20,    
        },
      },
    },
    radius: '70%',   
  };

  return (
    <Container className="my-4 page-content container-fluid">
      <h4 className="mb-2">Hey, Super Admin</h4>
      <p className="text-muted mb-4">Welcome Back</p>

      {dashboardDetails && <Row className="mb-1">
        {dashboardDetails?.stats.map((stat, idx) => (
          <Col md="3" key={idx} className="mb-2">
            <Card className="shadow-sm">
              <CardBody className="d-flex flex-column align-items-start justify-content-start py-4">
                <h2>{stat.value}</h2>
                <p className="mb-0">{stat.title}</p>
                <div className='p-3 mt-2' style={{backgroundColor:"rgba(255, 165, 0, 0.1)",borderRadius:"50%"}}>
                  <FaUser size={25} color='orange'/>
                </div>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>}

      {dashboardDetails && <Row>
        <Col md="6" className="mb-3">
          <Card className="shadow-sm">
            <CardBody style={{ height: "500px",paddingBottom:'50px' }}>
              <h5 className="mb-3">Montly Readings</h5>
              <Line
                data={dashboardDetails?.lineChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,  
                  layout: {
                    padding: {
                      top: 30,  
                      bottom: 10
                    }
                  },
                  plugins: {
                    legend: {
                      position: 'top',
                      labels: {
                        boxWidth: 20,
                        padding: 15
                      }
                    },
                    title: {
                      display: false
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        padding: 10
                      }
                    },
                    x: {
                      ticks: {
                        padding: 10
                      }
                    }
                  }
                }}
                style={{ height: "100%", width: "100%" }}
              />

            </CardBody>
          </Card>
        </Col>

        <Col md="6" className="mb-3">
          <Card className="shadow-sm">
            <CardBody style={{ height: "500px" }} >
              <h5 className="mb-3">Reading Usage Split</h5>
              <Pie data={dashboardDetails?.pieChartData} options={readingUsageOptions} />
            </CardBody>
          </Card>
        </Col>
      </Row>}
    </Container>
  );
};

export default Dashboard;
