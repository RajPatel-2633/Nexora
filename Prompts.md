# Prompts.md

## Prompt 1
I have got this frontend assignment for an interview. I need to build a premium marketing website for a CRM product using Next.js. The company specifically mentioned GSAP and Framer Motion, so animations should be one of the main focus areas. I don't want this to look like another SaaS landing page. I want it to feel like something built by a senior frontend engineer. Can you first help me plan the sections and the overall design system? I eventually want to convert this into a full CRM product with authentication, backend, LangGraph, Neo4j, and AI microservices, so please keep the frontend architecture modular and easy to extend later.

## Prompt 2
I would like to name the project Nexora. Firstly you should generate a few design references for this website. I don't want copied designs. Take inspiration from Linear, Vercel, Stripe, and Arc Browser, and create something original with dark mode accents, glowing borders, and crisp typography.

## Prompt 3
Let's start with the Hero section first. I don't want a generic hero with static text and a dummy screenshot. The hero preview itself should feel alive like an enterprise SaaS product. It should convey the core value proposition of unified lead management, automated routing, and intelligence right away.

## Prompt 4
The Hero headline text needs to make a bolder statement. Can we set the main headline font weight to semibold 600 and refine the typography scaling across mobile and desktop? Also make the subtext max-width narrower so it looks cleaner.

## Prompt 5
The Hero looks good, but the animation timing feels slightly overdone. Reduce unnecessary floating movement. I want motion to reinforce the product vision rather than look flashy or distracting.

## Prompt 6
Can we reduce the empty whitespace between the top of the viewport and the main hero headline? Everything feels like it starts a little too low on the screen.

## Prompt 7
Now let's work on the Header and Navbar. The initial header feels very basic and static. Can we redesign it so it stays full-width and transparent at the top, but smoothly transforms into a floating glass card as the user scrolls down?

## Prompt 8
The navbar currently looks like a huge rounded pill. I don't like that look honestly. Can we reduce the border radius, remove top margins on initial load, and make it feel more structured like Linear?

## Prompt 9
Can we check the Navbar links against all the actual sections on the landing page? Right now it has an About link pointing to nothing. Let's make sure the links map directly to Features, Integrations, Why Nexora, Pricing, and a Get Started CTA button.

## Prompt 10
In the navbar CTA button, can we add a subtle glow effect on hover and make sure the active link indicators highlight smoothly as the user scrolls through each section?

## Prompt 11
Next, let's build the Ecosystem Integrations Marquee right below the Hero section. Instead of showing plain text names of companies, let's create a smooth infinite sliding marquee of real brand logos like Meta, Google Ads, IndiaMART, 99acres, Housing.com, WhatsApp, and Zapier.

## Prompt 12
The marquee logos currently feel a bit noisy and dark. Can we enclose each logo in a sleek glass card container with subtle hover scale effects and brand category badges underneath?

## Prompt 13
Can we add a clear section header right above the marquee? The title should say "Works with the platforms your teams already rely on." Make sure the typography is prominent and has a 700 bold weight so it stands out.

## Prompt 14
The section label "Ecosystem Integrations" above the marquee title feels a bit plain. Can we format it as an uppercase section label badge with letter spacing and a primary brand accent color?

## Prompt 15
Now let's move to the Features section. Instead of generic feature cards with basic bullet points, I want every card to feature an interactive mini product preview inside it. Those previews should represent actual working components for Lead Management, HRMS & Attendance, and Invoicing.

## Prompt 16
The hover animations on the feature cards are too aggressive. Tone them down and use Framer Motion with realistic spring physics. Think Vercel rather than Dribbble.

## Prompt 17
Can we make the card titles for Lead Management, HRMS & Attendance, and Invoicing & Billing font-bold 700? Right now they feel a bit thin compared to the rest of the section.

## Prompt 18
I don't want these mini feature widgets to depend completely on static mock data. Can we structure their state and props so that later I can pass real API responses into them?

