import Link from "next/link";
export const dynamic = 'force-dynamic';
import { supabaseServer } from "@/lib/supabaseServer";
import { Product, Category } from "@/lib/types";
import { AddToCartButton } from "@/components/AddToCartButton";
import { BuyNowButton } from "@/components/BuyNowButton";
import { BannerCarousel } from "@/components/BannerCarousel";
import { Header } from "@/components/Header";
import UserMenu from "@/components/UserMenu";

const fetchHomeData = async () => {
  const { data: categories } = await supabaseServer
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  const { data: products } = await supabaseServer
    .from("products")
    .select("*")
    .order("id", { ascending: false })
    .limit(20);

  return {
    categories: (categories ?? []) as Category[],
    products: (products ?? []) as Product[],
  };
};

export default async function HomePage() {
  const { categories, products } = await fetchHomeData();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pb-20 overflow-x-hidden">
      <Header title="Premium Taste" subtitle="Direct to your Door 📍" />

      {/* Hero Section Container */}
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        
        {/* Story-like Banner Carousel */}
        <div className="pt-2">
          <BannerCarousel />
        </div>

        {/* Mobile Search - Focused Experience */}
        <div className="mt-6 flex w-full flex-col gap-4 lg:hidden">
          <div className="flex w-full items-center rounded-[1.25rem] border border-slate-200 bg-white px-5 py-4 shadow-xl shadow-slate-200/40">
            <svg className="mr-3 h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" placeholder="Search for groceries..." className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-slate-400" />
          </div>
        </div>

        {/* Categories Section - Clean Pills */}
        <section className="mt-10">
          <div className="flex items-center justify-between mb-5">
             <h2 className="text-xl font-black text-slate-900 md:text-2xl">Shop by Category</h2>
             <Link href="/products" className="text-xs font-bold uppercase tracking-widest text-emerald-600 hover:text-emerald-700">View All</Link>
          </div>
          <div className="no-scrollbar flex w-full gap-4 overflow-x-auto pb-4 snap-x">
            {categories.map((category) => (
              <Link key={category.id} href={`/products?category=${category.id}`} className="flex flex-col items-center gap-3 group min-w-[84px] snap-start">
                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-[1.75rem] bg-white transition-all group-hover:bg-emerald-50 group-hover:scale-105 premium-shadow border border-slate-100/50">
                  <span className="text-lg font-black text-emerald-600/30 group-hover:text-emerald-600 transition-colors">{category.name.substring(0, 1).toUpperCase()}</span>
                </div>
                <span className="w-full text-center text-[11px] font-bold text-slate-800 uppercase tracking-tight">{category.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Products Grid - 2 Column Mobile */}
        <section className="mt-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-slate-900 md:text-2xl">Today's Selection</h2>
            <div className="h-0.5 flex-1 mx-4 bg-slate-100 hidden sm:block" />
            <Link href="/products" className="rounded-full bg-emerald-50 px-4 py-2 text-xs font-black uppercase tracking-wider text-emerald-700 hover:bg-emerald-100 transition-colors">Explorer</Link>
          </div>
          
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 lg:gap-6">
            {products.map((product) => (
              <article
                key={product.id}
                className="group relative flex flex-col overflow-hidden rounded-[2rem] bg-white premium-shadow transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/10 border border-slate-100/50"
              >
                {/* Image Holder */}
                <Link href={`/products/${product.id}`} className="relative aspect-square w-full overflow-hidden bg-slate-50 p-2 sm:p-4">
                  <img
                    src={product.images?.[0] || product.image_url}
                    alt={product.name}
                    className="h-full w-full object-contain transition duration-500 group-hover:scale-110"
                  />
                  {/* Premium Badge */}
                  <div className="absolute top-3 left-3 rounded-xl bg-emerald-600 px-2 py-1 text-[9px] font-black text-white shadow-lg shadow-emerald-600/20">
                    FRESH
                  </div>
                </Link>

                {/* Content */}
                <div className="flex flex-1 flex-col p-4 pt-5">
                  <Link href={`/products/${product.id}`} className="mb-auto">
                    <h3 className="line-clamp-2 text-sm font-bold leading-tight text-slate-800 group-hover:text-emerald-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">Pure Quality</p>
                  </Link>
                  
                  <div className="mt-5 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex flex-col">
                         <span className="text-[10px] font-bold text-slate-300 line-through">₹{Math.round(product.price * 1.2)}</span>
                         <span className="text-base font-black text-slate-900">₹{product.price}</span>
                      </div>
                      <AddToCartButton product={product} />
                    </div>
                    <BuyNowButton product={product} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}

