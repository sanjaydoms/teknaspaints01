/* ═══════════════════════════════════════════════════════
   Teknas Paints — Blog Data (shared between listing & post pages)
   ═══════════════════════════════════════════════════════ */

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: BlogContentBlock[];
  image: string;
  category: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  authorBio: string;
  date: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
  views: number;
  likes: number;
  comments: CommentData[];
}

export interface BlogContentBlock {
  type: "paragraph" | "heading" | "quote" | "image" | "tip" | "list";
  text?: string;
  items?: string[];
  src?: string;
  caption?: string;
}

export interface CommentData {
  id: string;
  author: string;
  avatar: string;
  date: string;
  text: string;
  likes: number;
}

/* ── PALETTE (exported for both pages) ── */
export const DARK_NAVY = "#1a1428";
export const SIENNA = "#c75b3a";
export const GOLD = "#d4a24e";
export const SAGE = "#75866c";
export const FOREST = "#687967";
export const DEEP_FOREST = "#04150b";
export const WARM_CREAM = "#ede7dd";
export const SOFT_IVORY = "#fff2da";
export const PAPER_WHITE = "#fffdf6";
export const CANVAS = "#f5f2ec";
export const COBALT = "#3b7ca5";

export const SECTION_PX = "px-6 sm:px-10 md:px-14 lg:px-20 xl:px-28 2xl:px-[140px]";

export function getCategoryColor(cat: string) {
  switch (cat) {
    case "Trends":      return SIENNA;
    case "Sustainability": return SAGE;
    case "Wellness":    return COBALT;
    case "How-To":      return GOLD;
    case "Behind the Scenes": return FOREST;
    case "Design Tips": return "#8B6DAF";
    default:            return DARK_NAVY;
  }
}

export const CATEGORIES = [
  "All",
  "Trends",
  "Sustainability",
  "Wellness",
  "How-To",
  "Behind the Scenes",
  "Design Tips",
];