## Prompt 19
Let's add a dynamic cursor-following spotlight effect on the feature cards. When the user moves their mouse over a card, a soft radial gradient glow should follow the cursor inside the card borders.

## Prompt 20
For touch devices like phones and tablets, the 3D tilt effect on the feature cards feels awkward. Can we detect touch inputs and disable the tilt animation on touch screens while keeping hover effects on desktop?

## Prompt 21
Now let's build the dedicated Dashboard Showcase section. This section should be the highlight of the entire landing page. I want it to showcase a full interactive dashboard layout with real-time metrics, pipeline charts, and lead activity streams.

## Prompt 22
Can we animate the dashboard preview widgets one after another as if the dashboard is booting up when the section enters the viewport? Use GSAP ScrollTrigger for a staggered reveal sequence.

## Prompt 23
The charts and tables inside the dashboard showcase look cramped on smaller mobile screens. Can we add a responsive horizontal scroll wrapper with subtle mask fades so mobile users can swipe through the dashboard data cleanly?

## Prompt 24
Let's refine the numbers inside the KPI metric cards of the dashboard showcase. Make the main metrics 700 bold with count-up animations when scrolled into view.

## Prompt 25
Now let's build the Integrations section. I don't want just static icons connected by straight lines. It should look like an active processing engine where business data flows from various sources into Nexora.

## Prompt 26
The center processing hub currently says "Unified Data Layer". That sounds a bit too technical. Can we rename it to "Nexora Engine" and make the center badge text 13–14px so it becomes the clear focal point?

## Prompt 27
The connector path labels currently look like pure white pills and become the brightest thing on the page. Can we change them to translucent glass pills with font-medium text and dark slate text color so they look more premium?

## Prompt 28
The connector labels like Lead Sync, Click Sync, B2B Inquiry, and ROI Analytics feel a bit compressed. Can we increase their size to 12px, add padding, and make the pill borders crisp?

## Prompt 29
Instead of rigid straight lines between nodes, can we introduce subtle 4–8px organic vertical offsets on the SVG bezier curves? It will make the data network feel more fluid and natural.

## Prompt 30
Can we fix the hover tooltips on the left source icons like 99acres and MagicBricks? Right now when you hover over them, the tooltip clips off the left edge of the screen. Adjust their alignment so tooltips stay inside the viewport container.

## Prompt 31
Let's make the Nexora Engine feel alive. Add slow counter-rotating GSAP rings around the core, a breathing pulse animation, and small glowing data packets traveling along the SVG paths every few seconds.

## Prompt 32
In the center hub, let's separate the live event counter into a 28–32px bold number with a clean divider line above the title-case text "Events Processed". Also make the counter increment naturally every 3 seconds.

## Prompt 33
When hovering over any integration source icon like Facebook, only its connected path to the engine and output should stay highlighted. Everything else on the graph should dim down to 35% opacity.

## Prompt 34
Below the network graph, replace the continuous multi-line terminal log with a sleek single-line activity feed that smoothly fades in and out new lead routing events every 3.5 seconds.

## Prompt 35
Now let's build the Why Choose section. I don't want six random dark cards. The section should actually convince potential clients by demonstrating how Nexora solves real workflow problems.

## Prompt 36
Can we switch the Why Choose section to a clean light section gradient with background colors from white to light gray? Having dark section after dark section creates huge uninterrupted dark blocks.

## Prompt 37
Instead of generic internal headlines, let's name the main section headline "Everything works together". This communicates product integration much better than internal jargon.

## Prompt 38
Let's connect the six workflow steps with a central 1.5px vertical SVG line. Each step should feature a step number like 1., 2., 3., 4., 5., 6. formatted without preceding zeros.

## Prompt 39
Can we make the step numbers 1. through 6. and their titles 700 bold? Right now the numbers look too light compared to the feature names.

## Prompt 40
The mini story cards in Why Choose feel too tall. Can we condense their height to around 140–170px, integrate count-up metric counters, and add 0.8s progress bar fills?

