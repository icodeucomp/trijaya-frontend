"use client";

import * as React from "react";
import { thumbnailPlugin } from "@react-pdf-viewer/thumbnail";
import { Viewer } from "@react-pdf-viewer/core";
import type { Plugin, RenderViewer } from "@react-pdf-viewer/core";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/thumbnail/lib/styles/index.css";

interface PageThumbnailPluginProps {
  PageThumbnail: React.ReactElement;
}

interface DisplayThumbnailProps {
  fileUrl: string;
  pageIndex: number;
}

const pageThumbnailPlugin = (props: PageThumbnailPluginProps): Plugin => {
  const { PageThumbnail } = props;

  return {
    renderViewer: (renderProps: RenderViewer) => {
      const { slot } = renderProps;

      // Ensure the children are being correctly replaced
      slot.children = <>{PageThumbnail}</>;

      return slot;
    },
  };
};

export const DisplayThumbnail = ({ fileUrl, pageIndex }: DisplayThumbnailProps) => {
  const thumbnailPluginInstance = thumbnailPlugin();
  const { Cover } = thumbnailPluginInstance;
  const pageThumbnailPluginInstance = pageThumbnailPlugin({
    PageThumbnail: <Cover getPageIndex={() => pageIndex} />,
  });

  return <Viewer fileUrl={fileUrl} plugins={[pageThumbnailPluginInstance, thumbnailPluginInstance]} />;
};
