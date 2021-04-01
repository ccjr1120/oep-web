declare namespace MenuType {
  export interface RecordType {
    parentId: string;
    id: string;
    name: string;
    path: string;
    roles: array<string> | undefined;
    children?: array<RecordType>;
  }
}
