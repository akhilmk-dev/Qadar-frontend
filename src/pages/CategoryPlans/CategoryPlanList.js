import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import { addCategoryPlanRequest, fetchCategoriesRequest, fetchCategoryPlansRequest } from 'store/actions'; // adjust path
import Breadcrumb from 'components/Common/Breadcrumb2';
import CategoryPlanTable from './CategoryPlanTable'; // Table component (like MoodTable)
import CreateCategoryPlan from './CreateCategoryPlan';

const CategoryPlanList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  // Redux state
  const categoryPlans = useSelector((state) => state.CategoryPlan.categoryPlans);
  const categories = useSelector((state) => state.Category.categories);
  const loading = useSelector((state) => state.CategoryPlan.loading);
  const error = useSelector((state) => state.CategoryPlan.error);

  // Permissions
  const permissions = JSON.parse(localStorage.getItem('permissions'));
  const hasAddPermission = permissions?.some(
    (item) => item?.permission_name === 'Category plan Add'
  );

   useEffect(()=>{
    dispatch(fetchCategoriesRequest({page:0,limit:1000}))
   },[])
  // Handle create/edit submit
  const handleSubmit = (data, onClose) => {
    dispatch(addCategoryPlanRequest(data, onClose));
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const categorieOptions = [];
  const planOptions = [];

  return (
    <>
      {/* Modal for creating/editing category plans */}
      <CreateCategoryPlan
        visible={isOpen}
        onSubmit={handleSubmit}
        handleClose={handleClose}
        planOptions={[]}      
        categoryOptions={[]}
      />

      <div className="page-content container-fluid">
        {/* Page header */}
        <div className="d-flex justify-content-between align-items-center mx-3">
          <Breadcrumb
            title="Category Plans"
            breadcrumbItems={[
              { title: 'Dashboard', link: '/dashboard' },
              { title: 'Category Plans', link: '#' },
            ]}
          />

          {hasAddPermission && (
            <Button
              className="bg-primary text-white d-flex justify-content-center gap-1 align-items-center"
              onClick={() => setIsOpen(true)}
            >
              <i className="ti-plus"></i> Add New
            </Button>
          )}
        </div>

        {/* CategoryPlan list table */}
        <CategoryPlanTable
          categoryPlans={categoryPlans?.data || []}
          totalrows={categoryPlans?.total}
          loading={loading}
          error={error}
          planOptions={planOptions}
          categoryOptions={categoryOptions}
        />
      </div>
    </>
  );
};

export default CategoryPlanList;
