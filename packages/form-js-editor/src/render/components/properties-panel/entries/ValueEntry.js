import {
  get,
  set
} from 'min-dash';

import { useService } from '../../../hooks';

import { TextFieldEntry } from '@bpmn-io/properties-panel/src/components';


export default function ValueEntry(props) {
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
      component: Label,
      editField,
      field,
      id: idPrefix + '-label',
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

function Label(props) {
  const {
    editField,
    field,
    id,
    index,
    validate
  } = props;

  const debounce = useService('debounce');

  const setValue = (value) => {
    const values = get(field, [ 'values' ]);

    return editField(field, 'values', set(values, [ index, 'label' ], value));
  };

  const getValue = () => {
    return get(field, [ 'values', index, 'label' ]);
  };

  return TextFieldEntry({
    debounce,
    element: field,
    getValue,
    id,
    label: 'Label',
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
    const values = get(field, [ 'values' ]);

    return editField(field, 'values', set(values, [ index, 'value' ], value));
  };

  const getValue = () => {
    return get(field, [ 'values', index, 'value' ]);
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

// todo(pinussilvestrus): remove me
// function Value(props) {
//   const {
//     editField,
//     field,
//     index,
//     validate
//   } = props;

//   const getLabel = () => {
//     return get(field, [ 'values', index, 'label' ]);
//   };

//   const getValue = () => {
//     return get(field, [ 'values', index, 'value' ]);
//   };

//   const onChange = (key) => {
//     const values = get(field, [ 'values' ]);

//     return (value) => {
//       editField(field, 'values', set(values, [ index, key ], value));
//     };
//   };

//   return <>
//     <TextInputEntry
//       id={ `value-label-${ index }` }
//       label="Label"
//       onChange={ onChange('label') }
//       value={ getLabel() } />
//     <TextInputEntry
//       id={ `value-value-${ index }` }
//       label="Value"
//       onChange={ onChange('value') }
//       value={ getValue() }
//       validate={ validate(getValue()) } />

//   </>;
// }