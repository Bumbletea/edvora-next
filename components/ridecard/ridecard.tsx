import { Card, CardContent, Chip } from "@mui/material";
import Image from "next/image";
import { useMemo } from "react";
import { IRide } from "../utils/types";
interface IDataFieldProps {
  fieldName: string;
  fieldValue: string | number;
}
const DataField: React.FC<IDataFieldProps> = ({ fieldName, fieldValue }) => {
  return (
    <div style={{ marginTop: "2px", marginBottom: "6px" }}>
      <span style={{ fontWeight: "500", fontSize: "18px", color: "#CFCFCF" }}>
        {fieldName} :{" "}
      </span>{" "}
      <span style={{ color: "white", fontWeight: "700", fontSize: "18px" }}>
        {fieldValue}
      </span>
    </div>
  );
};
interface IRideCardProps {
  ride: IRide;
}

const RideCard: React.FC<IRideCardProps> = ({ ride }) => {

  let date = useMemo(() => {
    return new Date(ride.date);
  }, []);
  return (
    <>
      <Card
        style={{
          display: "flex",
          backgroundColor: "#171717",
          borderRadius: "10px",
          width: "95%",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <div>
          <Image
            src={ride.map_url}
            width="296px"
            height="170px"
            style={{ borderRadius: "10px" }}
            alt="Map"
          />
        </div>
        <div style={{ flex: "2 1 0", marginLeft: "44px", color: "#CFCFCF" }}>
          <DataField fieldName="Ride Id" fieldValue={ride.id} />
          <DataField
            fieldName="Origin Station"
            fieldValue={ride.origin_station_code}
          />
          <DataField
            fieldName="station_path"
            fieldValue={"[" + ride.station_path.toString() + "]"}
          />
          <DataField
            fieldName="Date"
            fieldValue={date.toLocaleString('default',{month : "long",day : "numeric",year : "numeric",hour : "numeric",minute : "numeric"})}
          />
          <DataField fieldName="Distance" fieldValue={ride.distance} />
        </div>
        <div style={{ alignSelf: "flex-start" }}>
          <Chip
            label={ride.city}
            style={{ backgroundColor: "black", marginRight: "44px" }}
            color="default"
            variant="filled"
            sx={{
              "& .MuiChip-label": {
                color: "white",
              },
            }}
          />
          <Chip
            label={ride.state}
            style={{ backgroundColor: "black" }}
            color="default"
            variant="filled"
            sx={{
              "& .MuiChip-label": {
                color: "white",
              },
            }}
          />
        </div>
      </Card>
    </>
  );
};
export default RideCard;