/* ═══════════════════════════════════════════════════════
   BLOG POSTS
   ═══════════════════════════════════════════════════════ */
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "colour-trends-2026",
    title: "Colour Trends 2026: The Palettes Defining Modern Indian Homes",
    excerpt:
      "From earthy sage greens to warm terracotta — discover the colour stories that are reshaping how India lives, breathes, and decorates.",
    content: [
      { type: "paragraph", text: "The year 2026 marks a decisive shift in Indian interior design. After years dominated by stark whites and cool greys, homeowners across the subcontinent are gravitating toward colours that reflect warmth, nature, and cultural heritage. At Teknas Paints, our colour forecasting team has been tracking this movement closely, and the results are both surprising and deeply rooted in our collective psyche." },
      { type: "heading", text: "Sage Green: The Undisputed Frontrunner" },
      { type: "paragraph", text: "Sage green has emerged as the undisputed frontrunner. This muted, earthy tone bridges the gap between indoor comfort and the outdoor world — a connection that has become increasingly important in our post-pandemic lifestyle. Our Sage Serenity collection, featuring 14 carefully curated shades from dusty olive to silvered eucalyptus, has seen a 340% increase in demand since its launch." },
      { type: "quote", text: "Sage green is the colour of balance — it grounds a room without weighing it down, and energises without overwhelming. It's nature's neutral." },
      { type: "heading", text: "Terracotta & Burnt Sienna: The Comeback" },
      { type: "paragraph", text: "Terracotta and burnt sienna are staging a remarkable comeback. These warm, clay-inspired hues pay homage to India's rich architectural traditions while feeling thoroughly contemporary when paired with modern furnishings. The key is application: a single accent wall in Teknas Burnt Copper (TC-3315) can transform a neutral room into a conversation piece without overwhelming the space." },
      { type: "image", src: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080", caption: "A warm terracotta accent wall transforms the entire mood of a room" },
      { type: "heading", text: "Gold & Ochre: Refined Tradition" },
      { type: "paragraph", text: "Gold and ochre tones continue to hold strong, particularly in formal living areas and pooja rooms. However, the treatment has evolved — instead of the heavy, ornate gold of traditional Indian interiors, 2026 favours muted gold with chalky, matte finishes. Our Muted Gold (MG-2240) has become a bestseller for exactly this reason." },
      { type: "tip", text: "Pro tip: Pair Muted Gold with a deep navy accent for a rich, sophisticated palette that works in both traditional and contemporary settings." },
      { type: "heading", text: "Deep Navy: The New Neutral" },
      { type: "paragraph", text: "Deep navy and charcoal are the new neutrals. Increasingly, design-forward homeowners are using dark colours not as accents but as the primary canvas, creating dramatic, cocooning spaces that feel luxurious without being intimidating. The trick lies in the undertone — Teknas Dark Navy carries a warm purple base that prevents it from feeling cold or clinical." },
      { type: "heading", text: "The Return of Two-Tone Walls" },
      { type: "paragraph", text: "The biggest surprise? The return of two-tone walls. After years of single-colour minimalism, Indian designers are embracing the art of colour blocking — using painter's tape to create geometric patterns, or simply painting the lower third of a wall in a deeper shade. This technique adds architectural interest to builder-basic rooms without the cost of structural modifications." },
      { type: "list", items: [
        "Use Teknas Precision Tape for crisp lines between colour zones",
        "The 60-30-10 rule still applies: 60% dominant colour, 30% secondary, 10% accent",
        "Test large swatches (at least A3 size) on your wall before committing",
        "Consider the room's natural light direction — colours shift dramatically from north to south-facing rooms",
      ]},
    ],
    image:
      "https://images.unsplash.com/photo-1758945631095-fff5c72fa3ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    category: "Trends",
    author: "Priya Sharma",
    authorRole: "Head of Colour Strategy",
    authorAvatar: "https://images.unsplash.com/photo-1761627503582-53c6b973eead?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    authorBio: "Priya leads the Colour Strategy team at Teknas Paints, with over 15 years of experience forecasting colour trends across Indian and global markets. She holds a Master's in Colour Science from the University of Leeds and regularly speaks at design conferences across Asia.",
    date: "February 28, 2026",
    readTime: "8 min read",
    tags: ["Colour Trends", "Interior Design", "2026", "Indian Homes"],
    featured: true,
    views: 12400,
    likes: 847,
    comments: [
      { id: "c1", author: "Ananya K.", avatar: "", date: "March 1, 2026", text: "The sage green section really resonated with me! Just repainted our living room in Sage Serenity and it's transformed the space completely.", likes: 24 },
      { id: "c2", author: "Rohan Desai", avatar: "", date: "March 2, 2026", text: "Two-tone walls are definitely making a comeback. Seeing this everywhere on Instagram. Would love a detailed tutorial from Teknas on getting those clean lines.", likes: 18 },
      { id: "c3", author: "Meghna P.", avatar: "", date: "March 3, 2026", text: "Can you do a follow-up piece on how these trends translate to exteriors? Would love to see the terracotta story for Indian bungalows.", likes: 12 },
    ],
  },
  {
    slug: "eco-friendly-paints-guide",
    title: "The Complete Guide to Eco-Friendly Paints: What Every Homeowner Needs to Know",
    excerpt:
      "VOC levels, green certifications, and plant-based formulas — we break down everything about sustainable painting for healthier homes.",
    content: [
      { type: "paragraph", text: "As awareness about indoor air quality grows, more Indian homeowners are asking the right questions about what goes on their walls. Traditional paints can release volatile organic compounds (VOCs) for months after application, contributing to respiratory issues, headaches, and long-term health concerns." },
      { type: "heading", text: "Understanding VOCs & Indoor Air Quality" },
      { type: "paragraph", text: "At Teknas, our EcoShield range represents a decade of research into plant-based binders and mineral pigments. Every product in this line carries less than 5 grams per litre of VOCs — well below the 50 g/L threshold that earns a 'low-VOC' certification. But we didn't stop at reducing harm; we engineered paints that actively improve indoor air quality through photocatalytic technology that breaks down common pollutants." },
      { type: "quote", text: "The air inside your home can be 2-5 times more polluted than outdoor air. Your wall paint is one of the biggest contributors — and one of the easiest to fix." },
      { type: "heading", text: "Quality Without Compromise" },
      { type: "paragraph", text: "Choosing eco-friendly paint doesn't mean compromising on quality. Our EcoShield line offers the same coverage, durability, and colour vibrancy as conventional paints. The difference is in the formulation: we use water-based acrylic resins derived from sustainable sources, titanium dioxide for opacity, and natural earth pigments that have been used in building construction for thousands of years." },
      { type: "heading", text: "Certifications That Matter" },
      { type: "paragraph", text: "When shopping for sustainable paint, look beyond marketing claims. The three certifications that matter most in India are: Green Pro certification from CII-GBC, the GreenGuard Gold standard for low chemical emissions, and the ISI mark from BIS that ensures quality standards. All Teknas EcoShield products carry all three." },
      { type: "list", items: [
        "Green Pro Certification (CII-GBC) — validates environmental performance",
        "GreenGuard Gold — stringent chemical emissions limits, suitable for schools & healthcare",
        "ISI Mark (BIS) — ensures Indian quality standards compliance",
        "IGBC Green Homes Rating — contributes points toward green building certification",
      ]},
      { type: "heading", text: "Application Tips for Best Results" },
      { type: "paragraph", text: "Application tips for eco-friendly paints: ensure proper ventilation during and after painting (even though VOC levels are minimal), use natural-bristle brushes or microfibre rollers for best results, and allow 24–48 hours of curing time between coats. The result is a beautiful, durable finish that you can feel genuinely good about." },
      { type: "tip", text: "Teknas EcoShield paints are safe to apply even with children in the house — but we still recommend keeping windows open for 6 hours after application for the best curing results." },
    ],
    image:
      "https://images.unsplash.com/photo-1768394269854-075715f444b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    category: "Sustainability",
    author: "Dr. Arjun Mehta",
    authorRole: "Environmental Scientist",
    authorAvatar: "https://images.unsplash.com/photo-1623510847797-416119a9ff00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    authorBio: "Dr. Arjun Mehta leads environmental research at Teknas Paints with a PhD in Environmental Chemistry from IIT Bombay. His work on plant-based paint binders has been published in leading journals and has earned Teknas multiple sustainability awards.",
    date: "February 15, 2026",
    readTime: "10 min read",
    tags: ["Eco-Friendly", "VOC", "Sustainability", "Health"],
    featured: true,
    views: 9800,
    likes: 621,
    comments: [
      { id: "c4", author: "Kavita M.", avatar: "", date: "February 17, 2026", text: "This is exactly the information I needed! We have a toddler and I've been worried about paint fumes. Ordering EcoShield samples today.", likes: 31 },
      { id: "c5", author: "Deepak R.", avatar: "", date: "February 18, 2026", text: "Great breakdown of the certifications. Most brands just slap 'eco-friendly' on the label without backing it up. Appreciate the transparency.", likes: 22 },
    ],
  },
  {
    slug: "bedroom-colour-psychology",
    title: "The Psychology of Bedroom Colours: Which Shades Help You Sleep Better?",
    excerpt:
      "Science-backed insights into how wall colours influence your sleep quality, mood, and well-being — with specific shade recommendations.",
    content: [
      { type: "paragraph", text: "Your bedroom walls do more than just look pretty — they actively influence your circadian rhythm, stress levels, and sleep quality. Research from the Sleep Foundation shows that certain colour wavelengths can either promote or hinder melatonin production, the hormone responsible for restful sleep." },
      { type: "heading", text: "Blue: The Best Colour for Sleep" },
      { type: "paragraph", text: "Blue tones consistently rank as the best colours for bedrooms. Our Twilight Blue (TB-6720) and Soft Coastal (SC-5510) have been specifically formulated with undertones that register in the calming 440–490 nanometre wavelength range. These shades reduce heart rate and lower blood pressure within minutes of visual exposure." },
      { type: "quote", text: "People sleeping in blue bedrooms average 7 hours and 52 minutes of sleep per night — nearly 2 hours more than those in purple rooms." },
      { type: "heading", text: "Green & Lavender: Nature's Relaxants" },
      { type: "paragraph", text: "Sage green and muted lavender also scored highly in sleep studies. These nature-inspired tones activate parasympathetic nervous system responses associated with relaxation and safety. Avoid high-saturation colours like bright red or electric yellow in sleeping areas, as they stimulate cortisol production." },
      { type: "heading", text: "Finish Matters: Matte vs Gloss" },
      { type: "paragraph", text: "The finish matters as much as the colour. Matte and eggshell finishes absorb light rather than reflecting it, creating a softer visual environment that supports winding down. Save the glossy finishes for bathrooms and kitchens where you want energising, light-reflective surfaces." },
      { type: "tip", text: "Use Teknas Velvet Matte finish for bedrooms — it absorbs light beautifully and creates a calming, cocoon-like atmosphere that promotes better sleep." },
    ],
    image:
      "https://images.unsplash.com/photo-1723642611178-d192c6e3597e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    category: "Wellness",
    author: "Dr. Nandini Rao",
    authorRole: "Colour Psychologist",
    authorAvatar: "https://images.unsplash.com/photo-1761627503582-53c6b973eead?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    authorBio: "Dr. Nandini Rao is a colour psychologist and wellness consultant who bridges the gap between neuroscience and interior design. She advises leading hospitals and wellness centres on therapeutic colour applications.",
    date: "February 5, 2026",
    readTime: "6 min read",
    tags: ["Colour Psychology", "Bedroom", "Sleep", "Wellness"],
    views: 8200,
    likes: 534,
    comments: [
      { id: "c6", author: "Sneha T.", avatar: "", date: "February 7, 2026", text: "Painted my bedroom in Twilight Blue after reading this article. I'm sleeping noticeably better — this is real science!", likes: 19 },
      { id: "c7", author: "Rahul G.", avatar: "", date: "February 8, 2026", text: "Would love an article about colour psychology for home offices. Since WFH is permanent for many of us now.", likes: 27 },
    ],
  },
  {
    slug: "exterior-painting-monsoon",
    title: "Monsoon-Proofing Your Exterior: A Professional Painter's Handbook",
    excerpt:
      "Expert tips on timing, primer selection, and weatherproofing techniques to ensure your exterior paint survives India's toughest season.",
    content: [
      { type: "paragraph", text: "India's monsoon season tests exterior paint like nothing else. The combination of relentless humidity, driving rain, and temperature fluctuations can cause peeling, blistering, and mould growth on improperly prepared surfaces. At Teknas, we've spent decades perfecting formulas for tropical weather, and here's what we've learned." },
      { type: "heading", text: "Timing Your Exterior Paint Job" },
      { type: "paragraph", text: "Timing is everything. The ideal window for exterior painting is October through February — after the monsoon has fully receded and before pre-summer heat makes surfaces too hot for proper paint adhesion. If you must paint closer to the monsoon season, complete the work at least 4–6 weeks before the first rains to allow full curing." },
      { type: "heading", text: "Surface Preparation: The 70% Rule" },
      { type: "paragraph", text: "Surface preparation accounts for 70% of a successful exterior paint job. Power-wash all surfaces to remove dirt, moss, and loose paint. Fill cracks with a flexible acrylic sealant that can expand and contract with temperature changes. Apply Teknas WeatherGuard Primer — its silicone-fortified formula creates a hydrophobic base layer that actively repels moisture." },
      { type: "list", items: [
        "Power-wash surfaces at 1500-2000 PSI to remove all debris",
        "Fill hairline cracks with flexible acrylic sealant",
        "Allow 48 hours drying time after washing before priming",
        "Apply primer on a dry day with humidity below 85%",
        "Two coats of topcoat minimum for monsoon zones",
      ]},
      { type: "heading", text: "StormShield: Engineered for Indian Weather" },
      { type: "paragraph", text: "For the topcoat, our StormShield Exterior range uses cross-linking polymer technology that forms a breathable yet waterproof membrane. This means moisture trapped in walls can escape as vapour, preventing the bubbling and peeling that plagues conventional exterior paints. Available in over 200 shades, including our popular coastal whites and earthy terracottas." },
      { type: "tip", text: "Request a free Teknas WeatherCheck assessment — our professionals will evaluate your exterior surfaces and recommend the exact products and preparation steps needed for your specific climate zone." },
    ],
    image:
      "https://images.unsplash.com/photo-1710116140746-a2d171660f2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    category: "How-To",
    author: "Rajesh Kumar",
    authorRole: "Master Painter, 25 Years",
    authorAvatar: "https://images.unsplash.com/photo-1623510847797-416119a9ff00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    authorBio: "Rajesh Kumar has been a professional painter for 25 years, specialising in exterior applications across India's diverse climate zones. He now trains the next generation of painters at the Teknas Craftsmanship Academy.",
    date: "January 20, 2026",
    readTime: "7 min read",
    tags: ["Exterior", "Monsoon", "Weatherproofing", "Professional Tips"],
    views: 6700,
    likes: 412,
    comments: [
      { id: "c8", author: "Prakash N.", avatar: "", date: "January 22, 2026", text: "Used StormShield last year and it survived the Mumbai monsoon without a single peel. Best investment.", likes: 34 },
    ],
  },
  {
    slug: "art-of-colour-matching",
    title: "The Art of Colour Matching: How Teknas Creates 1,800+ Shades",
    excerpt:
      "Go behind the scenes at our colour lab, where master colourists blend science and intuition to create the perfect paint shade.",
    content: [
      { type: "paragraph", text: "Walk into the Teknas Colour Lab in Pune, and you'll find a space that feels equal parts chemistry department and artist's studio. Here, a team of 12 colour specialists — each with at least a decade of experience — create, test, and refine the 1,847 shades in our current catalogue." },
      { type: "heading", text: "From Inspiration to Spectrophotometer" },
      { type: "paragraph", text: "The process begins with trend research. Our team travels to fashion weeks, design exhibitions, and heritage sites across India and Europe, collecting colour inspiration in the form of fabric swatches, photographs, and even food samples. These references are then translated into precise spectrophotometer readings — a process of converting visual inspiration into mathematical colour coordinates." },
      { type: "image", src: "https://images.unsplash.com/photo-1613666816952-8cc2c5f2d54a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080", caption: "Inside the Teknas Colour Lab — where science meets artistry" },
      { type: "heading", text: "The Mixing Bench: Where Magic Happens" },
      { type: "paragraph", text: "From there, the real magic happens at the mixing bench. Using a base of 16 primary pigment dispersions, our colourists blend trial batches that are tested under five different lighting conditions: daylight, LED warm white, LED cool white, CFL, and incandescent. A colour that looks perfect under one light source can shift dramatically under another — a phenomenon called metamerism that separates professional colour matching from amateur attempts." },
      { type: "heading", text: "14 Rounds of Quality Testing" },
      { type: "paragraph", text: "Every new shade undergoes 14 rounds of quality testing before it earns a place in our catalogue. These tests cover lightfastness (resistance to UV fading), wet scrub resistance, hiding power, colour consistency across batches, and real-world appearance on multiple substrate types including concrete, plaster, wood, and metal." },
      { type: "list", items: [
        "Lightfastness testing under UV accelerated weathering",
        "Wet scrub resistance (minimum 10,000 cycles)",
        "Hiding power measured per ISO 6504",
        "Batch-to-batch colour consistency (Delta E < 1.0)",
        "Real-world substrate testing on concrete, plaster, wood, and metal",
      ]},
    ],
    image:
      "https://images.unsplash.com/photo-1613666816952-8cc2c5f2d54a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    category: "Behind the Scenes",
    author: "Meera Patel",
    authorRole: "Chief Colourist",
    authorAvatar: "https://images.unsplash.com/photo-1761627503582-53c6b973eead?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    authorBio: "Meera Patel has been the Chief Colourist at Teknas for 12 years. Her expertise in colour formulation has resulted in some of the brand's most iconic shades, including the award-winning Sage Serenity collection.",
    date: "January 8, 2026",
    readTime: "9 min read",
    tags: ["Colour Science", "Behind the Scenes", "Innovation", "Quality"],
    views: 5400,
    likes: 389,
    comments: [
      { id: "c9", author: "Architect Neha S.", avatar: "", date: "January 10, 2026", text: "The metamerism section is so important! I've had clients reject colours because they looked different under their home lights. Now I always test under multiple conditions.", likes: 15 },
    ],
  },
  {
    slug: "minimalist-white-guide",
    title: "50 Shades of White: Choosing the Right White for Minimalist Interiors",
    excerpt:
      "Not all whites are created equal. Learn how undertones, natural light, and room orientation affect which white works for your space.",
    content: [
      { type: "paragraph", text: "Choosing white paint sounds simple until you're standing in front of a wall of 47 white swatches at the paint store. The secret that interior designers know? White is never just white — every shade carries an undertone that fundamentally changes how it interacts with your space, furniture, and natural light." },
      { type: "heading", text: "Warm Whites: Cream, Ivory & Linen" },
      { type: "paragraph", text: "Warm whites (cream, ivory, linen) contain yellow, pink, or peach undertones. They're ideal for north-facing rooms in India that receive cooler, indirect light. Our Paper White (PW-0010) and Soft Ivory (SI-0025) are perennial favourites for living rooms and bedrooms where you want a cozy, inviting atmosphere without visible colour." },
      { type: "heading", text: "Cool Whites: Blue, Green & Grey Undertones" },
      { type: "paragraph", text: "Cool whites carry blue, green, or grey undertones. These work beautifully in south-facing rooms flooded with warm Indian sunlight, where they prevent the space from feeling overly yellow. Our Arctic Mist (AM-0005) is a crisp, blue-toned white that photographs beautifully — a consideration for the Instagram age." },
      { type: "tip", text: "Always test white swatches on the actual wall, not just on paper. Hold A3-size samples against the wall and observe them at different times of day — morning, noon, and evening light tell very different stories." },
      { type: "heading", text: "The Teknas White Collection" },
      { type: "paragraph", text: "The Teknas White Collection features 52 whites organised by undertone family, each with a recommendation for ideal room orientation and lighting conditions. Visit any Teknas Experience Centre to see large-format samples displayed under controlled lighting that simulates different times of day." },
    ],
    image:
      "https://images.unsplash.com/photo-1759722667804-d4f7fc3a7e69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    category: "Design Tips",
    author: "Anita Deshmukh",
    authorRole: "Interior Design Consultant",
    authorAvatar: "https://images.unsplash.com/photo-1761627503582-53c6b973eead?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    authorBio: "Anita Deshmukh is a Mumbai-based interior design consultant who collaborates with Teknas on colour education. With 18 years of design experience, she specialises in creating serene, minimalist spaces for modern Indian families.",
    date: "December 18, 2025",
    readTime: "5 min read",
    tags: ["White Paint", "Minimalism", "Interior Design", "Undertones"],
    views: 7100,
    likes: 498,
    comments: [
      { id: "c10", author: "Divya S.", avatar: "", date: "December 20, 2025", text: "I wish I'd read this before painting my living room! Went with a cool white in a north-facing room and it feels so cold. Re-doing it in Paper White now.", likes: 21 },
      { id: "c11", author: "Varun T.", avatar: "", date: "December 22, 2025", text: "The undertone explanation is crystal clear. Saving this for when we move into our new apartment next month.", likes: 16 },
    ],
  },
  {
    slug: "kitchen-cabinet-painting",
    title: "Transform Your Kitchen: The Complete Cabinet Painting Guide",
    excerpt:
      "Save lakhs on a kitchen renovation by painting your cabinets instead. A step-by-step guide with pro-grade results.",
    content: [
      { type: "paragraph", text: "A full kitchen renovation in India can cost anywhere from ₹3 to ₹15 lakhs. But if your cabinet boxes are structurally sound, painting them can achieve a dramatic transformation for under ₹25,000 — a fraction of the cost. Here's the professional approach that delivers results indistinguishable from factory-finished cabinetry." },
      { type: "heading", text: "Step 1: Removal & Labelling" },
      { type: "paragraph", text: "Start by removing all doors, drawers, and hardware. Label everything with painter's tape and a marker (trust us, you'll thank yourself during reinstallation). Clean all surfaces with TSP (trisodium phosphate) solution to remove years of cooking grease — this step is non-negotiable for paint adhesion." },
      { type: "heading", text: "Step 2: Sanding for Success" },
      { type: "paragraph", text: "Sanding is where patience pays dividends. Use 150-grit sandpaper for the initial pass, then 220-grit for a smooth finish. The goal isn't to strip the existing finish but to create a slightly rough surface that the primer can grip. Wipe down with a tack cloth after sanding." },
      { type: "heading", text: "Step 3: Prime & Paint" },
      { type: "paragraph", text: "Apply two coats of Teknas Cabinet-Grade Primer, sanding lightly between coats with 320-grit. For the topcoat, our KitchenShield Enamel in semi-gloss finish provides the hard, washable surface that kitchen cabinets demand. Apply with a high-density foam roller for a brushstroke-free finish." },
      { type: "list", items: [
        "150-grit sandpaper for initial surface preparation",
        "220-grit for smooth finish before priming",
        "320-grit between primer coats for perfect adhesion",
        "High-density foam roller for brushstroke-free results",
        "Allow 48 hours cure time before reinstalling hardware",
      ]},
      { type: "tip", text: "The secret to factory-smooth cabinets? Apply paint in thin, even coats and allow full drying time (minimum 6 hours) between coats. Three thin coats always beats two thick ones." },
    ],
    image:
      "https://images.unsplash.com/photo-1606398016782-2f49b8c03e99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    category: "How-To",
    author: "Vikram Singh",
    authorRole: "Professional Painter",
    authorAvatar: "https://images.unsplash.com/photo-1623510847797-416119a9ff00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    authorBio: "Vikram Singh is a master painter with two decades of experience in residential and commercial painting. He runs popular painting workshops at Teknas Experience Centres across India.",
    date: "December 5, 2025",
    readTime: "8 min read",
    tags: ["Kitchen", "Cabinets", "DIY", "Renovation"],
    views: 11200,
    likes: 723,
    comments: [
      { id: "c12", author: "Sunita R.", avatar: "", date: "December 7, 2025", text: "Did this last weekend following these exact steps. The cabinets look brand new! Spent about ₹18,000 total including rollers and tape. Incredible value.", likes: 42 },
      { id: "c13", author: "Amit P.", avatar: "", date: "December 8, 2025", text: "Question: can KitchenShield Enamel be used on laminate cabinets or only on wood?", likes: 8 },
    ],
  },
  {
    slug: "texture-wall-finishes",
    title: "Beyond Flat: Exploring Textured Wall Finishes for Statement Interiors",
    excerpt:
      "From Venetian plaster to suede effects — the textured wall finishes that are turning ordinary rooms into extraordinary spaces.",
    content: [
      { type: "paragraph", text: "Flat paint has its place, but if you want walls that command attention and create sensory depth, textured finishes offer a world of possibilities. The Indian market for decorative wall textures has grown 180% in the last three years, driven by social media exposure and an increasingly design-literate consumer base." },
      { type: "heading", text: "Venetian Plaster: The Gold Standard" },
      { type: "paragraph", text: "Venetian plaster remains the gold standard of textured finishes. This ancient Italian technique involves applying multiple thin layers of plaster mixed with marble dust, then burnishing the surface to a polished, stone-like finish. The result is a wall with genuine depth and luminosity that changes character throughout the day as light plays across its surface." },
      { type: "image", src: "https://images.unsplash.com/photo-1760544139691-360b5e092e97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080", caption: "Venetian plaster creates a luminous, stone-like surface that evolves with changing light" },
      { type: "heading", text: "Suede & Fabric Effects" },
      { type: "paragraph", text: "For a more contemporary feel, Teknas TextureArt Suede creates a soft, fabric-like surface using specialised rollers and a two-tone application technique. It's particularly striking in deep colours like our Midnight Velvet or Forest Shadow, where the light-catching texture creates a rich, dimensional effect." },
      { type: "heading", text: "Metallic Finishes: Contemporary Luxury" },
      { type: "paragraph", text: "Metallic finishes are having a moment in Indian luxury homes. Our Liquid Metal range uses real metallic pigments suspended in a clear medium, allowing you to create walls that shimmer with gold, copper, bronze, or silver. Applied over a dark base colour, the effect is breathtaking — think contemporary palace rather than dated bling." },
      { type: "tip", text: "Book a free Teknas TextureArt consultation to see live demos of all 24 texture techniques. Our specialists will apply samples directly on your walls so you can see exactly how each finish looks in your space." },
    ],
    image:
      "https://images.unsplash.com/photo-1760544139691-360b5e092e97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    category: "Design Tips",
    author: "Sanjay Patil",
    authorRole: "Texture Specialist",
    authorAvatar: "https://images.unsplash.com/photo-1623510847797-416119a9ff00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    authorBio: "Sanjay Patil is the head of Teknas' TextureArt division, where he leads a team of 50 trained artisans. He trained in traditional Venetian plastering techniques in Italy and has adapted them for the Indian market.",
    date: "November 22, 2025",
    readTime: "7 min read",
    tags: ["Texture", "Wall Finish", "Venetian Plaster", "Luxury"],
    views: 6300,
    likes: 445,
    comments: [
      { id: "c14", author: "Interior Studio Mumbai", avatar: "", date: "November 24, 2025", text: "We've been specifying Teknas Liquid Metal for our high-end residential projects. The copper finish over Forest Shadow base is absolutely stunning.", likes: 28 },
      { id: "c15", author: "Priyanka K.", avatar: "", date: "November 25, 2025", text: "How durable is Venetian plaster in Indian humidity? We're in Chennai and worried about moisture issues.", likes: 14 },
    ],
  },
];
