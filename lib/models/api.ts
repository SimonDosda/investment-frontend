export interface StrapiResponse<T> {
  data: T;
  meta: { pagination: { page: 1; pageSize: 25; pageCount: 1; total: 2 } };
}

export interface StrapiData<T> {
  id: number;
  attributes: StrapiAttributes & T;
}

export interface StrapiAttributes {
  createdAt: string;
  updatedAt: string;
}

export interface ParsedStapiAttributes {
  createdAt: Date;
  updatedAt: Date;
}

export interface StrapiParameters<T> {
  sort?: { key: keyof T; order: "asc" | "desc" };
  pagination?: { page: number; pageSize: number };
  populate?: "*" | (keyof T)[];
}
