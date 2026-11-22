import type { Plugin } from '@oxlint/plugins';
import { mainComponentFirst } from '../custom-rules/main-component-first.ts';
import { noUtilityTypes } from '../custom-rules/no-utility-types.ts';
import { propsAboveComponent } from '../custom-rules/props-above-component.ts';
import { sharedComponentNames } from '../custom-rules/shared-component-names.ts';

export default {
  meta: { name: 'components' },
  rules: {
    'main-component-first': mainComponentFirst,
    'no-utility-types': noUtilityTypes,
    'props-above-component': propsAboveComponent,
    'shared-component-names': sharedComponentNames,
  },
} satisfies Plugin;
