import type { Plugin } from '@oxlint/plugins';
import { mainComponentFirst } from '../custom-rules/main-component-first.ts';
import { noUtilityTypes } from '../custom-rules/no-utility-types.ts';
import { propsAboveComponent } from '../custom-rules/props-above-component.ts';

export default {
  meta: { name: 'components' },
  rules: {
    'main-component-first': mainComponentFirst,
    'no-utility-types': noUtilityTypes,
    'props-above-component': propsAboveComponent,
  },
} satisfies Plugin;
