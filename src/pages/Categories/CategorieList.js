import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import { fetchCategoriesRequest } from 'store/actions';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from 'components/Common/Breadcrumb2';
import CategoryTable from './CategorieTable';

const CategoryList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories = useSelector((state) => state.Category.categories);
  const loading = useSelector((state) => state.Category.loading);
  const error = useSelector((state) => state.Category.error);

  const permissions = JSON.parse(localStorage.getItem('permissions'));
  const hasAddPermission = permissions?.some(
    (item) => item?.permission_name === 'Category Add'
  );

  const handleAddNew = () => navigate('/createCategory');
  const handleEdit = (id) => navigate(`/createCategory?id=${id}`);

  return (
    <div className="page-content container-fluid">
      {/* Header */}
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
            onClick={handleAddNew}
          >
            <i className="ti-plus"></i> Add New
          </Button>
        )}
      </div>

      {/* Table */}
      <CategoryTable
        categories={categories?.data || []}
        totalrows={categories?.total}
        loading={loading}
        error={error}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default CategoryList;
