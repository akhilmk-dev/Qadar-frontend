import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import { fetchCategoriesRequest, addCategoryRequest } from 'store/actions';
import Breadcrumb from 'components/Common/Breadcrumb2';
import CategoryTable from './CategorieTable';
import CreateCategory from './CreateCategorie';

const CategoryList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.Category.categories);
  const loading = useSelector((state) => state.Category.loading);
  const error = useSelector((state) => state.Category.error);

  const permissions = JSON.parse(localStorage.getItem('permissions'));
  const hasAddPermission = permissions?.some(
    (item) => item?.permission_name === 'Categorie Add'
  );

  const handleSubmit = (data, onClose) => {
    dispatch(addCategoryRequest(data, onClose));
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Modal for creating or editing categories */}
      <CreateCategory
        visible={isOpen}
        onSubmit={handleSubmit}
        handleClose={handleClose}
      />

      <div className="page-content container-fluid">
        {/* Page header */}
        <div className="d-flex justify-content-between align-items-center mx-3">
          <Breadcrumb
            title="Categories"
            breadcrumbItems={[
              { title: 'Dashboard', link: '/dashboard' },
              { title: 'Categories', link: '#' },
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

        {/* Category list table */}
        <CategoryTable
          categories={categories?.data || []}
          totalrows={categories?.total}
          loading={loading}
          error={error}
        />
      </div>
    </>
  );
};

export default CategoryList;
