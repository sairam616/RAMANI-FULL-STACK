import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { getOnboardingDetails } from "./onboarding-api";
import { useHistory } from "react-router-dom";
import { saveOnboardingDetails } from "./onboarding-api";
import "./Onboarding.css";
import {
    Grid,
    Box,
    FormGroup,
    FormControlLabel,
    Switch,
} from "@material-ui/core";
import Button from "react-bootstrap/Button";
import { ButtonGroup } from "react-bootstrap";
import { OnboardingContext } from "./Context/OnboardingContext";

function Onboarding2() {

    const { details, setDetails } = useContext(OnboardingContext);

    const history = useHistory();

    const [formProperties, setFormProperties] = useState({
        notifications_name: "",
        notifications_label: "",
        notifications_type: "",
        notifications_required: "",
        updates_name: "",
        updates_label: "",
        updates_type: "",
        updates_required: "",
    });
    const [formValues, setFormValues] = useState({
        receiveNotifications: false,
        receiveUpdates: false,
    });


    useEffect(() => {
        getOnboardingDetails()
            .then((data) => {
                setFormProperties({
                    notifications_name: data.steps[1][1].name,
                    notifications_label: data.steps[1][1].label,
                    notifications_type: data.steps[1][1].type,
                    notifications_required: data.steps[1][1].required,
                    updates_name: data.steps[1][2].name,
                    updates_label: data.steps[1][2].label,
                    updates_type: data.steps[1][2].type,
                    updates_required: data.steps[1][2].required,
                });
                setFormValues({
                    receiveNotifications: details.receiveNotifications,
                    receiveUpdates: details.receiveUpdates,
                })
            });
    }, [details]);

    const handleOnboarding2 = async (e) => {
        e.preventDefault();

        const result = saveOnboardingDetails(details);

        if (result) {
            history.push("/home");
        }
    };

    const handleBackButton = async (event) => {
        event.preventDefault();
        history.goBack();
    };
    const onChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.checked });
    };

    return (
        <Grid className="mainForm2">
            <Box className="box2">
                <form onSubmit={handleOnboarding2}>
                    <Grid>
                        <Grid>
                            <FormGroup>
                                <FormControlLabel control={<Switch />} label={formProperties.notifications_label} name={formProperties.notifications_name} type={formProperties.notifications_type} onChange={(e) => onChange(e)} checked={formValues.receiveNotifications} />
                            </FormGroup>
                        </Grid>
                        <br></br>
                        <Grid>
                            <FormGroup>
                                <FormControlLabel control={<Switch />} label={formProperties.updates_label} name={formProperties.updates_name} type={formProperties.updates_type} onChange={(e) => onChange(e)} checked={formValues.receiveUpdates} />
                            </FormGroup>
                            <br></br>
                        </Grid>
                        <br></br>
                        <ButtonGroup className="backbutton">
                            <Button type="button" variant="primary" onClick={handleBackButton}>
                                Back
                            </Button>
                        </ButtonGroup>
                        <ButtonGroup className="finishbutton">
                            <br></br>
                            <Button type="submit" variant="primary" >
                                Finish
                            </Button>
                        </ButtonGroup>
                    </Grid>
                </form>
            </Box>
        </Grid >
    );
};
export default Onboarding2; 