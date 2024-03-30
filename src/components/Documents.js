import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Navbar from './Navbar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const DocumentsContainer = styled.div`
  max-width: 600px;
  margin: 100px auto;
  padding: 50px;
  background-color: #f4f4f4;
  border: 3px solid black;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #333;
`;

const UploadSection = styled.div`
  margin-top: 20px;
`;

const FileInput = styled.input`
  font-size: large;
  margin-right: 10px;
`;

const UploadButton = styled.button`
  background-color: #4caf50;
  color: #fff;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 16px;

  &:hover {
    background-color: orange;
  }
`;

const FileList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
`;

const PasswordInput = styled.input`
  font-size: small;
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  background-color: #2196f3;
  color: #fff;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 16px;

  &:hover {
    background-color: #0d47a1;
  }
`;


const FileListItem = styled.li`
  font-size: large;
  margin-bottom: 10px;
  cursor: pointer;
  color: blue;

  &:hover {
    text-decoration: underline;
  }
`;


// ... (previous imports and styled components)

const Documents = () => {
  const [file, setFile] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // Updated state variable and input name
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !password || !username) { // Updated condition to check for password
      alert('Please select a file and enter a password before uploading.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('username', username)
    formData.append('password', password); // Updated form data key

    try {
      setLoading(true);
      await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('File uploaded successfully!');

      fetchFiles(); // Refresh the file list after upload
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Error uploading file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchFiles = async () => {
    try {
      if (!password) {
        // If no password is entered, do not fetch files
        setFileList([]);
        return;
      }

      setLoading(true);
      const response = await axios.get('http://localhost:5000/files', {
        params: { username,password },
      });
      setFileList(response.data);
    } catch (error) {
      console.error('Error fetching files:', error);
      alert('Error fetching files. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (fileId) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5000/files/${fileId}`);
      alert('File deleted successfully!');
      fetchFiles(); // Refresh the file list after deletion
    } catch (error) {
      console.error('Error deleting file:', error);
      alert('Error deleting file. Please try again.'); // Provide a user-friendly error message
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles(); // Fetch files when the component mounts
  }, []);

  return (
    <>
      <Navbar />
      <DocumentsContainer>
        <Title>Documents</Title>
        <UploadSection>
          <div style={{ display: 'flex', marginBottom: '10px' }}>
            <PasswordInput // Updated component name
              type="password" // Set the input type to password
              placeholder="Enter your password" // Updated placeholder
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Updated state variable
            />
            <PasswordInput // Updated component name
              type="text" // Set the input type to password
              placeholder="Enter your username" // Updated placeholder
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Updated state variable
            />
            <SubmitButton onClick={fetchFiles} disabled={loading}>
              {loading ? 'Fetching...' : 'Submit'}
            </SubmitButton>
          </div>
          <FileInput type="file" onChange={handleFileChange} />
          <UploadButton onClick={handleUpload} disabled={loading}>
            {loading ? 'Uploading...' : 'Upload'}
          </UploadButton>
        </UploadSection>
        {loading && <p>Loading...</p>}
        {fileList.length === 0 ? (
          <p>No files available.</p>
        ) : (
          <FileList>
            {fileList.map((file) => (
              <FileListItem key={file._id}>
                <span onClick={() => window.open(`http://localhost:5000/uploads/${file.filename}`, '_blank')}>
                  {file.filename} ~~~~
                </span>
                <button style={{ margin: '0px' }} onClick={() => handleDelete(file._id)}>Delete</button>
              </FileListItem>
            ))}
          </FileList>
        )}
        <ToastContainer />
      </DocumentsContainer>

    </>
  );
};

export default Documents;
