import { ToogleConfigColor } from './toogle-config-color.interface';

export interface ToogleConfig {
  value: boolean;
  disabled: boolean;
  color: ToogleConfigColor;
  switchColor: ToogleConfigColor;
}
