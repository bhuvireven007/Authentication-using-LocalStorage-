import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { Typeahead } from "react-bootstrap-typeahead";
import * as Yup from "yup";
import FormikContainer from "../Components/Form/FormikContainer";
import { Container, Row, Col } from "react-bootstrap";
import AgeFieldComponent from "../Components/Form/AgeComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import ListofUser from "../Components/Form/ListofUser";
import { Link } from "react-router-dom";
export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sameAsPrimary: false,
    };
  }
  handleSameAsPrimaryChange = () => {
    this.setState((prevState) => ({
      sameAsPrimary: !prevState.sameAsPrimary,
    }));
  };

  render() {
    const radioOptions = [
      { key: "Male", value: "Male" },
      { key: "Female", value: "Female" },
      { key: "Others", value: "Others" },
    ];
    const CheckOptions = [
      { key: "Photography", value: "Photography" },
      { key: "Editing", value: "Editing" },
      { key: "Arts", value: "Arts" },
      { key: "Sports", value: "Sports" },
      { key: "Dance", value: "Dance" },
      { key: "Designing", value: "Designing" },
      { key: "Singing", value: "Singing" },
      { key: "Gymnastics", value: "Gymnastics" },
    ];

    const countries = [
      {
        name: "India",
        states: [
          {
            name: "Karnataka",
            districts: ["Bangalore", "Ranigunda", "NCR"],
          },
          {
            name: "Tamil Nadu",
            districts: ["Coimbatore", "Madurai", "Chennai", "Salem"],
          },
        ],
      },
      {
        name: "USA",
        states: [
          {
            name: "California",
            districts: ["District P", "District Q", "District R"],
          },
        ],
      },
      {
        name: "Canada",
        states: [
          {
            name: "Ontario",
            districts: ["Toronto", "Ottawa", "Mississauga"],
          },
          {
            name: "British Columbia",
            districts: ["Vancouver", "Victoria", "Burnaby"],
          },
        ],
      },
      {
        name: "Australia",
        states: [
          {
            name: "New South Wales",
            districts: ["Sydney", "Newcastle", "Wollongong"],
          },
          {
            name: "Victoria",
            districts: ["Melbourne", "Geelong", "Ballarat"],
          },
        ],
      },
    ];

    const initialValues = {
      name: "",
      lastname: "",
      email: "",
      username: "",
      password: "",
      repassword: "",
      birthDate: null,
      age: "",
      phoneNumber: "",
      radioOption: "",
      address1: "",
      address2: "",
      landmark: "",
      pincode: "",
      country: "",
      state: "",
      district: "",
      CheckOptions: [],
      secaddress1: "",
      secaddress2: "",
      seclandmark: "",
      secpincode: "",
      secondryDistrictOption: "",
      secondryStateOption: "",
      secondryCountryOption: "",
      acceptTerms: "",
    };
    const validationSchema = Yup.object({
      name: Yup.string().required("Name is required"),
      lastname: Yup.string().required("Last Name is required"),
      username: Yup.string()
        .required("User name is required")
        .matches(
          /^[a-zA-Z0-9]*$/,
          "Username cannot contain special characters"
        ),
      phoneNumber: Yup.string()
        .min(10, "Invalid No")
        .matches(/^[6-9]\d{9}$/, "Invalid Number")
        .required("Number is required"),
      email: Yup.string()
        .email("Invalid email format")
        .matches(
          /^[A-Za-z0-9._%+-]+@([A-Za-z0-9.-]+\.)+[A-Za-z]{2,4}$/,
          "Invalid email address"
        )
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters long"),
      repassword: Yup.string()
        .required("Please confirm your password")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
      birthDate: Yup.date().required("required"),
      age: Yup.string()
        .test(
          "age-validation",
          "Age must be greater than or equal to 18 years",
          (value) => {
            // Regular expression to match the format "X years Y months"
            const agePattern = /^(\d+) years (\d+) months$/;
            if (!value) return false; // If age is not provided, fail validation
            const match = value.match(agePattern);
            if (!match) return false; // If the format doesn't match
            const years = parseInt(match[1]);
            const months = parseInt(match[2]);
            if (years < 18 || (years === 18 && months === 0)) {
              return false; // Age is less than 18
            }
            return true; // Age is valid
          }
        )
        .required("Age is required"),

      radioOption: Yup.string().required("Select the Genders"),
      CheckOptions: Yup.array()
        .min(1, "Select any value")
        .required("Select any value"),
      address1: Yup.string().required("Address1 is required"),
      address2: Yup.string().required("Address2 is required"),
      landmark: Yup.string().required("LandMark is required"),
      pincode: Yup.string()
        .required("Pincode is required")
        .max(6, "Incorrect Pincode")
        .min(6, "Incorrect Pincode"),
      country: Yup.string().required("Country is required"),
      state: Yup.string().required("State is required"),
      district: Yup.string().required("District is required"),
      secaddress1: Yup.string().required("Address1 is required"),
      secaddress2: Yup.string().required("Address2 is required"),
      seclandmark: Yup.string().required("Landmark is required"),
      secpincode: Yup.string().required("Pincode is required"),
      secondryDistrictOption: Yup.string().required("Select the District"),
      secondryCountryOption: Yup.string().required("Select the country"),
      secondryStateOption: Yup.string().required("Select the State"),
      acceptTerms: Yup.bool()
        .oneOf([true], "You must accept the terms and conditions")
        .required("You must accept the terms and conditions"),
    });
    const onSubmit = (values, actions) => {
      setTimeout(() => {
        console.log("Form Values:", values);
        const timestamp = new Date().getTime();
        const storageKey = `FORM_DATA`;
        //  existing data from localStorage or create an empty array
        const existingFormData =
          JSON.parse(localStorage.getItem(storageKey)) || [];
        // Add the new form data to the array
        const newFormData = { ...values, timestamp };
        existingFormData.push(newFormData);
        // Store the updated array back in localStorage
        localStorage.setItem(storageKey, JSON.stringify(existingFormData));
        actions.setSubmitting(false);
        actions.resetForm();
      }, 1000);
    };
    const localStorageData =
      JSON.parse(localStorage.getItem("FORM_DATA")) || [];

    const dropdownOptions = localStorageData.map((data) => ({
      username: data.username,
      name: data.name,
    }));

    return (
      <>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({
            isSubmitting,
            values,
            setFieldTouched,
            setFieldValue,
            errors,
            touched,
          }) => (
            <Form>
              <h3 className="container mt-4 text-bg-danger ">REGISTER HERE</h3>
              <Container className="border p-5 mt-3 ">
                <p className=" text-dark fw-bold ">PERSONAL DETAILS</p>
                <hr />

                {/* name and last name */}
                <Row>
                  <Col md={7}>
                    <div className="form-group mb-2">
                      <div className="form-group">
                        <FormikContainer
                          control="input"
                          type="text"
                          name="name"
                          id="name"
                          label="FIRST NAME"
                        />
                      </div>
                    </div>
                  </Col>
                  <Col md={5}>
                    <div className="form-group mb-2">
                      <FormikContainer
                        control="input"
                        type="text"
                        name="lastname"
                        id="lastname"
                        label="LAST NAME"
                      />
                    </div>
                  </Col>
                </Row>
                {/* mail */}
                <Row>
                  <Col md={7}>
                    <FormikContainer
                      control="input"
                      type="mail"
                      name="email"
                      id="email"
                      label="EMAIL"
                    />
                  </Col>
                  <Col md={5}>
                    <FormikContainer
                      control="input"
                      type="text"
                      name="username"
                      id="username"
                      label="USER NAME"
                    />
                  </Col>
                </Row>
                {/* password and repass */}
                <Row>
                  <Col md={6}>
                    <FormikContainer
                      control="input"
                      type="password"
                      name="password"
                      id="password"
                      label="PASSWORD"
                    />
                  </Col>
                  <Col md={6}>
                    <FormikContainer
                      control="input"
                      type="password"
                      name="repassword"
                      id="repassword"
                      label="RE ENTER PASSWORD"
                    />
                  </Col>
                </Row>
                {/* DOB and Mobile */}
                <Row>
                  <Col md={2}>
                    <FormikContainer
                      control="date"
                      name="birthDate"
                      label="DOB"
                    />
                  </Col>
                  <Col md={2}>
                    <AgeFieldComponent name="age" label="AGE" />
                  </Col>
                  <Col md={3}>
                    <FormikContainer
                      control="input"
                      type="number"
                      name="phoneNumber"
                      id="phoneNumber"
                      label="MOBILE NO"
                    />
                  </Col>
                  <Col md={5}>
                    <FormikContainer
                      control="radio"
                      name="radioOption"
                      label="GENDER"
                      options={radioOptions}
                    />
                  </Col>
                </Row>
                <p className="mt-3 text-dark fw-bold">PRIMARY ADDRESS</p>
                <hr />
                <Row>
                  <Col md={6}>
                    <FormikContainer
                      control="input"
                      type="text"
                      name="address1"
                      id="address1"
                      label="ADDRESS LINE 1"
                    />
                  </Col>
                  <Col md={6}>
                    <FormikContainer
                      control="input"
                      type="text"
                      name="address2"
                      id="address2"
                      label="ADDRESS LINE 2"
                    />
                  </Col>
                  <Col md={6}>
                    <FormikContainer
                      control="input"
                      type="text"
                      name="landmark"
                      id="landmark"
                      label="LANDMARK"
                    />
                  </Col>
                  <Col md={6}>
                    <FormikContainer
                      control="input"
                      type="number"
                      name="pincode"
                      id="pincode"
                      label="PIN CODE"
                    />
                  </Col>
                </Row>
                {/* country state district pincode */}

                <Row className="mt-3">
                  <Col md={4}>
                    <div className="form-group">
                      <label htmlFor="country" className="text-primary">
                        COUNTRY
                      </label>
                      <Typeahead
                        id="country"
                        options={countries.map((country) => country.name)}
                        placeholder="Select Country"
                        onChange={(selected) => {
                          setFieldValue("country", selected[0]);
                          setFieldValue("state", ""); // Clear selected state
                          setFieldValue("district", ""); // Clear selected district
                        }}
                        selected={values.country ? [values.country] : []}
                      />
                      {touched.country && errors.country && (
                        <div className="text-danger">
                          {" "}
                          <FontAwesomeIcon
                            icon={faExclamationTriangle}
                            style={{ marginRight: "5px", fontSize: "13px" }}
                          />
                          {errors.country}
                        </div>
                      )}
                    </div>
                  </Col>
                  <Col md={4}>
                    {" "}
                    <div className="form-group">
                      <label htmlFor="state" className="text-primary">
                        STATE
                      </label>
                      <Typeahead
                        id="state"
                        options={
                          countries
                            .find((country) => country.name === values.country)
                            ?.states.map((state) => state.name) || []
                        }
                        placeholder="Select State"
                        onChange={(selected) => {
                          setFieldValue("state", selected[0]);
                          setFieldValue("district", ""); // Clear selected district
                        }}
                        selected={values.state ? [values.state] : []}
                      />
                      {touched.state && errors.state && (
                        <div className="text-danger">
                          {" "}
                          <FontAwesomeIcon
                            icon={faExclamationTriangle}
                            style={{ marginRight: "5px", fontSize: "13px" }}
                          />
                          {errors.state}
                        </div>
                      )}
                    </div>
                  </Col>
                  <Col md={4}>
                    {" "}
                    <div className="form-group">
                      <label htmlFor="district" className="text-primary">
                        DISTRICT
                      </label>
                      <Typeahead
                        id="district"
                        options={
                          countries
                            .find((country) => country.name === values.country)
                            ?.states.find(
                              (state) => state.name === values.state
                            )?.districts || []
                        }
                        placeholder="Select District"
                        onChange={(selected) =>
                          setFieldValue("district", selected[0])
                        }
                        selected={values.district ? [values.district] : []}
                      />
                      {touched.district && errors.district && (
                        <div className="text-danger">
                          {" "}
                          <FontAwesomeIcon
                            icon={faExclamationTriangle}
                            style={{ marginRight: "5px", fontSize: "13px" }}
                          />
                          {errors.district}
                        </div>
                      )}
                    </div>
                  </Col>
                </Row>
                {/* Secoindry address */}
                <p className="mt-3 text-dark fw-bold">SECONDRY ADDRESS</p>
                <hr />
                <Row>
                  <Col md={6}>
                    <FormikContainer
                      control="input"
                      type="text"
                      name="secaddress1"
                      id="secaddress1"
                      label="ADDRESS LINE 1"
                      className={
                        this.state.sameAsPrimary
                          ? "form-control hidden-input"
                          : "form-control"
                      }
                      disabled={this.state.sameAsPrimary}
                    />
                  </Col>
                  <Col md={6}>
                    <FormikContainer
                      control="input"
                      type="text"
                      name="secaddress2"
                      id="secaddress2"
                      label="ADDRESS LINE 2"
                      className={
                        this.state.sameAsPrimary
                          ? "form-control hidden-input"
                          : "form-control"
                      }
                      disabled={this.state.sameAsPrimary}
                    />
                  </Col>
                  <Col md={6}>
                    <FormikContainer
                      control="input"
                      type="text"
                      name="seclandmark"
                      id="seclandmark"
                      label="LANDMARK"
                      className={
                        this.state.sameAsPrimary
                          ? "form-control hidden-input"
                          : "form-control"
                      }
                      disabled={this.state.sameAsPrimary}
                    />
                  </Col>
                  <Col md={6}>
                    <FormikContainer
                      control="input"
                      type="number"
                      name="secpincode"
                      id="secpincode"
                      label="PIN CODE"
                      className={
                        this.state.sameAsPrimary
                          ? "form-control hidden-input"
                          : "form-control"
                      }
                      disabled={this.state.sameAsPrimary}
                    />
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col md={4}>
                    <div className="form-group">
                      <label
                        htmlFor="secondryCountryOption"
                        className="text-primary"
                      >
                        SECONDARY COUNTRY
                      </label>
                      <Typeahead
                        id="secondryCountryOption"
                        options={countries.map((country) => country.name)}
                        placeholder="Select Secondary Country"
                        onChange={(selected) => {
                          setFieldValue("secondryCountryOption", selected[0]);
                          setFieldValue("secondryStateOption", ""); // Clear selected state
                          setFieldValue("secondryDistrictOption", ""); // Clear selected district
                        }}
                        selected={
                          this.state.sameAsPrimary
                            ? []
                            : values.secondryCountryOption
                            ? [values.secondryCountryOption]
                            : []
                        }
                        disabled={this.state.sameAsPrimary}
                      />
                      {touched.secondryCountryOption &&
                        errors.secondryCountryOption && (
                          <div className="text-danger">
                            <FontAwesomeIcon
                              icon={faExclamationTriangle}
                              style={{ marginRight: "5px", fontSize: "13px" }}
                            />
                            {errors.secondryCountryOption}
                          </div>
                        )}
                    </div>
                  </Col>
                  {/* country state district pincode */}
                  <Col md={4}>
                    <div className="form-group">
                      <label
                        htmlFor="secondryStateOption"
                        className="text-primary"
                      >
                        SECONDARY STATE
                      </label>
                      <Typeahead
                        id="secondryStateOption"
                        options={
                          countries
                            .find(
                              (country) =>
                                country.name === values.secondryCountryOption
                            )
                            ?.states.map((state) => state.name) || []
                        }
                        placeholder="Select Secondary State"
                        onChange={(selected) => {
                          setFieldValue("secondryStateOption", selected[0]);
                          setFieldValue("secondryDistrictOption", ""); // Clear selected district
                        }}
                        selected={
                          this.state.sameAsPrimary
                            ? []
                            : values.secondryStateOption
                            ? [values.secondryStateOption]
                            : []
                        }
                        disabled={this.state.sameAsPrimary}
                      />
                      {touched.secondryStateOption &&
                        errors.secondryStateOption && (
                          <div className="text-danger">
                            <FontAwesomeIcon
                              icon={faExclamationTriangle}
                              style={{ marginRight: "5px", fontSize: "13px" }}
                            />
                            {errors.secondryStateOption}
                          </div>
                        )}
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="form-group">
                      <label
                        htmlFor="secondryDistrictOption"
                        className="text-primary"
                      >
                        SECONDARY DISTRICT
                      </label>
                      <Typeahead
                        id="secondryDistrictOption"
                        options={
                          countries
                            .find(
                              (country) =>
                                country.name === values.secondryCountryOption
                            )
                            ?.states.find(
                              (state) =>
                                state.name === values.secondryStateOption
                            )?.districts || []
                        }
                        placeholder="Select Secondary District"
                        onChange={(selected) =>
                          setFieldValue("secondryDistrictOption", selected[0])
                        }
                        selected={
                          this.state.sameAsPrimary
                            ? []
                            : values.secondryDistrictOption
                            ? [values.secondryDistrictOption]
                            : []
                        }
                        disabled={this.state.sameAsPrimary}
                      />
                      {touched.secondryDistrictOption &&
                        errors.secondryDistrictOption && (
                          <div className="text-danger">
                            <FontAwesomeIcon
                              icon={faExclamationTriangle}
                              style={{ marginRight: "5px", fontSize: "13px" }}
                            />
                            {errors.secondryDistrictOption}
                          </div>
                        )}
                    </div>
                  </Col>
                </Row>

                <label className="text-primary mt-3">
                  <input
                    type="checkbox"
                    className="mx-2 mt-3"
                    checked={this.state.sameAsPrimary}
                    onChange={(e) => {
                      this.setState({ sameAsPrimary: e.target.checked });

                      if (e.target.checked) {
                        // Copy values from primary to secondary
                        this.setState({ showCopiedValues: true });
                        setFieldValue("secaddress1", values.address1);
                        setFieldValue("secaddress2", values.address2);
                        setFieldValue("seclandmark", values.landmark);
                        setFieldValue("secpincode", values.pincode);
                        setFieldValue("secondryCountryOption", values.country);
                        setFieldValue("secondryStateOption", values.state);
                        setFieldValue(
                          "secondryDistrictOption",
                          values.district
                        );
                      } else {
                        // Clear secondary fields
                        this.setState({ showCopiedValues: false });
                        setFieldValue("secaddress1", "");
                        setFieldValue("secaddress2", "");
                        setFieldValue("seclandmark", "");
                        setFieldValue("secpincode", "");
                        setFieldValue("secondryCountryOption", "");
                        setFieldValue("secondryStateOption", "");
                        setFieldValue("secondryDistrictOption", "");
                      }
                    }}
                  />
                  Same as Primary Address
                </label>
                <pre>{JSON.stringify(values, null, 2)}</pre>

                <p className="mt-3 text-dark fw-bold">SKILLS</p>
                <hr />
                <Row>
                  <Col md={12}>
                    <FormikContainer
                      control="checkbox"
                      name="CheckOptions"
                      label="SKILLS"
                      options={CheckOptions}
                    />
                  </Col>
                </Row>
                <div className="custom-control custom-checkbox mt-3">
                  <Field
                    type="checkbox"
                    name="acceptTerms"
                    id="acceptTerms"
                    className="custom-control-input"
                  />
                  <label
                    className="custom-control-label mx-3"
                    htmlFor="acceptTerms"
                  >
                    I accept the{" "}
                    <a
                      href="http://google.com"
                      className="text-decoration-none"
                    >
                      terms and conditions
                    </a>
                  </label>
                </div>
                <ErrorMessage
                  name="acceptTerms"
                  component="div"
                  className="text-danger"
                />

                <ListofUser dropdownOptions={dropdownOptions}></ListofUser>

                <button
                  type="submit"
                  className="btn btn-danger w-100 mt-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>

                <p className="mt-3">
                  Already have an account? <Link to="/login">Log In</Link>
                </p>
              </Container>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}
