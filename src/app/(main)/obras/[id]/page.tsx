export default function ObraDetalhePage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="min-h-screen p-8">
      <h1>Obra {params.id}</h1>
      <p>Em construção...</p>
    </div>
  );
}
