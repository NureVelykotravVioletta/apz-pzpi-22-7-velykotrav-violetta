import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/AuthFrom/AuthForm";
import { loginUser } from "../../redux/auth/operations";
import css from "./SigninPage.module.css";
import { Section } from "../../components/Section/Section";
import { Container } from "../../components/Container/Container";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SigninPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignin = (values, { setSubmitting }) => {
    dispatch(loginUser(values)).then((result) => {
      if (loginUser.fulfilled.match(result)) {
        navigate("/home"); // Redirect to HomePage
      }
      setSubmitting(false);
    });
  };

  return (
    <Section className={css.sectionForm}>
      <Container className={css.resetPasswordContainer}>
        <div className={css.titleFormThumb}>
          <h2 className={css.block_name}>Увійти</h2>
          <AuthForm type="signin" onSubmit={handleSignin} />
          <p>
            <a className={css.redirektLink} href="/reset-password">
              Забули пароль?
            </a>
          </p>
        </div>
      </Container>
      <ToastContainer position="top-right" autoClose={5000} />
      <div className={css.bottleWrapper}></div>
    </Section>
  );
};

export default SigninPage;
