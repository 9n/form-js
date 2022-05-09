import { get } from 'min-dash';

import { useService } from '../../../hooks';

import { TextFieldEntry } from '@bpmn-io/properties-panel/src/components';


export default function CustomValueEntry(props) {
  const {
    editField,
    field,
    idPrefix,
    index,
    validate,
    value
  } = props;

  // todo(pinussilvestrus): can we make that shorter?
  const entries = [
    {
      component: Key,
      editField,
      field,
      id: idPrefix + '-key',
      idPrefix,
      index,
      validate,
      value
    },
    {
      component: Value,
      editField,
      field,
      idPrefix,
      id: idPrefix + '-value',
      index,
      validate,
      value
    }
  ];

  return entries;
}

function Key(props) {
  const {
    editField,
    field,
    id,
    index,
    validate
  } = props;

  const debounce = useService('debounce');

  const setValue = (value) => {
    const properties = get(field, [ 'properties' ]);
    const key = Object.keys(properties)[ index ];
    return editField(field, 'properties', updateKey(properties, key, value));
  };

  const getValue = () => {
    return Object.keys(get(field, [ 'properties' ]))[ index ];
  };

  return TextFieldEntry({
    debounce,
    element: field,
    getValue,
    id,
    label: 'Key',
    setValue,

    // todo(pinussilvestrus): make it simpler
    validate: validate(getValue())
  });
}

function Value(props) {
  const {
    editField,
    field,
    id,
    index,
    validate
  } = props;

  const debounce = useService('debounce');

  const setValue = (value) => {
    const properties = get(field, [ 'properties' ]);
    const key = Object.keys(properties)[ index ];
    editField(field, 'properties', updateValue(properties, key, value));
  };

  const getValue = () => {
    const properties = get(field, [ 'properties' ]);
    const key = Object.keys(properties)[ index ];
    return get(field, [ 'properties', key ]);
  };

  return TextFieldEntry({
    debounce,
    element: field,
    getValue,
    id,
    label: 'Value',
    setValue,
    validate: validate(getValue())
  });
}


// helpers //////////

/**
 * Returns copy of object with updated value.
 *
 * @param {Object} properties
 * @param {string} key
 * @param {string} value
 *
 * @returns {Object}
 */
function updateValue(properties, key, value) {
  return {
    ...properties,
    [ key ]: value
  };
}

/**
 * Returns copy of object with updated key.
 *
 * @param {Object} properties
 * @param {string} oldKey
 * @param {string} newKey
 *
 * @returns {Object}
 */
function updateKey(properties, oldKey, newKey) {
  return Object.entries(properties).reduce((newProperties, entry) => {
    const [ key, value ] = entry;

    return {
      ...newProperties,
      [ key === oldKey ? newKey: key ]: value
    };
  }, {});
}