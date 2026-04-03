'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { DUBAI_LOCATIONS, EVENT_TYPES, GENRES } from '@/lib/constants';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  location: z.string().min(1, 'Location is required'),
  eventType: z.string().min(1, 'Event type is required'),
  vibes: z.array(z.string()).min(1, 'Select at least one genre/vibe'),
  budgetMin: z.number().min(300, 'Minimum budget is 300 AED'),
  budgetMax: z.number().min(300, 'Maximum budget is 300 AED'),
  duration: z.number().min(2, 'Minimum duration is 2 hours').max(12, 'Maximum duration is 12 hours'),
});

type FormValues = z.infer<typeof formSchema>;

export default function RequestEventPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: '',
      eventType: '',
      vibes: [],
      budgetMin: 500,
      budgetMax: 1000,
      duration: 4,
    },
  });

  const toggleGenre = (genre: string) => {
    const newGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter((g) => g !== genre)
      : [...selectedGenres, genre];
    setSelectedGenres(newGenres);
    form.setValue('vibes', newGenres, { shouldValidate: true });
  };

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/match', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to match DJs');
      }

      const matches = await response.json();

      // Store matches in sessionStorage and redirect
      sessionStorage.setItem('matchResults', JSON.stringify(matches));
      sessionStorage.setItem('eventDetails', JSON.stringify(values));
      router.push('/matches');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to find matches. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const budgetMin = form.watch('budgetMin');
  const budgetMax = form.watch('budgetMax');
  const duration = form.watch('duration');

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Request a DJ</h1>
          <p className="text-lg text-muted-foreground">
            Tell us about your event and we'll match you with the perfect DJ.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
            <CardDescription>
              Fill in your event information to get personalized DJ matches.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Location */}
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select event location" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {DUBAI_LOCATIONS.map((location) => (
                            <SelectItem key={location} value={location}>
                              {location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Where in Dubai is your event?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Event Type */}
                <FormField
                  control={form.control}
                  name="eventType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Type</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select event type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {EVENT_TYPES.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        What kind of event are you hosting?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Genres/Vibes */}
                <FormField
                  control={form.control}
                  name="vibes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Music Genres/Vibes</FormLabel>
                      <div className="flex flex-wrap gap-2">
                        {GENRES.map((genre) => (
                          <Button
                            key={genre}
                            type="button"
                            variant={selectedGenres.includes(genre) ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => toggleGenre(genre)}
                          >
                            {genre}
                          </Button>
                        ))}
                      </div>
                      <FormDescription>
                        Select one or more genres that fit your event vibe.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Budget Range */}
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="budgetMin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Minimum Budget: {budgetMin} AED/hr</FormLabel>
                        <FormControl>
                          <Slider
                            min={300}
                            max={2000}
                            step={50}
                            value={[field.value]}
                            onValueChange={(vals) => field.onChange(vals[0])}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="budgetMax"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Maximum Budget: {budgetMax} AED/hr</FormLabel>
                        <FormControl>
                          <Slider
                            min={300}
                            max={2000}
                            step={50}
                            value={[field.value]}
                            onValueChange={(vals) => field.onChange(vals[0])}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Duration */}
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Duration: {duration} hours</FormLabel>
                      <FormControl>
                        <Slider
                          min={2}
                          max={12}
                          step={1}
                          value={[field.value]}
                          onValueChange={(vals) => field.onChange(vals[0])}
                        />
                      </FormControl>
                      <FormDescription>
                        How many hours do you need the DJ?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Finding Matches...
                    </>
                  ) : (
                    'Find Matching DJs'
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
