import { Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Loading } from "../components/Loading";
import { DoctorCard } from "../components/DoctorCard";
import { doctorClient } from "../api";
import { SendChat } from "../components/modals/chat/SendChat";

export const Home = () => {
  const [isLoading, setLoading] = useState(true);
  const [approvedDoctors, setApprovedDoctors] = useState<any>([]);

  //home page display all approved doctors only
  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const { data } = await doctorClient.get(
        "get-all-approved-doctors",
      );
      if (data.success) {
        setApprovedDoctors(data.data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDoctors();
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Box>
      <DoctorCard doctors={approvedDoctors} />
      <SendChat />
    </Box>
  );
};
