import React, { ReactElement, useEffect, useState } from 'react';
import { DocumentLoadEvent, PageChangeEvent, ViewerProps, Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import {
  defaultLayoutPlugin,
  ToolbarProps,
  ToolbarSlot,
} from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const Pdfviewer = (sets: any) => {

  const [page,setPage] = useState(-1);

  const [enable,setEnable] = useState(false);
  const pageChange = (props: PageChangeEvent) => {
    setPage(props.currentPage);
  }

  const onThumnailClick = (props: any) => {
    if( String(props.target+"").includes("HTMLImageElement") ){
      setEnable(true);
      sets.setSelected([...sets.selected,page]);
      sets.setImage([...sets.image,props.target.currentSrc]);

      sets.setSelected2([...sets.selected,page]);
      sets.setImage2([...sets.image,props.target.currentSrc]);
    }
  }

  useEffect(() => {
    console.log(sets)
    if( enable === true && page !== sets.selected[sets.selected.length - 1] ){
      let tempSelected = [...sets.selected];
      tempSelected[tempSelected.length - 1] = page;
      sets.setSelected([...tempSelected]);
      sets.setSelected2([...tempSelected]);
      setEnable(false);
    }
  },[page,enable]);

  const renderToolbar = (Toolbar: (props: ToolbarProps) => ReactElement) => (
    
    <Toolbar>
      {(slots: ToolbarSlot) => {
        const {
          CurrentPageInput,
          Download,
          EnterFullScreen,
          GoToNextPage,
          GoToPreviousPage,
          NumberOfPages,
          Print,
          ShowSearchPopover,
          Zoom,
          ZoomIn,
          ZoomOut,
        } = slots;
        return (
          <div
            style={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <div style={{ padding: "0px 2px" }}>
              <ShowSearchPopover />
            </div>
            <div style={{ padding: "0px 2px" }}>
              <ZoomOut />
            </div>
            <div style={{ padding: "0px 2px" }}>
              <Zoom />
            </div>
            <div style={{ padding: "0px 2px" }}>
              <ZoomIn />
            </div>
            <div style={{ padding: "0px 2px", marginLeft: "auto" }}>
              <GoToPreviousPage />
            </div>
            <div style={{ padding: "0px 2px", width: "4rem" }}>
              <CurrentPageInput />
            </div>
            <div style={{ padding: "0px 2px" }}>
              / <NumberOfPages />
            </div>
            <div style={{ padding: "0px 2px" }}>
              <GoToNextPage />
            </div>
            <div style={{ padding: "0px 2px", marginLeft: "auto" }}>
              <EnterFullScreen />
            </div>
            <div style={{ padding: "0px 2px" }}>
              <Download />
            </div>
            <div style={{ padding: "0px 2px" }}>
              <Print />
            </div>
          </div>
        );
      }}
    </Toolbar>
  );

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    renderToolbar,
  });

  return (
    <>
      <Worker 
        workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js">
          <div style={{width: "700px", padding: "10px 50px", margin: "0"}} onClick={onThumnailClick}>
            <Viewer
              
              fileUrl={sets.url}
              plugins={[defaultLayoutPluginInstance]}
              onPageChange={pageChange}
              
            />
          </div>
      </Worker>
    </>
  );
};

export default Pdfviewer;