## Prompt 41
Make sure the traveling pulse dot on the Why Choose central timeline triggers only once when the section enters the viewport, then settles into a calm state so it doesn't distract people while reading.

## Prompt 42
Now let's build the Testimonials and Social Proof section. This section should build massive enterprise trust with customer quotes, company titles, and key business metrics.

## Prompt 43
Can we add a trust metric grid at the top of Testimonials featuring metrics like 2,500+ Active Teams, 98% CSAT Score, 50M+ Leads Processed, and 99.9% Uptime SLA? Make the metric numbers font-bold 700.

## Prompt 44
Make the Testimonials section background a deep rich dark contrast section with border glows on the testimonial cards so it hits with high visual contrast right after the light Why Choose section.

## Prompt 45
Can we add avatar images, verified customer badges, and subtle star ratings to each testimonial card to make them feel genuine?

## Prompt 46
Now let's build the Pricing section. I want three clear pricing tiers: Starter, Professional, and Enterprise, with monthly and annual billing toggles.

## Prompt 47
The pricing cards currently feel a bit heavy and dark. Can we use a clean light background for the Pricing section so the landing page maintains a healthy alternating section rhythm?

## Prompt 48
Make the Professional plan card stand out as the recommended option with a subtle primary border highlight, a "Most Popular" badge, and an elevated shadow.

## Prompt 49
The typography in the pricing section feels a bit inconsistent. Make sure the price amounts like $49 and $149 are the main visual focus with font-bold 700 numbers, while feature checklist items remain regular weight.

## Prompt 50
Now let's build the Contact and Book a Demo section. The left column currently has too much empty space and feels unbalanced compared to the right form column.

## Prompt 51
Can we rebalance the Contact section? Place a conversational demo slot availability badge like "Available for a demo — Tomorrow • 2:30 PM EST" right above the form, and add reassurance copy under the submit button.

## Prompt 52
In the left column of Contact, replace the bulky card boxes with clean inline contact links for email and phone support. Make the headline "Ready to transform your business?" 700 bold.

## Prompt 53
Make the submit button on the contact form font-semibold 600 with an arrow icon that slides slightly to the right when hovered.

## Prompt 54
Now let's polish the Footer section. The current footer feels messy and all links have equal visual weight. Can we establish a clear design system for footer typography?

## Prompt 55
Create reusable utility classes for the footer like footer-heading, footer-link, footer-description, and footer-label. Apply 8-point vertical rhythm spacing across all columns.

## Prompt 56
Add subtle status dots next to key footer links like Live, In Development, and Planned. Also add a click-to-copy interaction on the support email address with a toast notification.

## Prompt 57
Replace heavy JavaScript hover animations in the footer links with fast, native CSS translate and color transitions for better performance.

## Prompt 58
Can we do a complete responsiveness and build check across the whole website? Ensure all sections scale cleanly on mobile, tablet, and desktop viewports, verify prefers-reduced-motion accessibility, and make sure npm run build compiles with zero errors.

## Prompt 59
Can you review the entire landing page from top to bottom and check for design consistency? I want to make sure the section rhythm transitions smoothly between dark and light backgrounds—Hero (Dark), Features (Light), Dashboard (Light), Integrations (Light), Why Choose (Light Gradient), Testimonials (Dark), Pricing (Light), and Contact (Dark)—so the page feels cohesive and intentional.

## Prompt 60
The typography across different sections still feels slightly inconsistent. Some headings are extrabold 800 while others are medium. Can we audit and normalize the entire landing page to follow strict typography tokens? The main Hero headline should be semibold 600, section titles and trust metrics should be bold 700, card titles bold 700, section labels uppercase 500, and body copy regular 400.

## Prompt 61
Let's do one final comprehensive polish and build verification pass across the website. Review micro-animations, focus rings for keyboard navigation, prefers-reduced-motion fallbacks, and run a production build test to ensure npm run build compiles with zero errors or warnings.
