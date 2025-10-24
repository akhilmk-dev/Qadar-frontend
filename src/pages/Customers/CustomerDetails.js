import React, { useEffect, useState } from 'react';
import {
  Container, Row, Col, Card, CardBody, CardTitle, Button,
  Accordion, AccordionBody, AccordionHeader, AccordionItem, Input
} from 'reactstrap';
import CreateCustomer from './CreateCustomer'; // Ensure correct path to modal
import user from '../../../src/assets/images/user.png'
import axiosInstance from 'pages/Utility/axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';
import { formatISOToDDMMYYYY } from 'helpers/dateFormat_helper';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useDispatch } from 'react-redux';

const CustomerDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {id} = useParams();
  if(!id) {
    navigate('/pages-404')
  }
  const [open, setOpen] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [customerDetails,setCustomerDetails] = useState(false);
  const [promptHistory,setPromptHistory] = useState();
  const [loading,setLoading]= useState(false);

  const fetchCustomer = async()=>{
    try {
        if(!loading){
        setLoading(true);
        const response = await axiosInstance.get(`V1/customers/${id}`)
        if(!response?.data?.data){
            navigate('/pages-404');
        }
        setCustomerDetails(response?.data?.data);
        setLoading(false);
        }
    } catch (error) {
        setLoading(false);
        console.log(error);
    }
  }

  const fetchCustomerHistory = async()=>{
    try {
        const response = await axiosInstance.get(`V1/prompt/customer-prompt-history/${id}`);
        if(response?.data?.data){
            setPromptHistory(response?.data?.data);
        }
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(()=>{
    fetchCustomer();
    fetchCustomerHistory();
  },[])

  const toggleAccordion = (id) => {
    setOpen(open === id ? '' : id);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };


   const handleUserUpdate  = (id, updatedData, onClose) => {
      dispatch(updateCustomerRequest(id, data, onClose));
    };

const normalizeText = (text) => {
  if (!text) return "";
  let cleaned = text.replace(/^"|"$/g, ""); // remove quotes if wrapped
  cleaned = cleaned.replace(/\\n/g, "\n");  // convert literal \n to newline
  return cleaned;
};


  return (
    <Container className="my-4 page-content">
      {/* Profile Card */}
      <Card className="mb-3 shadow-sm">
        <CardBody className="d-flex align-items-center">
          <img
            src={user}
            alt="Profile"
            className="rounded-circle me-3"
            width="60"
          />
          <div>
            <h5 className="mb-1">{customerDetails?.customer?.name}</h5>
            <div className="text-muted">#{customerDetails?.customer?._id}</div>
            <div className="text-muted">{customerDetails?.location}</div>
          </div>
        </CardBody>
      </Card>

      {/* Personal Information */}
      <Card className="mb-3 shadow-sm">
        <CardBody>
          <div className="d-flex justify-content-between align-items-end ">
            <h5 tag="h2">Personal Information</h5>
            <Button  style={{backgroundImage:"linear-gradient(to right, #c56797, #ffc250)", }} px={4}  size="md" onClick={() => setShowModal(true)}>
              Edit
            </Button>
          </div>
          <hr style={{marginTop:"4px"}}/>
          <Row>
            <Col md="3">
              <div className="mb-3">
                <label className="form-label fw-bold">Full Name</label>
                <p className="form-control-plaintext">{customerDetails?.customer?.name}</p>
              </div>
            </Col>
            <Col md="3">
              <div className="mb-3">
                <label className="form-label fw-bold">Date of Birth</label>
                <p className="form-control-plaintext">{formatISOToDDMMYYYY(customerDetails?.customer?.date_of_birth)}</p>
              </div>
            </Col>
            <Col md="3">
              <div className="mb-3">
                <label className="form-label fw-bold">Email ID</label>
                <p className="form-control-plaintext">{customerDetails?.customer?.email}</p>
              </div>
            </Col>
            <Col md="3">
              <div className="mb-3">
                <label className="form-label fw-bold">Phone Number</label>
                <p className="form-control-plaintext">{customerDetails?.customer?.phone}</p>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>

      {/* History Section */}
      <Card className="shadow-sm">
        <CardBody>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>History</h5>
            <Input type="select" style={{ width: '200px' }}>
              <option>Select Category</option>
              <option value="Palm Reading">Palm Reading</option>
              <option value="Coffe Cup">Coffe Cup</option>
            </Input>
          </div>
          <Accordion  open={open} toggle={toggleAccordion}>
            {promptHistory?.map(item=>(item?.prompts)).flat().map((item,index) => (
              <AccordionItem key={index} className="mb-2 border">
                <AccordionHeader targetId={`${index}`} >
                 {item?.question}
                </AccordionHeader>
                <AccordionBody accordionId={`${index}`}>
                 <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {normalizeText(item?.answer)}
                </ReactMarkdown>
                </AccordionBody>
              </ AccordionItem>
            ))}
          </Accordion>
        </CardBody>
      </Card>

      {/* Edit Modal */}
      <CreateCustomer
        visible={showModal}
        handleClose={handleModalClose}
        initialData={{
          name: customerDetails?.customer?.name,
          email: customerDetails?.customer?.email,
          phone: customerDetails?.customer?.phone,
          date_of_birth: customerDetails?.customer?.date_of_birth
        }}
        onSubmit={handleUserUpdate}
      />
    </Container>
  );
};

export default CustomerDetails;
