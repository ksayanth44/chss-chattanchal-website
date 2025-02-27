import NavBar from "../../components/Navbar/NavBar";
import styles from "../../styles/admin/admission/Admission.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../stores/CheckloginTeacher";
import Axios from "../../../stores/Axios";
import Loader from "../../components/common/Loader";
import Breadcrumbs from "../../components/common/BreadCrumbs";
import newAdmissionIcon from "../../assets/images/admission/admissionIcon.png";
import studentDetailsIcon from "../../assets/images/admission/studentDetailsIcon.png";
import importStudentsIcon from "../../assets/images/admission/importIcon.png";
import confirmationIcon from "../../assets/images/admission/confirmIcon.png";
import reportIcon from "../../assets/images/admission/reportIcon.png";

export default function Admission() {
  const navigate = useNavigate();
  const [duties, setDuties] = useState({
    verification: false,
    details: false,
  });

  const [loading, setisLoading] = useState(false);

  function CheckDuty() {
    Axios.get(`/teacher/have-duty?duty=verification`)
      .then((response) => {
        setDuties((prevState) => ({
          ...prevState,
          verification: response.data,
        }));
      })
      .catch((error) => {
        console.log(error.data);
      });
    Axios.get(`/teacher/have-duty?duty=add-details`)
      .then((response) => {
        setDuties((prevState) => ({
          ...prevState,
          details: response.data,
        }));
      })
      .catch((error) => {
        console.log(error.data);
      });
  }

  useEffect(() => {
    useAuth(setisLoading, navigate);
    CheckDuty();
  }, []);

  return (
    <>
      <NavBar user="teacher" />
      <div className={styles.breadcrumb}>
        <Breadcrumbs />
      </div>
      <div className={styles.main}>
        <div className={styles.container}>
          <div className={styles.items}>
            {duties.details && (
              <div
                className={styles.item}
                onClick={() => {
                  navigate("/teacher/admission/new-admission");
                }}
              >
                <span>
                  <img src={newAdmissionIcon} width="80px" height="80px" />
                </span>
                <h1>New Admission</h1>
              </div>
            )}
            <div
              className={styles.item}
              onClick={() => {
                navigate("/teacher/admission/student-details");
              }}
            >
              <span>
                <img src={studentDetailsIcon} width="80px" height="80px" />
              </span>
              <h1>Student details</h1>
            </div>
            <div
              className={styles.item}
              onClick={() => {
                navigate("/teacher/admission/import-students");
              }}
            >
              <span>
                <img src={importStudentsIcon} width="80px" height="80px" />
              </span>
              <h1>Import Students</h1>
            </div>

            {duties.verification && (
              <div
                className={styles.item}
                onClick={() => {
                  navigate("/teacher/admission/verification");
                }}
              >
                <span>
                  <img src={confirmationIcon} width="80px" height="80px" />
                </span>
                <h1>Verification</h1>
              </div>
            )}
            <div
              className={styles.item}
              onClick={() => {
                navigate("/teacher/admission/report");
              }}
            >
              <span>
                <img src={reportIcon} width="80px" height="80px" />
              </span>
              <h1>Report</h1>
            </div>
          </div>
        </div>
      </div>
      <Loader open={loading} />
    </>
  );
}
