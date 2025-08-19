import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Twitter, Github, Linkedin } from "lucide-react";
import logoUrl from "@/assets/logo.svg";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Users, BarChart3, Workflow } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function LandingPage() {
  return (
    <main className="min-h-screen w-full flex flex-col">
      {/* Navbar */}
      <header className="w-full sticky top-0 z-10 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl px-4 h-14 flex items-center justify-between">
          {/* Left: Brand */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logoUrl} alt="WorkNest" className="h-6 w-auto" />
            <span className="font-semibold">WorkNest</span>
          </Link>

          {/* Center: Nav (desktop) */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#hero" className="hover:text-foreground">Home</a>
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="#testimonials" className="hover:text-foreground">Testimonials</a>
            <a href="#contact" className="hover:text-foreground">Contact</a>
          </nav>

          {/* Right: CTAs (desktop) */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link to="/sign-in">Sign in</Link>
            </Button>
            <Button asChild>
              <Link to="/sign-up">Sign up</Link>
            </Button>
          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <img src={logoUrl} alt="WorkNest" className="h-5 w-auto" />
                    <span>WorkNest</span>
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6 flex flex-col gap-4">
                  <a href="#hero" className="text-sm">Home</a>
                  <a href="#features" className="text-sm">Features</a>
                  <a href="#testimonials" className="text-sm">Testimonials</a>
                  <a href="#contact" className="text-sm">Contact</a>
                  <div className="pt-2 flex items-center gap-2">
                    <Button variant="ghost" asChild className="flex-1">
                      <Link to="/sign-in">Sign in</Link>
                    </Button>
                    <Button asChild className="flex-1">
                      <Link to="/sign-up">Sign up</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl w-full px-4 py-20 md:py-28" id="hero">
        <div className="grid md:grid-cols-2 items-center gap-10 md:gap-16">
          {/* Copy */}
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
              Project management, made smart
            </div>
            <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-tight">
              Project management, made smart.
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-xl mx-auto md:mx-0">
              Plan, track, and deliver work effortlessly. WorkNest brings your team, tasks, and timelines into one focused workspace.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center md:items-start gap-3">
              <Link to="/sign-up" className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90">
                Get Started
              </Link>
              <a href="#features" className="inline-flex items-center rounded-md border px-5 py-2.5 text-sm font-medium hover:bg-accent">
                Explore Features
              </a>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">No credit card required</p>
          </div>

          {/* Illustration placeholder (static) */}
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-2xl bg-gradient-to-tr from-primary/20 via-primary/5 to-transparent blur-2xl" />
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-4 md:p-6">
              {/* Mock board */}
              <div className="grid grid-cols-3 gap-3">
                {["Backlog", "In Progress", "Done"].map((title, i) => (
                  <div key={title} className="rounded-lg border bg-background">
                    <div className="border-b px-3 py-2 text-xs font-medium">{title}</div>
                    <div className="p-3 space-y-2">
                      {[0,1,2].slice(0, i === 2 ? 1 : 2).map((k) => (
                        <div key={k} className="rounded-md border p-2">
                          <div className="h-2 w-2/3 rounded bg-muted mb-2" />
                          <div className="h-2 w-1/2 rounded bg-muted" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {/* Mock footer */}
              <div className="mt-4 flex items-center justify-between rounded-lg border p-3">
                <div className="h-2 w-24 rounded bg-muted" />
                <div className="flex gap-2">
                  <div className="h-6 w-6 rounded-full bg-muted" />
                  <div className="h-6 w-6 rounded-full bg-muted" />
                  <div className="h-6 w-6 rounded-full bg-muted" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl w-full px-4 py-16">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-semibold">Features</h2>
          <p className="text-muted-foreground mt-2">Everything you need to plan, execute, and deliver.</p>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <Card className="h-full">
            <CardHeader>
              <div className="h-10 w-10 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                <Brain className="h-5 w-5" />
              </div>
              <CardTitle className="mt-2 text-base">Smart Planning</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Plan tasks, dependencies, and priorities with ease.
            </CardContent>
          </Card>

          <Card className="h-full">
            <CardHeader>
              <div className="h-10 w-10 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                <Users className="h-5 w-5" />
              </div>
              <CardTitle className="mt-2 text-base">Real-time Collaboration</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Comments, mentions, and live updates for your team.
            </CardContent>
          </Card>

          <Card className="h-full">
            <CardHeader>
              <div className="h-10 w-10 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                <BarChart3 className="h-5 w-5" />
              </div>
              <CardTitle className="mt-2 text-base">Agile Sprints & Reports</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Sprint boards with progress and burndown insights.
            </CardContent>
          </Card>

          <Card className="h-full">
            <CardHeader>
              <div className="h-10 w-10 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                <Workflow className="h-5 w-5" />
              </div>
              <CardTitle className="mt-2 text-base">Integrations & Automations</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Connect tools and automate routine work.
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="testimonials" className="mx-auto max-w-7xl w-full px-4 py-16 bg-muted/30">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-semibold">Loved by teams</h2>
          <p className="text-muted-foreground mt-2">What our users say about WorkNest.</p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {[{
            quote: "WorkNest made our sprints predictable and our delivery faster.",
            name: "Alex Chen",
            role: "Product Manager",
            company: "PixelForge",
            initials: "AC",
          },{
            quote: "The best mix of simplicity and power for growing teams.",
            name: "Priya Nair",
            role: "Engineering Manager",
            company: "CloudLeaf",
            initials: "PN",
          },{
            quote: "Our team finally ships on time—every time.",
            name: "Mateo Ruiz",
            role: "COO",
            company: "NovaLabs",
            initials: "MR",
          }].map((t) => (
            <Card key={t.name} className="h-full">
              <CardContent className="p-6">
                <p className="text-sm leading-relaxed">“{t.quote}”</p>
                <div className="mt-4 flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback>{t.initials}</AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <div className="font-medium">{t.name}</div>
                    <div className="text-muted-foreground">{t.role}, {t.company}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Logo strip */}
        <div className="mt-10">
          <p className="text-center text-xs text-muted-foreground">Trusted by teams at</p>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center opacity-80">
            {[
              { name: "PixelForge", w: 96 },
              { name: "CloudLeaf", w: 110 },
              { name: "NovaLabs", w: 100 },
              { name: "DataNest", w: 100 },
              { name: "BrightStack", w: 120 },
            ].map((b) => (
              <div key={b.name} className="flex items-center justify-center">
                <svg
                  width={b.w}
                  height="24"
                  viewBox={`0 0 ${b.w} 24`}
                  role="img"
                  aria-label={`${b.name} logo`}
                  className="text-foreground/30"
                >
                  <rect x="0" y="8" width={b.w} height="8" rx="4" fill="currentColor" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl w-full px-4 py-16">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-semibold">Contact us</h2>
          <p className="text-muted-foreground mt-2">We'd love to hear from you. Fill out the form and we'll get back shortly.</p>
        </div>

        <ContactSection />
      </section>

      <footer className="border-t bg-black/5 dark:bg-white/5">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2">
              <div className="flex items-center gap-2">
                <img src={logoUrl} alt="WorkNest" className="h-6 w-auto" />
                <span className="font-semibold">WorkNest</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground max-w-sm">
                Plan, track, and deliver work effortlessly. A smarter workspace for modern teams.
              </p>
              <div className="mt-4 flex items-center gap-3 text-muted-foreground">
                <a href="#" aria-label="WorkNest on Twitter" className="hover:text-foreground"><Twitter className="h-4 w-4" /></a>
                <a href="#" aria-label="WorkNest on GitHub" className="hover:text-foreground"><Github className="h-4 w-4" /></a>
                <a href="#" aria-label="WorkNest on LinkedIn" className="hover:text-foreground"><Linkedin className="h-4 w-4" /></a>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold">Product</h4>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground">Features</a></li>
                <li><a href="#testimonials" className="hover:text-foreground">Testimonials</a></li>
                <li><Link to="/sign-up" className="hover:text-foreground">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold">Company</h4>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li><a href="#contact" className="hover:text-foreground">Contact</a></li>
                <li><a href="#" className="hover:text-foreground">About</a></li>
                <li><a href="#" className="hover:text-foreground">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold">Legal</h4>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground">Terms</a></li>
                <li><a href="#" className="hover:text-foreground">Security</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} WorkNest. All rights reserved.</p>
            <div className="flex items-center gap-3">
              <Link to="/sign-up" className="text-xs hover:underline">Create account</Link>
              <Link to="/sign-in" className="text-xs hover:underline">Sign in</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

// Contact form component (client-side validation only)
const contactSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Enter a valid email"),
  phone: z
    .string()
    .optional()
    .transform((v) => (v ?? "").trim())
    .refine((v) => v === "" || /^[+]?\d[\d\s-]{6,}$/.test(v), {
      message: "Enter a valid phone number",
    }),
  message: z.string().min(10, "Message should be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

function ContactSection() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
    mode: "onTouched",
  });

  const onSubmit = (values: ContactFormValues) => {
    // For now, just log. Backend wiring can be added later.
    console.log("Contact form submitted:", values);
  };

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Send us a message</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 555 000 1234" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea rows={5} placeholder="How can we help?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-2">
                <Button type="submit">Send message</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Details + Mini map */}
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Contact details</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p><span className="text-foreground">Email:</span> hello@worknest.app</p>
            <p><span className="text-foreground">Phone:</span> +1 (555) 000-1234</p>
            <p><span className="text-foreground">Address:</span> 123 Product Ave, Suite 200</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Find us</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-full h-60 overflow-hidden rounded-md border bg-muted">
              {/* Map embed placeholder */}
              <iframe
                title="WorkNest Map"
                className="absolute inset-0 w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.openstreetmap.org/export/embed.html?bbox=85.297%2C27.672%2C85.337%2C27.704&layer=mapnik"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
