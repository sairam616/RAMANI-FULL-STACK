import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { getOnboardingDetails } from "./onboarding-api";
import { useHistory } from "react-router-dom";
import "./Onboarding.css";
import {
    Grid,
    Box,
    Button,
    FormControl,
    TextField,
    FormLabel,
    FormHelperText,
} from "@material-ui/core";
import { OnboardingContext } from "./Context/OnboardingContext";

function Onboarding1() {
    const history = useHistory();
    const { details, setDetails } = useContext(OnboardingContext);
    const [nameErrorMessage, setNameErrorMessage] = useState({});
    const [countryErrorMessage, setCountryErrorMessage] = useState({});

    const [formProperties, setFormProperties] = useState({
        first_name: "",
        first_label: "",
        first_type: "",
        first_required: "",
        last_name: "",
        last_label: "",
        last_type: "",
        bio_name: "",
        bio_label: "",
        bio_type: "",
        country_name: "",
        country_label: "",
        country_type: "",
        country_required: "",
    });
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        bio: "",
        country: "",
    });

    useEffect(() => {
        getOnboardingDetails()
            .then((data) => {
                setFormProperties({
                    first_name: data.steps[0][0].name,
                    first_label: data.steps[0][0].label,
                    first_type: data.steps[0][0].type,
                    first_required: data.steps[0][0].required,
                    last_name: data.steps[0][1].name,
                    last_label: data.steps[0][1].label,
                    last_type: data.steps[0][1].type,
                    bio_name: data.steps[0][2].name,
                    bio_label: data.steps[0][2].label,
                    bio_type: data.steps[0][2].type,
                    country_name: data.steps[1][0].name,
                    country_label: data.steps[1][0].label,
                    country_type: data.steps[1][0].type,
                    country_required: data.steps[1][0].required,
                });
                setFormData({
                    firstName: details.firstName,
                    lastName: details.lastName,
                    country: details.country,
                    bio: details.bio,
                })

            });
    }, [details]);

    const handleOnboarding1 = async (e) => {
        e.preventDefault();
        const form1 = e.currentTarget;
        const formElements1 = form1.elements;
        const firstName = formElements1.firstName.value;
        const lastName = formElements1.lastName.value;
        const country = formElements1.country.value;
        const bio = formElements1.bio.value;

        setDetails({ ...details, firstName, lastName, country, bio });

        if (formProperties.first_required && firstName.length === 0) {
            setNameErrorMessage({ message: "First Name is Required" });
            return;
        }
        if (formProperties.country_required && country.length === 0) {
            setCountryErrorMessage({ message: "Country is Required" });
            return;
        }
        history.push("/onboarding2");

    };
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    return (
        <Grid className="mainForm">
            <Box className="box">
                <form onSubmit={handleOnboarding1}>
                    <Grid>
                        <Grid>
                            <FormLabel>
                                {formProperties.first_label}
                            </FormLabel>
                            <br></br>
                            <FormControl error={!!nameErrorMessage.message} >
                                <TextField className="FormControl"
                                    name={formProperties.first_name}
                                    type={formProperties.first_type}
                                    value={formData.firstName}
                                    onChange={(e) => onChange(e)}
                                />
                                <FormHelperText className="errorText">
                                    {nameErrorMessage.message}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <br></br>
                        <Grid>
                            <FormLabel>
                                {formProperties.last_label}
                            </FormLabel>
                            <br></br>
                            <FormControl>
                                <TextField className="FormControl"
                                    type={formProperties.last_type}
                                    name={formProperties.last_name}
                                    value={formData.lastName}
                                    onChange={(e) => onChange(e)}
                                />
                            </FormControl>
                        </Grid>
                        <br></br>
                        <Grid>
                            <FormLabel>
                                {formProperties.country_label}
                            </FormLabel>
                            <br></br>

                            <FormControl error={!!countryErrorMessage.message} >
                                <TextField className="FormControl"
                                    type={formProperties.country_type}
                                    name={formProperties.country_name}
                                    value={formData.country}
                                    onChange={(e) => onChange(e)}
                                />
                                <FormHelperText className="errorText">
                                    {countryErrorMessage.message}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <br></br>
                        <Grid>
                            <FormLabel>
                                {formProperties.bio_label}
                            </FormLabel>
                            <br></br>
                            <FormControl>
                                <textarea className="textAreaControl"
                                    type={formProperties.bio_type}
                                    rows={3}
                                    name={formProperties.bio_name}
                                    value={formData.bio}
                                    onChange={(e) => onChange(e)}
                                />
                            </FormControl>
                        </Grid>
                        <br></br>
                        <Button type="submit" variant="contained" size="medium" className="button">
                            Next
                        </Button>
                    </Grid>
                </form>
            </Box>
        </Grid >
    );
};
export default Onboarding1; 