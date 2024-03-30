import React, { useState, createContext, useContext } from 'react';

const MainContent = () => {
    const { contentId } = useContext(ContentContext);
  
    return (
      <StyledMainContent>
        <h1>Main Content</h1>
        <StyledContent id="content1" active={contentId === 'content1'}>
          This is the content for Link 1.
        </StyledContent>
        <StyledContent id="content2" active={contentId === 'content2'}>
          This is the content for Link 2.
        </StyledContent>
        <StyledContent id="content3" active={contentId === 'content3'}>
          This is the content for Link 3.
        </StyledContent>
      </StyledMainContent>
    );
  };
