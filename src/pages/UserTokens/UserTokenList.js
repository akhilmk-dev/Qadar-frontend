import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "components/Common/Breadcrumb2";
import UserTokenTable from "./UserTokenTable";
import { fetchUserTokensRequest } from "store/actions";

const UserTokenList = () => {
  const dispatch = useDispatch();
  const userTokens = useSelector((state) => state.UserToken.userTokens);
  const loading = useSelector((state) => state.UserToken.loading);
  const error = useSelector((state) => state.UserToken.error);

  useEffect(() => {
    dispatch(fetchUserTokensRequest());
  }, [dispatch]);

  return (
    <div className="page-content container-fluid">
      {/* Page header */}
      <div className="d-flex justify-content-between align-items-center mx-3">
        <Breadcrumb
          title="User Tokens"
          breadcrumbItems={[
            { title: "Dashboard", link: "/dashboard" },
            { title: "User Tokens", link: "#" },
          ]}
        />
        {/* No Add Button Here */}
      </div>
      
      {/* Token list table */}
      <UserTokenTable
        tokens={userTokens?.data || []}
        totalrows={userTokens?.total}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default UserTokenList;
