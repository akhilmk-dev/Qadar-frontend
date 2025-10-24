import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Breadcrumb from 'components/Common/Breadcrumb2';
import { Button } from 'reactstrap';
import CreateReward from './CreateReward';
import RewardTable from './RewardTable';
import { fetchRewardsRequest, addRewardRequest, fetchLevelsRequest } from 'store/actions';

const RewardList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const rewards = useSelector(state => state.Reward.rewards);
  const levels = useSelector(state => state.Level.levels);
  const loading = useSelector(state => state.Reward.loading);
  const error = useSelector(state => state.Reward.error);
  console.log(rewards)
  useEffect(() => {
    dispatch(fetchLevelsRequest({page:0,limit:1000}));
  }, []);

  const handleClose = () => setIsOpen(false);

  const handleSubmit = (formData, onClose) => {
    dispatch(addRewardRequest(formData, onClose));
  };

  return (
    <>
      <CreateReward visible={isOpen} handleClose={handleClose} onSubmit={handleSubmit} levels={levels?.data || []} />
      <div className="page-content container-fluid">
        <div className="d-flex justify-content-between align-items-center mx-3">
          <Breadcrumb
            title="Rewards"
            breadcrumbItems={[
              { title: 'Dashboard', link: '/dashboard' },
              { title: 'Rewards', link: '#' }
            ]}
          />
          <Button color="primary" onClick={() => setIsOpen(true)}>
            <i className="ti-plus"></i> Add New
          </Button>
        </div>

        <RewardTable
          rewards={rewards?.data || []}
          loading={loading}
          error={error}
          totalrows={rewards?.total}
          levels={levels?.data || []}
        />
      </div>
    </>
  );
};

export default RewardList;
