import { useEffect, useRef, useState } from "react";
import LoginForm from "../forms/LoginForm";
import RegisterForm from "../forms/RegisterForm";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [allUsers, setAllUsers] = useState(
    JSON.parse(localStorage.getItem("allUsers")) || []
  );
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || {}
  );
  const navigate = useNavigate();

  function loginHandler({ email, password }, { emailError, passwordError }) {
    passwordError.style.display = "none";
    emailError.style.display = "inline-block";

    for (let i = 0; i < allUsers.length; i++) {
      if (email === allUsers[i].email && password === allUsers[i].password) {
        const currUser = allUsers[i];

        setCurrentUser(currUser);
        localStorage.setItem("currentUser", JSON.stringify(currUser));

        break;
      } else if (
        email === allUsers[i].email &&
        password !== allUsers[i].password
      ) {
        emailError.style.display = "none";
        passwordError.style.display = "inline-block";

        break;
      }
    }
  }

  function registerHandler(
    { name, surname, email, reemail, password, repassword },
    {
      nameError,
      surnameError,
      emailError,
      reemailError,
      passwordError,
      repasswordError,
    }
  ) {
    let isValid = true;

    for (let i = 0; i < allUsers.length; i++) {
      if (allUsers[i].email === email) {
        emailError.style.display = "inline-block";
        isValid = false;
        break;
      } else {
        emailError.style.display = "none";
      }
    }

    if (name.length < 2) {
      nameError.style.display = "inline-block";
      isValid = false;
    } else {
      nameError.style.display = "none";
    }

    if (surname.length > 0 && surname.length < 2) {
      surnameError.style.display = "inline-block";
      isValid = false;
    } else {
      surnameError.style.display = "none";
    }

    if (email !== reemail) {
      reemailError.style.display = "inline-block";
      isValid = false;
    } else {
      reemailError.style.display = "none";
    }

    if (password.length < 8) {
      passwordError.style.display = "inline-block";
      isValid = false;
    } else {
      passwordError.style.display = "none";
    }

    if (password !== repassword) {
      repasswordError.style.display = "inline-block";
      isValid = false;
    } else {
      repasswordError.style.display = "none";
    }

    if (isValid) {
      const updatedUsers = JSON.parse(localStorage.getItem("allUsers")) || [];
      const validUser = {
        name,
        surname,
        email,
        password,
        rentedMovies: [],
      };

      updatedUsers.push(validUser);

      setCurrentUser(validUser)
      localStorage.setItem("currentUser", JSON.stringify(validUser));

      setAllUsers(updatedUsers);
      localStorage.setItem("allUsers", JSON.stringify(updatedUsers));
    }
  }

  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      navigate("/", { replace: true });
    }
  });

  return (
    <>
      <LoginForm onLogin={loginHandler} />
      <RegisterForm onRegister={registerHandler} />
    </>
  );
};

export default LoginPage;
