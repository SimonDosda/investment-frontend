export interface StrapiResponse<T> {
  data: T;
  meta: { pagination: { page: 1; pageSize: 25; pageCount: 1; total: 2 } };
}

export interface StrapiData<T> {
  id: number;
  attributes: StapiAttributes & T;
}

export interface StapiAttributes {
  createdAt: string;
  updatedAt: string;
}
