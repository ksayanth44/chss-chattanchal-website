import React from "react";
import Navbar from "../../../components/Navbar/NavBar";
import styles from "../../../styles/admin/teachers/dutyAllocation/DutyAllocation.module.css";
import EntryPopup from "../../../components/admin/dutyAllocation/EntryPopup";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DetailsTable from "../../../components/admin/dutyAllocation/DetailsTable";
import DeletePopup from "../../../components/admin/dutyAllocation/DeletePopup";
import Axios from "../../../../stores/Axios";
import Loader from "../../../components/common/Loader";
import { useAuth } from "../../../../stores/CheckloginAdmin";
import Hero from "../../../components/common/PageHero";

import dutyAllocationIcon from "../../../assets/images/admin/teachers/dutyAllocationIcon.png";

export default function DutyAllocation() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const [viewOn, setViewOn] = useState(false);

  // submit data

  function handleClick(optState, setSubmitMsg, submitSuccess) {
    if (optState.teacherId !== "" && optState.duty !== "") {
      Axios.post("/admin/add-duty", optState)
        .then((response) => {
          fetchTableData();
          setSubmitMsg(response.data);
          submitSuccess();
        })
        .catch((error) => {
          console.log(error.response.data);
          setSubmitMsg(error.response.data);
        });
    }
  }

  //

  function fetchTableData() {
    Axios.get("/admin/get-duties")
      .then((response) => {
        const apiData = response.data;
        if (apiData !== null) {
          const formattedData = apiData.map((item, index) => ({
            id: index + 1,
            duty_id: item._id,
            name: item.teacher.name,
            penNumber: item.teacher.penNo,
            duty: item.duty,
          }));
          setData(formattedData);
        } else {
          setData([]);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const [loading, setisLoading] = useState(false);

  useEffect(() => {
    useAuth(setisLoading, navigate);
    fetchTableData();
  }, []);

  function handleButtonClick(id) {
    Axios.delete(`/admin/delete-duty?duty=${id}`)
      .then((response) => {
        fetchTableData();
        setViewOn(true);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  return (
    <>
      <Navbar user="admin" />
      <Hero title="Duty Allocation" icon={dutyAllocationIcon} />
      <div className={styles.main}>
        <div className={styles.content}>
          <div className={styles.tableWrap}>
            <DetailsTable deleteFunction={handleButtonClick} data={data} />
          </div>
          <div className={styles.buttonWrapper}>
            <EntryPopup submit={handleClick} />
            {viewOn && <DeletePopup viewFunct={setViewOn} />}
          </div>
        </div>
      </div>
      <Loader open={loading} />
    </>
  );
}
