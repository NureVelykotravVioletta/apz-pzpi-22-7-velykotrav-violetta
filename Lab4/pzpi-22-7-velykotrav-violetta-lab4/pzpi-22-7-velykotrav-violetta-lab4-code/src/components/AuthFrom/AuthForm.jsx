import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectError, selectisLoading } from "../../redux/auth/selectors";
import Loader from "../Loader/Loader";
import css from "./AuthForm.module.css";
import icon from "../../assets/icons.svg";
import { toast } from "react-toastify";

export default function AuthForm({ type, onSubmit }) {
  const isSignup = type === "signup";
  const authError = useSelector(selectError);
  const isLoading = useSelector(selectisLoading);
  const [showPassword, setShowPassword] = useState(false);

  const createAuthErrorMessage = (authError) => {
    const errorMessage =
      typeof authError === "string" ? authError : authError.message;

    switch (errorMessage) {
      case "Unauthorized":
        return "Email or password is incorrect!";
      case "Not found":
        return "The user with this data does not exist.";
    }
  };

  useEffect(() => {
    if (authError) {
      const errorMessage = createAuthErrorMessage(authError);
      toast.error(errorMessage);
    }
  }, [authError]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .max(64, "Password is too long")
      .required("Password is required"),
    ...(isSignup && {
      repeatPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Repeat password is required"),
    }),
  });

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        ...(isSignup && { repeatPassword: "" }),
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className={css.auth_form}>
          <div className={css.form_group}>
            <label htmlFor="email">Введіть свій email:</label>
            <Field
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
              autoComplete="email"
              className={touched.email && errors.email ? css.error_input : ""}
            />
            <ErrorMessage
              name="email"
              component="div"
              className={css.input_error}
            />
          </div>

          <div className={css.form_group}>
            <label htmlFor="password">Введіть свій пароль:</label>
            <div className={css.input_wrapper}>
              <Field
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                autoComplete="current-password"
                className={
                  touched.password && errors.password ? css.error_input : ""
                }
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className={css.password_toggle}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <svg className={css.icon} width="16" height="16">
                  {showPassword ? (
                    <use href={`${icon}#icon-eye`} />
                  ) : (
                    <use href={`${icon}#icon-eye-slash`} />
                  )}
                </svg>
              </button>
            </div>
            <ErrorMessage
              name="password"
              component="div"
              className={css.input_error}
            />
          </div>

          {isSignup && (
            <div className={css.form_group}>
              <label htmlFor="repeatPassword">Повторіть пароль:</label>
              <div className={css.input_wrapper}>
                <Field
                  type={showPassword ? "text" : "password"}
                  name="repeatPassword"
                  id="repeatPassword"
                  placeholder="Repeat Password"
                  autoComplete="new-password"
                  className={
                    touched.repeatPassword && errors.repeatPassword
                      ? css.error_input
                      : ""
                  }
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className={css.password_toggle}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <svg className={css.icon} width="16" height="16">
                    {showPassword ? (
                      <use href={`${icon}#icon-eye`} />
                    ) : (
                      <use href={`${icon}#icon-eye-slash`} />
                    )}
                  </svg>
                </button>
              </div>
              <ErrorMessage
                name="repeatPassword"
                component="div"
                className={css.input_error}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || isSubmitting}
            className={css.submit_button}
          >
            {isLoading ? <Loader /> : isSignup ? "Зареєструватися" : "Увійти"}
          </button>

          {!isSignup && (
            <div className={css.link_container}>
              <a href="/signup" className={css.link}>
                Зареєструватися
              </a>
            </div>
          )}
          {isSignup && (
            <div className={css.link_container}>
              <a href="/signin" className={css.link}>
                Увійти
              </a>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
}
