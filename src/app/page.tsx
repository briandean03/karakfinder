import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Music2, Sparkles, MapPin, CheckCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="flex justify-center">
              <Music2 className="h-16 w-16" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Find Your Perfect DJ in Dubai
            </h1>
            <p className="text-xl md:text-2xl text-slate-300">
              Discover and book DJs based on vibe matching and proof — not followers.
            </p>
            <p className="text-lg text-slate-400">
              The Boiler Room for DJs, built for private events in Dubai.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/djs">
                <Button size="lg" className="text-lg px-8">
                  Browse DJs
                </Button>
              </Link>
              <Link href="/request-event">
                <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 hover:bg-white/20 text-white border-white/30">
                  Request DJ for Event
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="bg-blue-100 text-blue-600 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Vibe Matching</h3>
                <p className="text-slate-600">
                  Tell us your event type, location, and music vibe. Our algorithm matches you with DJs who fit your exact needs.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="bg-green-100 text-green-600 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Proof-Based Discovery</h3>
                <p className="text-slate-600">
                  DJs are ranked by mix quality and crowd proof — not follower counts. Real talent, real results.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="bg-purple-100 text-purple-600 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Dubai-First</h3>
                <p className="text-slate-600">
                  Built specifically for Dubai events: villas, yachts, weddings, and brand activations across the city.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Your DJ?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Browse our curated selection of Dubai DJs or tell us about your event for personalized matches.
          </p>
          <Link href="/djs">
            <Button size="lg" className="text-lg px-8">
              Explore DJs Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
