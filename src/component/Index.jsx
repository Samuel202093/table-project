import axios from "axios";
import { useState, useEffect } from "react";
import Loading from "./Loading/Loading";
import TableSection from "./Table/TableSection";
import TableDisplay from "./TableDisplay";
import { useGlobalContext } from "../context/GlobalContext";

function Index() {
  const [isLoading, setIsLoading] = useState(true);
  // const [data, setData] = useState([]);
  const [size, setSize] = useState(10)
  const {data, setData} = useGlobalContext()

  const handleFetchData = async () => {
    const response = await axios(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );
    if (response.data) {
      setIsLoading(false);
      setData(response.data);
    }
  };
  useEffect(() => {
    handleFetchData();
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      {data.length > 0 && (
        <TableDisplay>
          <TableSection size={size} />
        </TableDisplay>
      )}
    </>
  );
}

export default Index;
