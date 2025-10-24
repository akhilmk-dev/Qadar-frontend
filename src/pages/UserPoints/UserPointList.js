// UserXPPointsList.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import Breadcrumb from 'components/Common/Breadcrumb2';
import UserXPPointsTable from './UserXPPointsTable';
import { getUserXPPointsRequest } from 'store/actions'; // adjust to your actual action path

const UserXPPointsList = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');

  const { data, total, loading, error } = useSelector(
    (state) => state.UserXPPoints // adjust according to your reducer name
  );

  useEffect(() => {
    dispatch(getUserXPPointsRequest({ page, limit, search }));
  }, [dispatch, page, limit, search]);

  return (
    <div className="page-content container-fluid">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mx-3">
        <Breadcrumb
          title="User XP Points"
          breadcrumbItems={[
            { title: 'Dashboard', link: '/dashboard' },
            { title: 'User XP Points', link: '#' },
          ]}
        />
      </div>

      {/* Table */}
      <UserXPPointsTable
        data={data || []}
        totalrows={total}
        loading={loading}
        error={error}
        page={page}
        limit={limit}
        setPage={setPage}
        setLimit={setLimit}
      />
    </div>
  );
};

export default UserXPPointsList;
