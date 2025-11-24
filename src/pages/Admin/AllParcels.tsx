import { useGetAllParcelsQuery } from "../../redux/features/parcels/parcels.api";
import { Input } from "../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import type { IParcel } from "../../types/parcels.type";

const AllParcels = () => {
  const { data } = useGetAllParcelsQuery(undefined);
  console.log(data?.data?.data);
  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input placeholder="Filter emails..." className="max-w-sm" />
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              {data?.data?.data.map((parcel: IParcel, index: number) => (
                <TableCell key={index}>{parcel.type}</TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AllParcels;
