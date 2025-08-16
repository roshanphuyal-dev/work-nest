interface Props<T> {
  data: T;
}

export function DisplayJson<T>({ data }: Props<T>) {
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
