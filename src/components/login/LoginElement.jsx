import styles from "../../styles/login/Login.module.css";
import Loader from "../common/LoaderLogin";

export default function LoginElement(props) {
  return (
    <div className={styles.loginElement}>
      <div>
        <select
          placeholder="Select user type"
          id="usertype"
          onChange={props.changeEvent}
          value={props.userType}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>
        <span></span>
      </div>
      <span>
        <input
          id="username"
          placeholder={
            props.userType == "student"
              ? "Admission Number"
              : props.userType == "admin"
              ? "Username"
              : "Email"
          }
          value={props.userName}
          onChange={props.changeEvent}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={props.password}
          onChange={props.changeEvent}
        />
        <a href="#">Forget password?</a>
        <button className={styles.loginBtn} onClick={props.handleClick}>
          {props.loader ? (
            <div className={styles.round}>
              <Loader open={true} />
            </div>
          ) : (
            <>Login</>
          )}
        </button>
        <p id="error">{props.error}</p>
      </span>
    </div>
  );
}
