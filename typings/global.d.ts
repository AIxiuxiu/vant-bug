declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production';
    readonly PORT: string;
  }
}

type Indexable<T> = {
  [index: string]: T;
};

type Nullable<T> = T | null;

type Fn<V> = (...arg: unknown[]) => V;
