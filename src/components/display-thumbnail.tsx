"use client";

import * as React from "react";
import { thumbnailPlugin } from "@react-pdf-viewer/thumbnail";
import { Viewer } from "@react-pdf-viewer/core";
import type { Plugin, RenderViewer } from "@react-pdf-viewer/core";

// Import pdfjsLib to set the worker path
import * as pdfjsLib from "pdfjs-dist";

// Set the workerSrc for PDF.js manually
pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.js";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/thumbnail/lib/styles/index.css";

interface PageThumbnailPluginProps {
  PageThumbnail: React.ReactElement;
}

const pageThumbnailPlugin = (props: PageThumbnailPluginProps): Plugin => {
  const { PageThumbnail } = props;

  return {
    renderViewer: (renderProps: RenderViewer) => {
      const { slot } = renderProps;

      slot.children = PageThumbnail;
      if (slot.subSlot) {
        // Reset the sub slot
        slot.subSlot.attrs = {};
        slot.subSlot.children = <></>;
      }

      return slot;
    },
  };
};

export const DisplayThumbnail = ({ fileUrl }: { fileUrl: string }) => {
  const thumbnailPluginInstance = thumbnailPlugin();
  const { Cover } = thumbnailPluginInstance;
  const pageThumbnailPluginInstance = pageThumbnailPlugin({
    PageThumbnail: <Cover getPageIndex={() => 0} />,
  });

  return <Viewer fileUrl={fileUrl} plugins={[pageThumbnailPluginInstance, thumbnailPluginInstance]} />;
};
