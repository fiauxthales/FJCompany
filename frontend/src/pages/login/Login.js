import React, { useContext, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Icon from "../../assets/images/logo";
import TextField from "@mui/material/TextField";
import {
  FormControl,
  InputLabel,
  IconButton,
  OutlinedInput,
  InputAdornment,
  Link,
  Snackbar,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { CpfMask } from "../../utils/textMask";
import { cpf } from "cpf-cnpj-validator";
import api from "../../services/api";
import { SessionContext } from "../../context/sessionContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [values, setValues] = useState({
    cpf: "",
    password: "",
    showPassword: false,
  });
  const [alert, setAlert] = useState({ message: null, variant: null });
  const { sessao, setSessao } = useContext(SessionContext);
  const navigate = useNavigate();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setTimeout(() => setAlert({ message: null, variant: null }), 4000);
    if (!cpf.isValid(values.cpf)) {
      setAlert({
        message: "CPF inválido!",
        variant: "error",
      });
    } else if (values.password.length < 6) {
      setAlert({
        message: "Sua senha deve possuir no mínimo 6 caracteres",
        variant: "error",
      });
    } else {
      try {
        const request = {
          cpf: values.cpf.replace(/[^\d]+/g, ""),
          password: values.password,
        };
        const { data } = await api.post("/session", request);
        if (data.status === 1) {
          setSessao({
            ...sessao,
            cpf: values.cpf,
            funcao: data.funcao,
            activeSession: true,
            token: data.user_token,
          });
          navigate("/app", { replace: true });
        } else {
          setAlert({
            message: data.erro,
            variant: "error",
          });
        }
      } catch {
        setAlert({
          message: "Erro ao conectar com o servidor",
          variant: "error",
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          height: "90vh",
          minHeight: "500px",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <Box sx={{ height: "240px", width: "240px", marginTop: "100px" }}>
          <Icon />
        </Box>
        <FormControl sx={{ m: 1, width: "330px" }}>
          <CpfMask
            onChange={(e) => setValues({ ...values, cpf: e.target.value })}
          >
            {() => (
              <TextField
                id="outlined-basic"
                label="CPF"
                variant="outlined"
              ></TextField>
            )}
          </CpfMask>
        </FormControl>
        <FormControl sx={{ m: 1, width: "330px" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password-login">
            Senha
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password-login"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Box
          sx={{ width: "330px", display: "flex", flexDirection: "row-reverse" }}
        >
          <Button variant="contained" type="submit">
            Entrar
          </Button>
        </Box>
        <Box
          sx={{
            width: "330px",
            display: "flex",
            flexDirection: "row",
            gap: "5px",
            marginTop: "30px",
          }}
        >
          <Typography variant="caption">Não tem conta?</Typography>
          <Link href="/SignUp">Cadastre-se</Link>
        </Box>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={!!alert.message}
          message={alert.message}
        />
      </Box>
    </form>
  );
};

export default Login;
