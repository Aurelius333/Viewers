import React from 'react';
import PropTypes from 'prop-types';
import { ViewportActionBar, Notification, Button } from '@ohif/ui';

const Viewport = ({
  viewportIndex,
  onNavigationClick,
  studyData,
  children,
}) => {
  return (
    <div className="relative flex flex-col h-full">
      <div className="absolute top-0 left-0 w-full">
        <ViewportActionBar
          onNavigationClick={onNavigationClick}
          studyData={studyData}
        />

        {/* TODO: NOTIFICATION API DEFINITION - OHIF-112 */}
        <Notification
          message="Track all measurement for this series?"
          type="info"
          actions={[
            {
              type: 'cancel',
              text: 'No',
              value: 0,
            },
            {
              type: 'secondary',
              text: 'No, do not ask again',
              value: -1,
            },
            {
              type: 'primary',
              text: 'Yes',
              value: 1,
            },
          ]}
          onSubmit={value => {
            window.alert(value);
          }}
        />
      </div>

      {/* STUDY IMAGE */}
      <div className="w-full h-full" id={`viewport-${viewportIndex}`}>
        {children}
      </div>
    </div>
  );
};

Viewport.propTypes = {
  viewportIndex: PropTypes.number.isRequired,
  onNavigationClick: PropTypes.func.isRequired,
  studyData: PropTypes.shape({
    label: PropTypes.string.isRequired,
    isTracked: PropTypes.bool.isRequired,
    isLocked: PropTypes.bool.isRequired,
    studyDate: PropTypes.string.isRequired,
    currentSeries: PropTypes.number.isRequired,
    seriesDescription: PropTypes.string.isRequired,
    modality: PropTypes.string.isRequired,
    patientInformation: PropTypes.shape({
      patientName: PropTypes.string.isRequired,
      patientSex: PropTypes.string.isRequired,
      patientAge: PropTypes.string.isRequired,
      MRN: PropTypes.string.isRequired,
      thickness: PropTypes.string.isRequired,
      spacing: PropTypes.string.isRequired,
      scanner: PropTypes.string.isRequired,
    }),
  }).isRequired,
  children: PropTypes.node.isRequired,
};

export default Viewport;
