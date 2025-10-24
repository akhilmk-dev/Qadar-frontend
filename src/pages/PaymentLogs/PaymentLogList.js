import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPaymentLogsRequest } from 'store/actions';
import PaymentLogTable from './PaymentLogTable';
import Breadcrumb from 'components/Common/Breadcrumb2';

const PaymentLogList = () => {
  const dispatch = useDispatch();
  const { logs, loading, error } = useSelector((state) => state.PaymentLog);

  return (
    <div className="page-content container-fluid">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Breadcrumb
          title="Payment Logs"
          breadcrumbItems={[
            { title: 'Dashboard', link: '/dashboard' },
            { title: 'Payment Logs', link: '#' },
          ]}
        />
      </div>

      {/* Table */}
      <PaymentLogTable
        logs={logs?.data || logs} // in case response has pagination
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default PaymentLogList;
