export default function ArtistaPerfilPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="min-h-screen p-8">
      <h1>Perfil do Artista {params.id}</h1>
      <p>Em construção...</p>
    </div>
  );
}
