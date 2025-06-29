interface Props {
  id: number;
  seriesLength: number;
}

export default function Season({ id, seriesLength }: Props) {
  return (
    <section>
      <h2 className="mb-6 text-xl">회차</h2>
      <p>id: {id}</p>
      <p>seriesLength: {seriesLength}</p>
    </section>
  );
}
