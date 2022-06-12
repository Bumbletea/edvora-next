import {
  Button,
  Divider,
  makeStyles,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import RideCard from "../ridecard/ridecard";
import { IRide } from "../utils/types";
import FilterListIcon from "@mui/icons-material/FilterList";
const TabItem: React.FC<{ children: string[] | string }> = ({ children }) => {
  return (
    <p
      style={{
        color: "#D0CBCB",
        fontWeight: "700",
        fontSize: "18px",
        textTransform: "none",
      }}
    >
      {children}
    </p>
  );
};
const Rides: React.FC<{
  rides: IRide[];
  locations: { state: string; cities: string[] }[];
}> = ({ rides, locations }) => {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [filterOpen, setFilterOpen] = useState(false);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState(-1);
  const [selectedCity, setSelectedCity] = useState(-1);
  useEffect(() => {
    if (selectedState != -1) {
      setCities(
        locations.filter((x) => x.state == locations[selectedState].state)[0]
          .cities
      );
    } else {
      setCities(locations.map((x) => x.cities).flat());
    }
  }, [selectedState]);
  const rides_count = useMemo(() => {
    return {
      upcoming: rides.filter((x) => {
        return new Date(x.date) > new Date();
      }).length,
      past: rides.filter((x) => {
        return new Date(x.date) < new Date();
      }).length,
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "10px",
        gap: "1rem",
      }}
    >
      <div
        style={{
          width: "95%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <Tabs
            value={currentTab}
            onChange={(x, y) => {
              setCurrentTab(y);
            }}
            style={{ color: "white" }}
            TabIndicatorProps={{ style: { backgroundColor: "#D0CBCB" } }}
          >
            <Tab disableRipple label={<TabItem>Nearest rides </TabItem>} />
            <Tab
              disableRipple
              label={<TabItem>Upcoming rides ({rides_count.upcoming.toString()})</TabItem>}
            />
            <Tab
              disableRipple
              label={<TabItem>Past rides ({rides_count.past.toString()})</TabItem>}
            />
          </Tabs>
        </div>
        <div style={{ position: "relative" }}>
          <Button
            onClick={() => {
              setFilterOpen((x) => !x);
            }}
          >
            <p
              style={{ fontSize: "16px", fontWeight: "500", color: "#F2F2F2" }}
            >
              {" "}
              <FilterListIcon style={{ position: "relative", top: "5" }} />{" "}
              Filter{" "}
            </p>
          </Button>
          <div
            style={{
              position: "absolute",
              height: "190px",
              width: "228px",
              background: "#131313",
              borderRadius: "15px",
              right: "0",
              display: filterOpen ? "block" : "none",
            }}
          >
            <div style={{ margin: "30px" }}>
              <p
                style={{
                  color: "#A5A5A5",
                  fontSize: "20px",
                  fontWeight: "300",
                }}
              >
                Filters{" "}
              </p>
              <div
                style={{
                  height: "1px",
                  backgroundColor: "#CBCBCB",
                  marginTop: "12px",
                  marginBottom: "20px",
                }}
              ></div>
              <TextField
                fullWidth
                select
                style={{ marginBottom: "12.5px" }}
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(Number(e.target.value));
                  setSelectedCity(-1);
                }}
                SelectProps={{
                  sx: {
                    backgroundColor: "#232323",
                    height: "37.5px",
                    color: "white",
                  },
                }}
              >
                <MenuItem value={-1}>Please Select an Item</MenuItem>
                {locations.map((x, index) => {
                  return (
                    <MenuItem key={index} value={index}>
                      {x.state}
                    </MenuItem>
                  );
                })}
              </TextField>
              <TextField
                fullWidth
                select
                value={selectedCity}
                onChange={(e) => {
                  setSelectedCity(Number(e.target.value));
                }}
                SelectProps={{
                  sx: {
                    backgroundColor: "#232323",
                    height: "37.5px",
                    color: "white",
                  },
                }}
              >
                <MenuItem value={-1}>Please Select an Item</MenuItem>
                {cities.map((x, index) => {
                  return (
                    <MenuItem key={index} value={index}>
                      {x}
                    </MenuItem>
                  );
                })}
              </TextField>
            </div>
          </div>
        </div>
      </div>
      {rides
        .filter((x) => {
          if (selectedCity !== -1) {
            return x.city == cities[selectedCity];
          }
          if (selectedState !== -1) {
            return x.state == locations[selectedState].state;
          }
          return true;
        })
        .filter((x) => {
          if (currentTab == 0) return true;
          if (currentTab == 1) return new Date(x) > new Date();
          if (currentTab == 2) return new Date() > new Date(x);
        })
        .map((x, index) => (
          <RideCard key={index} ride={x} />
        ))}
    </div>
  );
};
export default Rides;
