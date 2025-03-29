import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {WelcomePage} from "./welcome-page/WelcomePage";
import {createTheme, responsiveFontSizes, ThemeProvider} from "@mui/material";

let theme = createTheme({
    palette: {
        primary: {
            main: '#25DAC5'
        },
    }
});
theme = responsiveFontSizes(theme);


function App() {

    return (
        <ThemeProvider theme={theme}>

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<WelcomePage/>}/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
