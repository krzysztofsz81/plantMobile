import React, { FunctionComponent, useState } from 'react';
import { Text, Box, Slider, FormControl, Button } from 'native-base';
import { Formik } from 'formik';

type FormControlSliderProps = {
  label: string;
  defaultValue?: number;
  minValue: number;
  maxValue: number;
  color: string;
  onChange: (value: number) => void;
  onChangeEnd: (value: number) => void;
};

const FormControlSlider: FunctionComponent<FormControlSliderProps> = ({
  label,
  defaultValue,
  minValue,
  maxValue,
  color,
  onChange,
  onChangeEnd
}) => {
  return (
    <FormControl mt="6" px="2">
      <FormControl.Label mb="2">{label}</FormControl.Label>
      <Slider
        defaultValue={defaultValue}
        minValue={minValue}
        maxValue={maxValue}
        step={5}
        size="md"
        colorScheme={color}
        onChange={onChange}
        onChangeEnd={onChangeEnd}
      >
        <Slider.Track bg={`${color}.300`}>
          <Slider.FilledTrack bg={`${color}.700`} />
        </Slider.Track>
        <Slider.Thumb />
      </Slider>
    </FormControl>
  );
};

type CalibrationSoilMoistureProps = {
  initialCalibrationValues: {
    min: number;
    max: number;
  };
  previewValue: number;
  minValue: number;
  maxValue: number;
  onCancel: () => void;
  onSubmit: (values: { min: number; max: number }) => void;
};
const CalibrationSoilMoisture: FunctionComponent<CalibrationSoilMoistureProps> = ({
  initialCalibrationValues,
  previewValue,
  minValue,
  maxValue,
  onSubmit,
  onCancel
}) => {
  const [tempValues, setTempValues] = useState(initialCalibrationValues);

  return (
    <Formik initialValues={initialCalibrationValues} onSubmit={onSubmit}>
      {({ handleReset, handleSubmit, setFieldValue, values }) => (
        <Box p="4" borderRadius="2" bg="blue.100" display="flex" flexDirection="column" justifyContent="space-between" alignItems="center">
          <Text fontWeight="bold" fontSize="md" textAlign="center">
            Raw value: {previewValue}
          </Text>
          <FormControlSlider
            label={`Minimum value: ${tempValues.min}`}
            defaultValue={tempValues.min}
            minValue={minValue}
            maxValue={values.max ?? maxValue}
            color="blue"
            onChange={(min) => setTempValues((values) => ({ ...values, min }))}
            onChangeEnd={(val) => setFieldValue('min', val)}
          />
          <FormControlSlider
            label={`Maximum value: ${values.max}`}
            defaultValue={tempValues.max}
            minValue={values.min ?? minValue}
            maxValue={maxValue}
            color="blue"
            onChange={(max) => setTempValues((values) => ({ ...values, max }))}
            onChangeEnd={(val) => setFieldValue('max', val)}
          />
          <Box width="100%" mt="8" alignItems="flex-end">
            <Button.Group space="4">
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  handleReset();
                  onCancel();
                }}
              >
                Cancel
              </Button>
              <Button onPress={() => handleSubmit()}>Save</Button>
            </Button.Group>
          </Box>
        </Box>
      )}
    </Formik>
  );
};

export default CalibrationSoilMoisture;
