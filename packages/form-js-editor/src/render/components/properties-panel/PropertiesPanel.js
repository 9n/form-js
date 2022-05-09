// todo(pinussilvestrus): that should not be needed
import PropertiesPanel from '@bpmn-io/properties-panel/src/PropertiesPanel';

import { PanelHeaderProvider } from './PanelHeaderProvider';

import {
  CustomValuesGroup,
  GeneralGroup,
  ValidationGroup,
  ValuesGroup
} from './groups';

import {
  useService
} from '../../hooks';

function getGroups(field, editField) {
  const groups = [
    GeneralGroup(field, editField),
    ValuesGroup(field, editField),
    ValidationGroup(field, editField),
    CustomValuesGroup(field, editField)
  ];

  // contract: if a group returns null, it should not be displayed at all
  return groups.filter(group => group !== null);
}

export default function FormPropertiesPanel(props) {
  const {
    editField,
    field
  } = props;

  const eventBus = useService('eventBus');

  if (!field) {
    return <div class="fjs-properties-panel-placeholder">Select a form field to edit its properties.</div>;
  }

  const onFocus = () => eventBus.fire('propertiesPanel.focusin');

  const onBlur = () => eventBus.fire('propertiesPanel.focusout');

  return (
    <div
      class="fjs-properties-panel"
      data-field={ field.id }
      onFocusCapture={ onFocus }
      onBlurCapture={ onBlur }
    >
      <PropertiesPanel
        element={ field }
        groups={ getGroups(field, editField) }
        headerProvider={ PanelHeaderProvider }
      />
      {/* todo(pinussilvestrus): remove old panel
      <div class="fjs-properties-panel-header">
        <div class="fjs-properties-panel-header-icon">
          <Icon width="36" height="36" viewBox="0 0 54 54" />
        </div>
        <div>
          <span class="fjs-properties-panel-header-type">{ label }</span>
          {
            type === 'text'
              ? <div class="fjs-properties-panel-header-label">{ textToLabel(field.text) }</div>
              : type === 'default'
                ? <div class="fjs-properties-panel-header-label">{ field.id }</div>
                : <div class="fjs-properties-panel-header-label">{ field.label }</div>
          }
        </div>
      </div>
      {
        getGroups(field, editField)
      } */}
    </div>
  );
}