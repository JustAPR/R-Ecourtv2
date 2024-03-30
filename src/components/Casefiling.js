import React, { useState } from 'react';
import styled from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Navbar from './Navbar';

const FormWrapper = styled.div`
  width: 800px;
  margin: 10px auto;
  padding: 20px;
  background-color: white;
`;

const FormTitle = styled.h1`
margin-top:30px;
  color: black;
  text-align:center;
`;


const FormBox = styled.div`
  margin-bottom: 40px;
  padding: 40px;
  border: 2px solid white;
  border-radius: 8px;
  background-color:#212529 ;
`;

const Label = styled.label`
font-size:18px;
  display: block;
  margin-bottom: 8px;
  color: white;
`;

const StyledSelect = styled.select`
font-size:16px;
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Input = styled.input`
font-size:17px;
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const TextArea = styled.textarea`
font-size:18px;

  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
  width:180px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  font-size: 22px;
  margin-bottom:80px;

  &:hover {
    background-color: green;
  }
`;
const OButton = styled.button`
  background-color: green;
  color: white;
  padding: 10px 10px;
  width:100px;
  cursor: pointer;
  border: none;
  border-radius: 5px;


  &:hover {
    background-color: red;
  }
`;


const CaseFiling = () => {
  const [formData, setFormData] = useState({
    caseType: '',
    district: '',
    plaintiffName: '',
    plaintiffFatherOrMotherName: '',
    plaintiffAge: '',
    plaintiffCaste: '',
    plaintiffAdvocate: '',
    plaintiffEmail:'',
    defendantName: '',
    defendantFatherOrMotherName: '',
    defendantAge: '',
    defendantCaste: '',
    dmobileNumber: '',
    pmobileNumber: '',
    plaintiffAddress: '',
    defendantAddress: '',
    subject: '',
    filingDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGenerateOTP = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/send-otp', {
        mobileNumber: formData.mobileNumber,
        email: formData.plaintiffEmail,
      });
      console.log('OTP sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/verify-otp', {
        email: formData.plaintiffEmail,
        otp: formData.otp,
      });

    if (response.data.success) {
      console.log('OTP verified successfully!');

      await axios.post('http://localhost:5000/api/cases', formData);

      console.log('Form submitted:', formData);
      toast.success('Case filed successfully!', { autoClose: 3000 }); // 3000 milliseconds (3 seconds)

    
      setFormData({
        caseType: '',
        district: '',
        plaintiffName: '',
        plaintiffFatherOrMotherName: '',
        plaintiffAge: '',
        plaintiffCaste: '',
        plaintiffEmail:'',
        plaintiffAdvocate: '',
        defendantName: '',
        defendantFatherOrMotherName: '',
        defendantAge: '',
        defendantCaste: '',
        dmobileNumber: '',
        pmobileNumber: '',
        plaintiffAddress: '',
        defendantAddress: '',
        subject: '',
        otp:'',
        filingDate: '',
      });
    }else {
      toast.error('Invalid OTP. Please try again.');
    }
    } catch (error) {
      console.error('Error filing case:', error);
      toast.error('Error filing case. Please try again.', { autoClose: 3000 });
    }
  };



  return (
    <>
      <Navbar />
      <FormTitle>-- Electronic Case Filing --</FormTitle> <br />  <br />
      <FormWrapper>
        <form onSubmit={handleSubmit}>
          <FormBox>
            <Label>District:</Label>
            <StyledSelect
              name="district"
              value={formData.district}
              onChange={handleChange}
              required
            >
              <option value="">Select Districts</option>
              <option value="adilabad">Adilabad</option>
              <option value="bhadradri">Bhadradri</option>
              <option value="hyderabad">Hyderabad</option>
              <option value="jagitial">Jagitial</option>
              <option value="jayashankar">Jayashankar</option>
              <option value="jogulamba">Jogulamba</option>
              <option value="kamareddy">Kamareddy</option>
              <option value="karimnagar">Karimnagar</option>
              <option value="khammam">Khammam</option>
              <option value="komarambheem">Komaram Bheem</option>
              <option value="mahabubabad">Mahabubabad</option>
              <option value="mahabubnagar">Mahabubnagar</option>
              <option value="mancherial">Mancherial</option>
              <option value="medak">Medak</option>
              <option value="medchal">Medchal</option>
              <option value="nagarkurnool">Nagarkurnool</option>
              <option value="nalgonda">Nalgonda</option>
              <option value="nirmal">Nirmal</option>
              <option value="nizamabad">Nizamabad</option>
              <option value="peddapalli">Peddapalli</option>
              <option value="rajanna">Rajanna</option>
              <option value="rangareddy">Rangareddy</option>
              <option value="sangareddy">Sangareddy</option>
              <option value="siddipet">Siddipet</option>
              <option value="suryapet">Suryapet</option>
              <option value="vikarabad">Vikarabad</option>
              <option value="wanaparthy">Wanaparthy</option>
              <option value="warangalurban">Warangal Urban</option>
              <option value="warangalrural">Warangal Rural</option>
              <option value="yadadri">Yadadri</option>
            </StyledSelect>
            <Label>Case Type:</Label>
            <StyledSelect name="caseType" value={formData.caseType} onChange={handleChange} required>
              <option value="">Select Case Type</option>
              <option value="civil">Civil</option>
              <option value="criminal">Criminal</option>
              <option value="family">Family</option>
            </StyledSelect>
          </FormBox>

          <h2>Plaintiff  details:</h2> <br />

          <FormBox>
            <Label>Plaintiff Name:</Label>
            <Input
              type="text"
              name="plaintiffName"
              value={formData.plaintiffName}
              onChange={handleChange}
              placeholder="Enter Plaintiff Name"
              required
            />
         

            <Label>Plaintiff Father/Mother Name:</Label>
            <Input
              type="text"
              name="plaintiffFatherOrMotherName"
              value={formData.plaintiffFatherOrMotherName}
              onChange={handleChange}
              placeholder="Enter Father/Mother Name"
              required
            />

            <Label>Plaintiff Address:</Label>
            <TextArea
              name="plaintiffAddress"
              value={formData.plaintiffAddress}
              onChange={handleChange}
              placeholder="Enter Plaintiff Address"
              rows="4"
              required
            />

            <Label>Plaintiff Age:</Label>
            <Input
              type="number"
              name="plaintiffAge"
              value={formData.plaintiffAge}
              onChange={handleChange}
              required
            />

            <Label>Plaintiff Caste:</Label>
            <Input
              type="text"
              name="plaintiffCaste"
              value={formData.plaintiffCaste}
              onChange={handleChange}
              placeholder="Enter Plaintiff Caste"
              required
            />
 
          <Label>Plaintiff Email:</Label>
          <Input
            type="email"
            name="plaintiffEmail"
            value={formData.plaintiffEmail}
            onChange={handleChange}
            required
          />


            <Label>Mobile Number:</Label>
            <Input
              type="tel"
              name="pmobileNumber"
              pattern="[0-9]{10}"
              value={formData.pmobileNumber}
              onChange={handleChange}
              required
            />

            <Label>Plaintiff Advocate:</Label>
            <Input
              type="text"
              name="plaintiffAdvocate"
              value={formData.plaintiffAdvocate}
              onChange={handleChange}
              placeholder="Enter Plaintiff Advocate"
              required
            />
          </FormBox>

          <h2>Defendant  details:</h2> <br />

          <FormBox>
            <Label>Defendant Name:</Label>
            <Input
              type="text"
              name="defendantName"
              value={formData.defendantName}
              onChange={handleChange}
              placeholder="Enter Defendant Name"
              required
            />
            <Label>Defendant Father/Mother Name:</Label>
            <Input
              type="text"
              name="defendantFatherOrMotherName"
              value={formData.defendantFatherOrMotherName}
              onChange={handleChange}
              placeholder="Enter Father/Mother Name"
              required
            />

            <Label>Defendant Address:</Label>
            <TextArea
              name="defendantAddress"
              value={formData.defendantAddress}
              onChange={handleChange}
              placeholder="Enter Defendant Address"
              rows="4"
              required
            />
         
            <Label>Defendant Age:</Label>
            <Input
              type="number"
              name="defendantAge"
              value={formData.defendantAge}
              onChange={handleChange}
              required
            />
          
            <Label>Defendant Caste:</Label>
            <Input
              type="text"
              name="defendantCaste"
              value={formData.defendantCaste}
              onChange={handleChange}
              placeholder="Enter defendant Caste"
              required
            />
          
            <Label>Mobile Number:</Label>
            <Input
              type="tel"
              name="dmobileNumber"
              pattern="[0-9]{10}"
              value={formData.dmobileNumber}
              onChange={handleChange}
              required
            />
          </FormBox>

          <FormBox>
            <Label>Subject</Label>
            <TextArea
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder=""
              rows="4"
              required
            />
         
            <Label>Filing Date:</Label>
            <Input
              type="date"
              name="filingDate"
              value={formData.filingDate}
              onChange={handleChange}
              required
            />

          <Label>OTP:</Label>
          <Input
            type="text"
            name="otp"
            value={formData.otp}
            onChange={handleChange}
            placeholder="Enter OTP"
            required
          />
          <OButton type="button" onClick={handleGenerateOTP}>
            Generate OTP
          </OButton>
        </FormBox>

          <Button type="submit">File Case</Button>
        </form>
      </FormWrapper>
      <ToastContainer />
    </>
  );
};

export default CaseFiling;


