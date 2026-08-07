import { useEffect, useState, useCallback } from "react";

import { getUsers } from "../services/adminUserService";

import DataToolbar from "../components/common/DataToolbar";
import UserStats from "../components/users/UserStats";
import UsersTable from "../components/users/UsersTable";
import UserDetailsModal from "../components/users/UserDetailsModal";
import EditUserDrawer from "../components/users/EditUserDrawer";
import SuspendUserModal from "../components/users/SuspendUserModal";
import ReactivateUserModal from "../components/users/ReactivateUserModal";
import DeleteUserModal from "../components/users/DeleteUserModal";
import RestoreUserModal from "../components/users/RestoreUserModal";
import Pagination from "../components/common/Pagination";
// import Pagination from "../components/common/Pagination";

const Users = () => {

  const [

selectedUser,

setSelectedUser

]=useState(null);

const [editOpen, setEditOpen] = useState(false);
const [reactivateOpen, setReactivateOpen] = useState(false);
const [deleteOpen, setDeleteOpen] = useState(false);
const [restoreOpen, setRestoreOpen] = useState(false);

const [

detailsOpen,

setDetailsOpen

]=useState(false);

  const [users, setUsers] = useState([]);

  const [stats, setStats] = useState(null);

  const [loading, setLoading] = useState(false);

  const [suspendOpen, setSuspendOpen] = useState(false);
  const [pagination, setPagination] = useState({});

  const [filters, setFilters] = useState({

    search: "",

    role: "",

    status: "",

    sort: "newest",

    page: 1,

    limit: 10,

  });

  const fetchUsers = useCallback(async () => {

    try {

      setLoading(true);

      const data = await getUsers(filters);

      setUsers(data.users || []);

      setStats(data.stats || null);

setPagination(data.pagination);
    }

    catch (error) {

      console.error(error);

    }

    finally {

      setLoading(false);

    }

  }, [filters]);

  useEffect(() => {

    fetchUsers();

  }, [fetchUsers]);

  const refreshUsers = (updatedUser = null) => {

  if (updatedUser) {

    setUsers((prev) =>
      prev.map((u) =>
        u._id === updatedUser._id
          ? updatedUser
          : u
      )
    );

    return;
  }

  fetchUsers();

};

  const handleFilterChange = (field, value) => {

    setFilters((prev) => ({

      ...prev,

      [field]: value,

      page: 1,

    }));

  };

  const handlePageChange = (page) => {

    setFilters((prev) => ({

      ...prev,

      page,

    }));

  };

  return (

    <div className="space-y-8">

      <DataToolbar

        title="Users Management"

        subtitle="Manage every account registered on LapVerse."

        search={filters.search}

        onSearchChange={(value)=>

          handleFilterChange(
            "search",
            value
          )

        }

        loading={loading}

        filters={[

          {

            name: "role",

            value: filters.role,

            onChange: (value)=>

              handleFilterChange(
                "role",
                value
              ),

            options: [

              {
                label: "All Roles",
                value: "",
              },

              {
                label: "User",
                value: "user",
              },

              {
                label: "Seller",
                value: "seller",
              },

              {
                label: "Admin",
                value: "admin",
              },

            ],

          },

          {

            name: "status",

            value: filters.status,

            onChange: (value)=>

              handleFilterChange(
                "status",
                value
              ),

            options: [

              {
                label: "All Status",
                value: "",
              },

              {
                label: "Active",
                value: "active",
              },

              {
                label: "Deletion Requested",
                value: "deletion_requested",
              },

            ],

          },

          {

            name: "sort",

            value: filters.sort,

            onChange: (value)=>

              handleFilterChange(
                "sort",
                value
              ),

            options: [

              {
                label: "Newest",
                value: "newest",
              },

              {
                label: "Oldest",
                value: "oldest",
              },

              {
                label: "Name A-Z",
                value: "az",
              },

              {
                label: "Name Z-A",
                value: "za",
              },

            ],

          },

        ]}

      />

      {stats && (

        <UserStats

          overview={stats}

        />

      )}

<UsersTable
    users={users}
    loading={loading}
    refreshUsers={fetchUsers}

    onView={(user) => {

        setSelectedUser(user);

        setDetailsOpen(true);

    }}

    onEdit={(user) => {

        setSelectedUser(user);

        setEditOpen(true);

    }}

    onSuspend={(user) => {

        setSelectedUser(user);

        setSuspendOpen(true);

    }}

    onReactivate={(user)=>{

    setSelectedUser(user);

    setReactivateOpen(true);

}}
onDelete={(user) => {

    setSelectedUser(user);

    setDeleteOpen(true);

}}

onRestore={(user)=>{

    setSelectedUser(user);

    setRestoreOpen(true);

}}

/>

<UserDetailsModal

open={detailsOpen}

user={selectedUser}

onClose={()=>{

setDetailsOpen(false);

setSelectedUser(null);

}}

onEdit={(user) => {

        setSelectedUser(user);

        setEditOpen(true);

    }}


/>

<EditUserDrawer

    open={editOpen}

    user={selectedUser}

    onUpdated={refreshUsers}

    onClose={() => {

        setEditOpen(false);

        setSelectedUser(null);

    }}

/>

<SuspendUserModal

    open={suspendOpen}

    user={selectedUser}

    onClose={() => {

        setSuspendOpen(false);

        setSelectedUser(null);

    }}

    onUpdated={(updatedUser)=>{

    setUsers(prev=>

        prev.map(user=>

            user._id===updatedUser._id

                ? updatedUser

                : user

        )

    );

}}

/>

<ReactivateUserModal

    open={reactivateOpen}

    user={selectedUser}

    onClose={() => {

        setReactivateOpen(false);

        setSelectedUser(null);

    }}

    onUpdated={(updatedUser) => {

        setUsers(prev =>

            prev.map(item =>

                item._id === updatedUser._id

                    ? updatedUser

                    : item

            )

        );

    }}

/>

<DeleteUserModal

    open={deleteOpen}

    user={selectedUser}

    onClose={() => {

        setDeleteOpen(false);

        setSelectedUser(null);

    }}

onUpdated={(updatedUser) => {

    setUsers(prev =>
        prev.map(item =>
            item._id === updatedUser._id
                ? {
                    ...item,
                    ...updatedUser,
                }
                : item
        )
    );

}}
/>

<RestoreUserModal

    open={restoreOpen}

    user={selectedUser}

    onClose={()=>{

        setRestoreOpen(false);

        setSelectedUser(null);

    }}

    onUpdated={(updatedUser)=>{

        setUsers(prev =>

            prev.map(item =>

                item._id === updatedUser._id

                    ? {

                        ...item,

                        ...updatedUser,

                    }

                    : item

            )

        );

    }}

/>
      <Pagination
    page={filters.page}
    pages={pagination.pages || 1}
    total={pagination.total || 0}
    limit={filters.limit}
    onPageChange={handlePageChange}
/>

    </div>

  );

};

export default Users;