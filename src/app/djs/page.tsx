import { loadDJs } from '@/lib/data-access';
import { DJCard } from '@/components/features/dj-card';

export const dynamic = 'force-dynamic';

export default async function DJsPage() {
  const djs = await loadDJs();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Discover DJs in Dubai</h1>
        <p className="text-lg text-muted-foreground">
          Browse our curated selection of DJs. Click any card to view their full profile, mixes, and crowd clips.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {djs.map((dj) => (
          <DJCard key={dj.id} dj={dj} />
        ))}
      </div>

      {djs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No DJs found.</p>
        </div>
      )}
    </div>
  );
}
