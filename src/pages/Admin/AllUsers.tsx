import { useGetAllUsersQuery } from "../../redux/features/auth/auth.api";

const AllUsers = () => {
  const { data } = useGetAllUsersQuery(undefined);
  console.log(data);
  return <div>All users</div>;
};

export default AllUsers;
