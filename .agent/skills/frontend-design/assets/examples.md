# Design Pattern Examples

When building components, refer to these examples as baseline standards for "Premium Vibe Coding".

## 1. Premium Pricing Card (Glassmorphism + Elevation)

```tsx
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function PricingCard({ isPopular }: { isPopular?: boolean }) {
  return (
    <div 
      className={cn(
        "relative flex flex-col p-8 rounded-3xl border bg-background/50 backdrop-blur-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
        isPopular ? "border-primary shadow-primary/10" : "border-border"
      )}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
          Most Popular
        </div>
      )}
      <h3 className="text-2xl font-bold tracking-tight">Pro Tier</h3>
      <div className="mt-4 flex items-baseline text-5xl font-extrabold">
        $49
        <span className="ml-1 text-xl font-medium text-muted-foreground">/mo</span>
      </div>
      <p className="mt-4 text-muted-foreground">Perfect for scaling teams.</p>
      
      <ul className="mt-8 space-y-4">
        {['Unlimited projects', 'Priority support', 'Advanced analytics'].map((feature) => (
          <li key={feature} className="flex items-center gap-3">
            <Check className="h-5 w-5 text-primary" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      <button className="mt-8 w-full rounded-xl bg-primary px-4 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2">
        Get Started
      </button>
    </div>
  );
}
```

## AI Agent Check
- Notice the explicit `font-extrabold tracking-tight` on the pricing.
- Notice the `transition-all duration-300` for smooth hover states.
- Notice the Lucide icon integration.
- This is the standard quality expected for the Plus Marketing Website.
