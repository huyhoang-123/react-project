import React from "react";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import TextField, { type TextFieldProps } from "@mui/material/TextField";
import styled from "@emotion/styled";
import { createTheme, ThemeProvider } from "@mui/material";
import background from "../../assets/images/background-LoginPage.jpg";
import CssBaseline from "@mui/material/CssBaseline";
import { Link } from 'react-router-dom';
import Button, { type ButtonProps } from "@mui/material/Button";
import { useForm, type SubmitHandler } from "react-hook-form";






// const CustomTextField = styled(TextField)<TextFieldProps>(({theme})=>({
//     width:300,

// }))

const theme = createTheme({
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          height: "100vh",
          backgroundImage: `url(${background})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          display: "flex",
          justifyContent: "center",
        },
      },
    },
    MuiStack: {
      defaultProps: {
        spacing: 3,
      },
      styleOverrides: {
        root: {
        justifyContent:'center',
          alignItems:'center',
          width:'100%',
          maxWidth:"50%",
          boxShadow: `0 5px 10px rgba(0, 0, 0, 0.2)`,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          width: 300,
        },
      },
    },
    MuiButton:{
        defaultProps:{
            disableRipple:true,
            variant:'contained',
            size:'small',
            
        },
        styleOverrides:{
            root:{
                background: `linear-gradient(45deg, #18a5a7, #bfffc7)`,
                maxHeight:"50px",
                width: 300
            }
        }
    }
  },
});



const Register = () => {
    
type regisFormType ={
    name:string,
    password:string,
    confirmpw: string
} 


const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<regisFormType>({
    defaultValues:{
    name:"",
    password:"",
    confirmpw: ""
    }
  });

  const onSubmit:SubmitHandler<regisFormType>=async(data)=>{
    console.log(data)

  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Stack component="form" onSubmit={handleSubmit(onSubmit)}>
            
            <h1>REGISTER</h1>
           
          <TextField {...register("name")} label="NAME" />
          <TextField {...register('password')} label="PASSWORD" />
          <TextField  {...register('confirmpw', {
    validate: (value: string) =>
      value === getValues("password") || "Passwords do not match"
  })} label="CONFIRM_PASSWORD"  
  error={!!errors.name}
            helperText={errors.name?.message}/>
          <p>Do you has an account? <Link to='/login'>Login</Link></p>
          <Button type="submit" >Register</Button>
        
        </Stack>
      </Container>
    </ThemeProvider>
  );
};

export default Register;
