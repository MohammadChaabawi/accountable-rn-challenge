export interface Element {
  question?: string;
  title: string;
  description: string;
  list?: Element[];
  displayName?: string;
  id?: string;
  root?: boolean;
}

export interface values {
  title: string;
  description: string;
}

export interface updateItemProps {
  id: number;
  values: values;
}

export interface removeItemProps {
  id: number;
  parent: string;
}

export interface reduxData {
  list: Element[];
}

export interface questionElement {
  list: Element[];
  question: string | boolean;
}
