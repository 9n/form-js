import {
  textToLabel
} from './Util';

import { iconsByType } from '../palette/icons';

const labelsByType = {
  button: 'BUTTON',
  checkbox: 'CHECKBOX',
  columns: 'COLUMNS',
  default: 'FORM',
  number: 'NUMBER',
  radio: 'RADIO',
  select: 'SELECT',
  text: 'TEXT',
  textfield: 'TEXT FIELD',
};

export const PanelHeaderProvider = {

  getElementLabel: (field) => {
    const {
      type
    } = field;

    if (type === 'text') {
      return textToLabel(field.text);
    }

    if (type === 'default') {
      return field.id;
    }

    return field.label;
  },

  // todo(pinussilvestrus): icon looks off in UI
  getElementIcon: (field) => {
    const {
      type
    } = field;

    return iconsByType[type];
  },

  getTypeLabel: (field) => {
    const {
      type
    } = field;

    return labelsByType[type];
  }
};