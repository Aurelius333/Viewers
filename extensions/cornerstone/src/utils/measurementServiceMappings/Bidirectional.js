import SUPPORTED_TOOLS from './constants/supportedTools';
import getSOPInstanceAttributes from './utils/getSOPInstanceAttributes';

const Bidirectional = {
  toAnnotation: (measurement, definition) => {
    // TODO -> Implement when this is needed.
  },
  toMeasurement: (csToolsAnnotation, getValueTypeFromToolType) => {
    const { element, measurementData } = csToolsAnnotation;
    const tool =
      csToolsAnnotation.toolType ||
      csToolsAnnotation.toolName ||
      measurementData.toolType;

    const validToolType = toolName => SUPPORTED_TOOLS.includes(toolName);

    if (!validToolType(tool)) {
      throw new Error('Tool not supported');
    }

    const {
      SOPInstanceUID,
      FrameOfReferenceUID,
      SeriesInstanceUID,
      StudyInstanceUID,
    } = getSOPInstanceAttributes(element);

    const { handles } = measurementData;

    const longAxis = [handles.start, handles.end];
    const shortAxis = [handles.perpendicularStart, handles.perpendicularEnd];

    return {
      id: measurementData._measurementServiceId,
      SOPInstanceUID: SOPInstanceUID,
      FrameOfReferenceUID,
      referencedSeriesUID: SeriesInstanceUID,
      referencedStudyUID: StudyInstanceUID,
      label: measurementData.text,
      description: measurementData.description,
      unit: measurementData.unit,
      shortestDiameter: measurementData.shortestDiameter,
      longestDiameter: measurementData.longestDiameter,
      type: getValueTypeFromToolType(tool),
      points: { longAxis, shortAxis },
    };
  },
};

export default Bidirectional;
