import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';

const Profile = () => {
    const currentUser = useSelector((state)=>state.auth.user)
  const initialValues = {
    email: currentUser?.email,
    password: '',
    address: 'New York, USA',
    phoneNumber: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
    address: Yup.string().required('Required'),
    phoneNumber: Yup.string().required('Required'),
  });

  const handleSubmit = (values) => {
    // Perform the necessary actions to update the user's profile
    console.log(values);
  };

  return (
    <div className="container">
      <h1 className="mt-5 mb-4">Profile</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              className="form-control"
            />
            <ErrorMessage name="email" component="div" className="error" />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              className="form-control"
            />
            <ErrorMessage name="password" component="div" className="error" />
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <Field
              type="text"
              id="address"
              name="address"
              className="form-control"
            />
            <ErrorMessage name="address" component="div" className="error" />
          </div>

          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number
            </label>
            <Field
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              className="form-control"
            />
            <ErrorMessage
              name="phoneNumber"
              component="div"
              className="error"
            />
          </div>

          <button type="submit" className="button signup">Update Profile</button>

        </Form>
      </Formik>
    </div>
  );
};

export default Profile;
