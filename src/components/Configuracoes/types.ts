
import { ComponentType } from 'react';

export interface ConfigTab {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  gradient: string;
  component: ComponentType;
}
