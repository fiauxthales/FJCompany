import {
  Typography,
  Box,
  FormControl,
  TextField,
  OutlinedInput,
  InputLabel,
  Button,
  Snackbar,
} from "@mui/material";
import React, { useState } from "react";
import { CpfMask } from "../../utils/textMask";
import { cpf } from "cpf-cnpj-validator";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    cpf: "",
    password: "",
    confirmPassword: "",
  });
  const [alert, setAlert] = useState({ message: null, variant: null });
  const navigate = useNavigate();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
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
    } else if (values.password !== values.confirmPassword) {
      setAlert({
        message: "As senhas devem ser iguais",
        variant: "error",
      });
    } else {
      try {
        const request = {
          cpf: values.cpf.replace(/[^\d]+/g, ""),
          senha: values.password,
          nome: values.name,
        };
        const { data } = await api.post("/users", request);
        console.log(data);
        if (data.status !== 1) {
          setAlert({
            message: data.message,
            variant: "error",
          });
        } else {
          setAlert({
            message: data.message,
            variant: "sucess",
          });
          setTimeout(() => navigate("/login"), 2000);
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
          marginTop: "100px",
        }}
      >
        <Typography align="center" color="" variant="h2">
          Cadastro
        </Typography>

        <FormControl sx={{ m: 1, width: "330px" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-name">Nome</InputLabel>
          <OutlinedInput
            id="outlined-adornment-name"
            type={"text"}
            value={values.name}
            onChange={handleChange("name")}
            label="name"
          />
        </FormControl>

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
          <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={"password"}
            value={values.password}
            onChange={handleChange("password")}
            label="Password"
          />
        </FormControl>

        <FormControl sx={{ m: 1, width: "330px" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-confirmPassword">
            Confirmar Senha
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-confirmPassword"
            type={"password"}
            value={values.confirmPassword}
            onChange={handleChange("confirmPassword")}
            label="ConfirmPassword"
          />
        </FormControl>

        <Box
          sx={{ width: "330px", display: "flex", flexDirection: "row-reverse" }}
        >
          <Button variant="contained" type="submit">
            Cadastrar
          </Button>

          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={!!alert.message}
            message={alert.message}
          />
        </Box>
      </Box>
    </form>
  );
};

export default Signup;
