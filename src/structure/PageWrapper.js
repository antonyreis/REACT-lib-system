import React from 'react'


//Design
import Box from '@mui/material/Box';


//Internal
import AppBar from './AppBar';
import GetWindowDimentions from '../utils/Hooks/GetWindowDimensions';

const paddingPx = 8;


const style = {
  mainBox: {
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
  },
  pageBox: {
    padding: `${paddingPx}px`,
    height: '100vh'
  },
};


export default function PageWrapper({ children, extraButtons }) {

  const { width, height } = GetWindowDimentions();
  const pageBoxWidth = parseInt(width - window.app_config.components.AppBar.width - 2 * paddingPx);
  const pageBoxHeight = parseInt(height - 2 * paddingPx);

  return (
    <>
      <Box id="page-wrapper-box" sx={style.mainBox}>
        <AppBar extraButtons={extraButtons}/>
        <Box
          id="page-box"
          width={pageBoxWidth}
          sx={style.pageBox}
        >
          {children({ width: pageBoxWidth, height: pageBoxHeight, key: Math.random() })}
        </Box>
      </Box>
    </>
  );
}
