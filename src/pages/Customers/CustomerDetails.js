import React, { useEffect, useState } from 'react';
import {
  Container, Row, Col, Card, CardBody, Button,
  Accordion, AccordionBody, AccordionHeader, AccordionItem, Input
} from 'reactstrap';
import CreateCustomer from './CreateCustomer';
import user from '../../../src/assets/images/user.png';
import axiosInstance from 'pages/Utility/axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';
import { formatISOToDDMMYYYY } from 'helpers/dateFormat_helper';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoriesRequest } from 'store/actions';

const itemsPerPage = 10; // limit

const CustomerDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  if (!id) navigate('/pages-404');

  const [open, setOpen] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [customerDetails, setCustomerDetails] = useState(false);
  const [promptHistory, setPromptHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const categories = useSelector((state) => state.Category.categories);

  // Fetch Customer Details
  const fetchCustomer = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`V1/customers/${id}`);
      if (!response?.data?.data) navigate('/pages-404');
      setCustomerDetails(response?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // ✅ Fetch Customer Prompt History with category + pagination params
  const fetchCustomerHistory = async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage,
        limit: itemsPerPage,
      });
      if (selectedCategory) {
        params.append('prompt_type', selectedCategory);
      }

      const response = await axiosInstance.get(
        `V1/prompt/customer-prompt-history/${id}?${params.toString()}`
      );

      if (response?.data?.data) {
        setPromptHistory(response.data.data);
        const total = response.data.total || 0;
        setTotalPages(Math.ceil(total / itemsPerPage));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch customer info and categories once
  useEffect(() => {
    fetchCustomer();
    dispatch(fetchCategoriesRequest());
  }, []);

  // ✅ Re-fetch history whenever category or page changes
  useEffect(() => {
    if (id) fetchCustomerHistory();
  }, [id, selectedCategory, currentPage]);

  const toggleAccordion = (id) => {
    setOpen(open === id ? '' : id);
  };

  const handleModalClose = () => setShowModal(false);

  const normalizeText = (text) => {
    if (!text) return '';
    let cleaned = text.replace(/^"|"$/g, '');
    cleaned = cleaned.replace(/\\n/g, '\n');
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
          <div className="d-flex justify-content-between align-items-end">
            <h5>Personal Information</h5>
            <Button
              style={{
                backgroundImage: 'linear-gradient(to right, #c56797, #ffc250)',
              }}
              px={4}
              size="md"
              onClick={() => setShowModal(true)}
            >
              Edit
            </Button>
          </div>
          <hr />
          <Row>
            <Col md="3">
              <label className="form-label fw-bold">Full Name</label>
              <p className="form-control-plaintext">
                {customerDetails?.customer?.name}
              </p>
            </Col>
            <Col md="3">
              <label className="form-label fw-bold">Date of Birth</label>
              <p className="form-control-plaintext">
                {formatISOToDDMMYYYY(customerDetails?.customer?.date_of_birth)}
              </p>
            </Col>
            <Col md="3">
              <label className="form-label fw-bold">Email ID</label>
              <p className="form-control-plaintext">
                {customerDetails?.customer?.email}
              </p>
            </Col>
            <Col md="3">
              <label className="form-label fw-bold">Phone Number</label>
              <p className="form-control-plaintext">
                {customerDetails?.customer?.phone}
              </p>
            </Col>
          </Row>
        </CardBody>
      </Card>

      {/* History Section */}
      <Card className="shadow-sm">
        <CardBody>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>History</h5>
            <Input
              type="select"
              value={selectedCategory}
              style={{ width: '200px' }}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All Categories</option>
              {categories?.data?.map((item) => (
                <option key={item?._id} value={item?._id}>
                  {item.category_name}
                </option>
              ))}
            </Input>
          </div>

          {/* Accordion */}
          <Accordion open={open} toggle={toggleAccordion}>
            {promptHistory?.map((item, index) =>
              item?.prompts?.map((p, i) => (
                <AccordionItem key={`${index}-${i}`} className="mb-2 border">
                  <AccordionHeader targetId={`${index}-${i}`}>
                    {p?.question}
                  </AccordionHeader>
                  <AccordionBody accordionId={`${index}-${i}`}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {normalizeText(p?.answer)}
                    </ReactMarkdown>
                  </AccordionBody>
                </AccordionItem>
              ))
            )}
          </Accordion>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-3">
              {/* Prev Button */}
              <Button
                color="secondary"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="me-2"
              >
                Prev
              </Button>

              {/* Page Numbers with Dots */}
              {(() => {
                const visiblePages = 3; // Show only 3 page buttons
                const pageButtons = [];
                const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
                const endPage = Math.min(totalPages, startPage + visiblePages - 1);

                // If not starting from page 1, show first + dots
                if (startPage > 1) {
                  pageButtons.push(
                    <Button
                      key={1}
                      color={currentPage === 1 ? "primary" : "light"}
                      size="sm"
                      onClick={() => setCurrentPage(1)}
                      className="mx-1"
                    >
                      1 
                    </Button>
                  );
                  if (startPage > 2) pageButtons.push(<span key="dots1">...</span>);
                }

                // Visible middle pages
                for (let i = startPage; i <= endPage; i++) {
                  pageButtons.push(
                    <Button
                      key={i}
                      color={currentPage === i ? "primary" : "light"}
                      size="sm"
                      onClick={() => setCurrentPage(i)}
                      className="mx-1"
                    >
                      {i}
                    </Button>
                  );
                }

                // If not ending on last page, show dots + last
                if (endPage < totalPages) {
                  if (endPage < totalPages - 1) pageButtons.push(<span key="dots2">...</span>);
                  pageButtons.push(
                    <Button
                      key={totalPages}
                      color={currentPage === totalPages ? "primary" : "light"}
                      size="sm"
                      onClick={() => setCurrentPage(totalPages)}
                      className="mx-1"
                    >
                      {totalPages}
                    </Button>
                  );
                }

                return pageButtons;
              })()}

              {/* Next Button */}
              <Button
                color="secondary"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="ms-2"
              >
                Next
              </Button>
            </div>
          )}

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
          date_of_birth: customerDetails?.customer?.date_of_birth,
          country_code: customerDetails?.customer?.country_code,
          gender: customerDetails?.customer?.gender,
          relationship_status: customerDetails?.customer?.relationship_status,
          work_status:customerDetails?.customer?.work_status
        }}
        onSubmit={(id, updatedData, onClose) =>
          dispatch(updateCustomerRequest(id, updatedData, onClose))
        }
      />
    </Container>
  );
};

export default CustomerDetails;
